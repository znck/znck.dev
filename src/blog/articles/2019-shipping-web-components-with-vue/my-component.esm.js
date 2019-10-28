import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import { normalizeComponent, createInjectorShadow } from 'vue-runtime-helpers';

var script = {
  props: {
    name: String,
  },
};

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
    createInjectorShadow
  );

window.customElements.define('my-component', wrap(Vue, MyComponent));
