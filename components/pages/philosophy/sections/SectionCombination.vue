<template lang="pug">
  section.SectionCombination
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-100",
      :action="revealTitle"
    )
    h2.SectionCombination__title {{ p.bottomTitle }}
    BlockLinks#SectionLinks.SectionCombination__links(
      :urlLeft="symbolsLink",
      :urlRight="collectionsLink",
      :textLeft="p.symbolsButtonLabel",
      :textRight="p.catalogButtonLabel",
      :imgUrl="p.catalogButtonImage",
      :reveal="revealBlockLinks"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../../modules/_helpers';
  import BlockLinks from '../../../blocks/BlockLinks.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BlockLinks, BaseReveal },
    computed: mapGetters(['p', 'menu'])
  })
  export default class SectionCombination extends Vue {
    /**
     * @return {String}
     */
    get symbolsLink() {
      const [{ route }] = this.menu.filter(item => item.name === 'symbol');
      return route;
    }

    /**
     * @return {String}
     */
    get collectionsLink() {
      return generateUrl(this.$route.params.lang, 'collections');
    }

    /**
     * Reveal section's title
     */
    revealTitle() {
      const { lines } = new SplitText('.SectionCombination__title', {
        type: 'lines'
      });

      TweenMax.set('.SectionCombination__title', { opacity: 1 });
      TweenMax.staggerFromTo(
        lines,
        0.6,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, ease: Power1.easeOut },
        0.2
      );
    }

    /**
     * Reveal links block
     *
     * @param {HTMLElement} el
     */
    revealBlockLinks(el) {
      TweenMax.to(
        el,
        1,
        { opacity: 1, delay: 0.5, ease: Power0.easeNone }
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";

  .SectionCombination {
    position: relative;

    &__title {
      max-width: 600px;
      width: 100%;

      margin: 0 auto 122px auto;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      letter-spacing: 1.25px;

      text-transform: uppercase;
      text-align: center;

      opacity: 0;

      @media (max-width: $minTablet) {
        margin-bottom: 86px;

        font-size: 25px;
        line-height: 40px;
        letter-spacing: 1.25px;
      }
    }

    &__links {
      opacity: 0;
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/mixins";

 .SectionCombination {
   &__title {
     > div {
       @include gradient-text(false);
     }
   }
 }
</style>
