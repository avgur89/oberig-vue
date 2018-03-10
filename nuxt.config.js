module.exports = {
  /*
  ** Enable cache for image sequences
  */
  cache: true,
  /*
  ** Headers of the page
  */
  head: {
    title: 'Oberig',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Oberig jewelery' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Customize app manifest
  */
  manifest: {
    start_url: '/',
    theme_color: '#eecdf8',
    background_color: '#d9afe5',
    orientation: 'portrait'
  },
  /*
  ** PWA setup
   */
  modules: [
    '@nuxtjs/pwa'
  ],
  meta: {
    theme_color: '#eecdf8'
  },
  /*
  ** Turn off the progress-bar
  */
  loading: false,
  /*
  ** Clear vue-router scroll behaviour set up by nuxt
  ** https://github.com/vuejs/vue-router/issues/1373
  */
  router: {
    scrollBehavior() {}
  },
  /*
  ** Plugins (run before instantiating the root vue.js application)
   */
  plugins: [
    {
      src: '~/plugins/vue-parallax-js',
      ssr: false
    },
    {
      src: '~/plugins/vue-svgicon',
      ssr: false
    },
    {
      src: '~/plugins/vue-video-player',
      ssr: false
    },
    {
      src: '~/plugins/vue-carousel',
      ssr: false
    }
  ],
  /*
  ** Additional styles
   */
  css: [
    { src: 'video.js/dist/video-js.css', lang: 'css' },
    { src: '~/assets/scss/index.scss', lang: 'scss' }
  ],
  /*
  ** Build configuration
  */
  build: {
    filenames: {
      css: 'o-common.[contenthash].css',
      manifest: 'o-manifest.[hash].js',
      vendor: 'o-vendor.[chunkhash].js',
      app: 'o-app.[chunkhash].js'
    },
    /*
    ** Class properties transform (public, static)
     */
    babel: {
      plugins: ['transform-class-properties', 'transform-decorators-legacy']
    },
    vendor: ['axios', 'pixi.js', 'gsap', 'lodash', 'babel-polyfill', 'nuxt-class-component'],
    /*
    ** Webpack config
    */
    extend(config, { isClient }) {
      // run ESLINT on save
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: [/(node_modules)/, /(assets)/]
        });
      }

      // node fs module
      config.node = {
        fs: 'empty'
      };

      // WEBP loader support
      config.module.rules.push({
        test: /\.webp/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            },
          },
        ],
        exclude: [/(node_modules)/, /(assets)/]
      });
    }
  }
};
