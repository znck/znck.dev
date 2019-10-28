import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import MyComponent from './my-component.vue'

window.customElements.define('my-component', wrap(Vue, MyComponent))
