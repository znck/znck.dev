import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import FencedCode from './fenced-code.vue'

window.customElements.define('fenced-code', wrap(Vue, FencedCode))
