<template lang="pug">
  BaseDropdown(
    :class="$style.baseLanguageSwitcher",
    :items="languages",
    :currentItem="currentLanguageLabel",
    :onChange="changeLanguage"
  )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters, mapActions } from 'vuex';
  import { filter, replace } from 'lodash';
  import BaseDropdown from './BaseDropdown.vue';

  @Component({
    components: { BaseDropdown },
    computed: mapGetters(['languages', 'defaultLang']),
    methods: mapActions(['setLanguageChangedFlag', 'setLanguage'])
  })
  export default class BaseLanguageSwitcher extends Vue {
    /**
     * @return {String}
     */
    get currentLanguageLabel() {
      const { lang = this.defaultLang } = this.$route.params;
      const [currentLang] = filter(this.languages, item => item.code === lang);
      return currentLang ? currentLang.label : '';
    }

    /**
     * Change current language and update page.
     *
     * @param {Object} item
     * @param {String} item.code
     */
    changeLanguage({ code: lang }) {
      const route = { ...this.$route };
      const isIndexPage = ['index', 'lang'].includes(route.name);

      route.name = replace(route.name, isIndexPage ? 'lang' : 'lang-', '');

      route.name = isIndexPage ? 'lang' : `lang-${route.name}`;
      route.params.lang = lang;

      // remove all language params if selected language is a default language
      if (lang === this.defaultLang) {
        route.name = isIndexPage ? 'index' : replace(route.name, 'lang-', '');
        delete route.params.lang;
      }

      // set app current language
      this.setLanguage(lang);

      // set flag to tell page's fetch() to update layout-data
      this.setLanguageChangedFlag(true);

      this.$router.push(route);
    }
  }
</script>

<style lang="scss" module>
  .baseLanguageSwitcher {
    z-index: 3;

    transform: translateY(-40px);
    margin-top: 1px;
    opacity: 0;
  }
</style>
