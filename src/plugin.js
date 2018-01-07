import VueSuggest from './Suggest.vue';

export function install (Vue) {
  Vue.component('vue-suggest', VueSuggest)
}

/* Auto-install */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install })
} else if (typeof global !== 'undefined') {
  global.Vue.use({ install })
}