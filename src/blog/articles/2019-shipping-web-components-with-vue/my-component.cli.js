/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/

// >>> redacted 900 lines

// CONCATENATED MODULE: ./my-component.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("0079")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = componentNormalizer_normalizeComponent(
  my_componentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var my_component = (component.exports);
// CONCATENATED MODULE: ./my-component-wrapper.js?shadow



window.customElements.define('my-component', dist_vue_wc_wrapper(external_Vue_default.a, my_component));
// CONCATENATED MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/entry-wc.js

/***/ })

/******/ });
//# sourceMappingURL=my-component.js.map