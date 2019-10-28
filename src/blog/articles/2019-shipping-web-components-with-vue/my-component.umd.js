(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, factory(global.Vue));
}(this, function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  const camelizeRE = /-(\w)/g;
  const camelize = str => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
  };

  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = str => {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  };

  function getInitialProps (propsList) {
    const res = {};
    propsList.forEach(key => {
      res[key] = undefined;
    });
    return res
  }

  function injectHook (options, key, hook) {
    options[key] = [].concat(options[key] || []);
    options[key].unshift(hook);
  }

  function callHooks (vm, hook) {
    if (vm) {
      const hooks = vm.$options[hook] || [];
      hooks.forEach(hook => {
        hook.call(vm);
      });
    }
  }

  function createCustomEvent (name, args) {
    return new CustomEvent(name, {
      bubbles: false,
      cancelable: false,
      detail: args
    })
  }

  const isBoolean = val => /function Boolean/.test(String(val));
  const isNumber = val => /function Number/.test(String(val));

  function convertAttributeValue (value, name, { type } = {}) {
    if (isBoolean(type)) {
      if (value === 'true' || value === 'false') {
        return value === 'true'
      }
      if (value === '' || value === name) {
        return true
      }
      return value != null
    } else if (isNumber(type)) {
      const parsed = parseFloat(value, 10);
      return isNaN(parsed) ? value : parsed
    } else {
      return value
    }
  }

  function toVNodes (h, children) {
    const res = [];
    for (let i = 0, l = children.length; i < l; i++) {
      res.push(toVNode(h, children[i]));
    }
    return res
  }

  function toVNode (h, node) {
    if (node.nodeType === 3) {
      return node.data.trim() ? node.data : null
    } else if (node.nodeType === 1) {
      const data = {
        attrs: getAttributes(node),
        domProps: {
          innerHTML: node.innerHTML
        }
      };
      if (data.attrs.slot) {
        data.slot = data.attrs.slot;
        delete data.attrs.slot;
      }
      return h(node.tagName, data)
    } else {
      return null
    }
  }

  function getAttributes (node) {
    const res = {};
    for (let i = 0, l = node.attributes.length; i < l; i++) {
      const attr = node.attributes[i];
      res[attr.nodeName] = attr.nodeValue;
    }
    return res
  }

  function wrap (Vue, Component) {
    const isAsync = typeof Component === 'function' && !Component.cid;
    let isInitialized = false;
    let hyphenatedPropsList;
    let camelizedPropsList;
    let camelizedPropsMap;

    function initialize (Component) {
      if (isInitialized) return

      const options = typeof Component === 'function'
        ? Component.options
        : Component;

      // extract props info
      const propsList = Array.isArray(options.props)
        ? options.props
        : Object.keys(options.props || {});
      hyphenatedPropsList = propsList.map(hyphenate);
      camelizedPropsList = propsList.map(camelize);
      const originalPropsAsObject = Array.isArray(options.props) ? {} : options.props || {};
      camelizedPropsMap = camelizedPropsList.reduce((map, key, i) => {
        map[key] = originalPropsAsObject[propsList[i]];
        return map
      }, {});

      // proxy $emit to native DOM events
      injectHook(options, 'beforeCreate', function () {
        const emit = this.$emit;
        this.$emit = (name, ...args) => {
          this.$root.$options.customElement.dispatchEvent(createCustomEvent(name, args));
          return emit.call(this, name, ...args)
        };
      });

      injectHook(options, 'created', function () {
        // sync default props values to wrapper on created
        camelizedPropsList.forEach(key => {
          this.$root.props[key] = this[key];
        });
      });

      // proxy props as Element properties
      camelizedPropsList.forEach(key => {
        Object.defineProperty(CustomElement.prototype, key, {
          get () {
            return this._wrapper.props[key]
          },
          set (newVal) {
            this._wrapper.props[key] = newVal;
          },
          enumerable: false,
          configurable: true
        });
      });

      isInitialized = true;
    }

    function syncAttribute (el, key) {
      const camelized = camelize(key);
      const value = el.hasAttribute(key) ? el.getAttribute(key) : undefined;
      el._wrapper.props[camelized] = convertAttributeValue(
        value,
        key,
        camelizedPropsMap[camelized]
      );
    }

    class CustomElement extends HTMLElement {
      constructor () {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = this._wrapper = new Vue({
          name: 'shadow-root',
          customElement: this,
          shadowRoot: this.shadowRoot,
          data () {
            return {
              props: {},
              slotChildren: []
            }
          },
          render (h) {
            return h(Component, {
              ref: 'inner',
              props: this.props
            }, this.slotChildren)
          }
        });

        // Use MutationObserver to react to future attribute & slot content change
        const observer = new MutationObserver(mutations => {
          let hasChildrenChange = false;
          for (let i = 0; i < mutations.length; i++) {
            const m = mutations[i];
            if (isInitialized && m.type === 'attributes' && m.target === this) {
              syncAttribute(this, m.attributeName);
            } else {
              hasChildrenChange = true;
            }
          }
          if (hasChildrenChange) {
            wrapper.slotChildren = Object.freeze(toVNodes(
              wrapper.$createElement,
              this.childNodes
            ));
          }
        });
        observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true
        });
      }

      get vueComponent () {
        return this._wrapper.$refs.inner
      }

      connectedCallback () {
        const wrapper = this._wrapper;
        if (!wrapper._isMounted) {
          // initialize attributes
          const syncInitialAttributes = () => {
            wrapper.props = getInitialProps(camelizedPropsList);
            hyphenatedPropsList.forEach(key => {
              syncAttribute(this, key);
            });
          };

          if (isInitialized) {
            syncInitialAttributes();
          } else {
            // async & unresolved
            Component().then(resolved => {
              if (resolved.__esModule || resolved[Symbol.toStringTag] === 'Module') {
                resolved = resolved.default;
              }
              initialize(resolved);
              syncInitialAttributes();
            });
          }
          // initialize children
          wrapper.slotChildren = Object.freeze(toVNodes(
            wrapper.$createElement,
            this.childNodes
          ));
          wrapper.$mount();
          this.shadowRoot.appendChild(wrapper.$el);
        } else {
          callHooks(this.vueComponent, 'activated');
        }
      }

      disconnectedCallback () {
        callHooks(this.vueComponent, 'deactivated');
      }
    }

    if (!isAsync) {
      initialize(Component);
    }

    return CustomElement
  }

  var script = {
    props: {
      name: String,
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  function createInjector$1(context, shadowRoot) {
      return (id, style) => addStyle$2(style, shadowRoot);
  }
  function createStyleElement(shadowRoot) {
      var styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      shadowRoot.appendChild(styleElement);
      return styleElement;
  }
  function addStyle$2(css, shadowRoot) {
      const styleElement = createStyleElement(shadowRoot);
      if (css.media)
          styleElement.setAttribute('media', css.media);
      if ('styleSheet' in styleElement) {
          styleElement.styleSheet.cssText = css.source;
      }
      else {
          while (styleElement.firstChild) {
              styleElement.removeChild(styleElement.firstChild);
          }
          styleElement.appendChild(document.createTextNode(css.source));
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',{staticClass:"hello"},[_vm._v("Hello "+_vm._s(_vm.name))])};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-facfc1de_0", { source: ".hello{color:#00f}", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;

    
    var MyComponent = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      true,
      undefined,
      undefined,
      createInjector$1
    );

  window.customElements.define('my-component', wrap(Vue, MyComponent));

}));
