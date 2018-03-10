<template lang="pug">
  section.SectionUnique
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealSection"
    )
    h2.SectionUnique__title(:class="$style.divColor") {{ p.ctaTitle }}
    .SectionUnique__desc(v-html="p.ctaDescription")
    ButtonRainbowGradient(
      ref="SectionUniqueButton",
      :url="constructorUrl",
      :text="p.ctaButton"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import ButtonRainbowGradient from '../../../ui/ButtonRainbowGradient.vue';

  @Component({
    components: { BaseReveal, ButtonRainbowGradient },
    computed: mapGetters(['p'])
  })
  export default class SectionUnique extends Vue {
    /**
     * @return {String}
     */
    get constructorUrl() {
      return generateUrl(this.$route.params.lang, 'constructor');
    }

    /**
     * Reveal unique section
     */
    revealSection() {
      const [{ lines: title }, { lines: desc }] = [
        '.SectionUnique__title',
        '.SectionUnique__desc'
      ].map(el => new SplitText(el, { type: 'lines' }));

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // title
        .staggerFromTo(title, 0.6,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0
        )
        // desc
        .staggerFromTo(desc, 0.45,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0.5
        )
        // rainbow button
        .fromTo(this.$refs.SectionUniqueButton.$el, 0.6,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          1
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionUnique {
    position: relative;

    max-width: 665px;
    width: 100%;

    margin: 0 auto 142px auto;

    text-align: center;

    opacity: 0;

    @media (max-width: $minDesktop) {
      max-width: 500px;
      margin-bottom: 135px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 97px;
    }

    &__title {
      margin-bottom: 37px;

      font-family: $MinionProDisp;
      font-size: 50px;
      line-height: 65px;
      letter-spacing: 1.25px;

      color: #3f4144;

      text-transform: uppercase;

      @media (max-width: $minTablet) {
        margin-bottom: 23px;

        font-size: 35px;
        font-weight: 400;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__desc {
      margin-bottom: 23px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    .ButtonRainbowGradient {
      margin-top: 34px;

      @media (max-width: $minTablet) {
        margin-top: 22px;
      }
    }
  }
</style>

<style lang="scss" module>
  @import "../../../../assets/scss/mixins";

  .divColor {
    div {
      @include gradient-text(false);
    }
  }
</style>
