<template>
  <div id="__nuxt">
    
    <component v-if="layout" :is="nuxt.err ? 'nuxt' : layout"></component>
  </div>
</template>

<script>
import Vue from 'vue'


import '../node_modules/video.js/dist/video-js.css'

import '../assets/scss/index.scss'


let layouts = {

  "_default": () => import('../layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"Oberig","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Oberig jewelery"},{"name":"mobile-web-app-capable","content":"yes"},{"name":"apple-mobile-web-app-title","content":"Oberig"},{"name":"theme-color","content":"#eecdf8"},{"name":"og:type","property":"og:type","content":"website"},{"name":"og:title","property":"og:title","content":"Oberig"},{"name":"og:description","property":"og:description","content":"Oberig jewelery"}],"link":[{"rel":"icon","href":"/favicon.png"},{"rel":"manifest","href":"/_nuxt/manifest.30df6cb6.json"},{"rel":"shortcut icon","href":"/_nuxt/icons/icon_64.c441A0a02E0.png"},{"rel":"apple-touch-icon","href":"/_nuxt/icons/icon_512.c441A0a02E0.png","sizes":"512x512"}],"style":[],"script":[]},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options._nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  methods: {
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    
  }
}
</script>

