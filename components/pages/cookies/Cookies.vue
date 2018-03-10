<template lang="pug">
  main.Cookies.page-view
    BaseReveal(
      :in-viewport-once="true",
      :action="revealPage"
    )
    .Cookies__content-block#CookiesCustomerCare
      .Cookies__title {{ cookiesData.firstLabel }}
      .Cookies__content(v-html="cookiesData.firstDescription")
    .Cookies__content-block#CookiesPrivacyPolicy
      .Cookies__title {{ cookiesData.secondLabel }}
      .Cookies__content(v-html="cookiesData.secondDescription")
    .Cookies__content-block#CookiesCookie
      .Cookies__title {{ cookiesData.thirdLabel }}
      .Cookies__content(v-html="cookiesData.thirdDescription")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import bus from '../../../plugins/event-bus';
  import { PRELOADER_FINISHED } from '../../../modules/_events';
  import BaseReveal from '../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['pageData', 'preloaderIsFinished']),
    watch: {
      $route(next) {
        if (next.hash) this.scrollToSection(next.hash);
      }
    }
  })
  export default class Cookies extends Vue {
    /**
     * @return {Object}
     */
    get cookiesData() {
      return this.pageData[0];
    }

    mounted() {
      if (!this.$route.hash) return;

      this.preloaderIsFinished
        ? this.scrollToSection(this.$route.hash)
        : bus.$on(PRELOADER_FINISHED, () => this.scrollToSection(this.$route.hash));
    }

    /**
     * Run cookies page reveal animation.
     */
    revealPage() {
      TweenMax.to(this.$el, 1, {
        opacity: 1,
        ease: Power1.easeOut
      });
    }

    /**
     * Scroll to specified section
     *
     * @param {String} sectionId
     */
    scrollToSection(sectionId) {
      TweenMax.to(window, 1, {
        scrollTo: {
          y: sectionId,
          offsetY: 100,
          autoKill: false
        },
        ease: Power1.easeInOut
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables';

  .Cookies {
    position: relative;

    z-index: 1;

    opacity: 0;

    max-width: 1280px;
    margin: 0 auto;

    padding-left: 40px;
    padding-top: 177px;
    padding-right: 30%;

    @media (max-width: $minDesktop) {
      padding-top: 187px;

      padding-right: 20%;
      padding-left: 0;
    }

    @media (max-width: $minTablet) {
      padding-top: 117px;

      padding-right: 0;
    }

    &__title {
      margin-bottom: 30px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      letter-spacing: 1.25px;

      color: #736d7b;

      text-transform: uppercase;

      width: 110%;

      @media (max-width: $minDesktop) {
        width: 80%;
      }

      @media (max-width: $minTablet) {
        width: 100%;

        margin-bottom: 20px;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__content {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      &-block {
        &:not(:nth-child(2)) {
          margin-top: 110px;

          @media (max-width: $minTablet) {
            margin-top: 50px;
          }
        }

        &:last-child {
          margin-bottom: 60px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .Cookies__content {
    p {
      &:not(:first-child) {
        margin-top: 15px;
      }
    }
  }
</style>
