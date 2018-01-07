import VueSuggest from './Suggest.vue';

export function install (Vue, options) {
  Vue.component('vue-suggest', VueSuggest)
}

/* Auto-install */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install })
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue.use({ install })
}