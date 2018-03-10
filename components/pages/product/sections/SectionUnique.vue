<template lang="pug">
  section.SectionUnique
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-105",
      :action="revealSection"
    )
    h2.SectionUnique__title {{ p.ctaTitle }}
    .SectionUnique__desc(v-html="p.ctaDescription")
    ButtonRainbowGradient(
      :url="constructorLink",
      :text="p.ctaButtonLabel",
      ref="SectionUniqueButtonRef"
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
    components: {
      BaseReveal,
      ButtonRainbowGradient
    },
    computed: mapGetters(['p'])
  })
  export default class SectionUnique extends Vue {
    /**
     * @return {String}
     */
    get constructorLink() {
      return generateUrl(this.$route.params.lang, 'constructor');
    }

    /**
     * Reveal unique section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionUnique__title', {
        type: 'lines'
      });
      const { lines: descLines } = new SplitText('.SectionUnique__desc p', {
        type: 'lines'
      });

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // title
        .staggerFromTo(titleLines, 0.6,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.2
        )
        // description
        .staggerFromTo(descLines, 0.4,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0.4
        )
        // button
        .fromTo(this.$refs.SectionUniqueButtonRef.$el, 1,
          { opacity: 0, y: 10 },
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
      margin-bottom: 153px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 88px;
    }

    &__title {
      margin-bottom: 37px;

      font-family: $MinionProDisp;
      font-size: 50px;
      line-height: 65px;
      letter-spacing: 1.25px;

      color: #736d7b;

      text-transform: uppercase;

      @media (max-width: $minTablet) {
        margin-bottom: 20px;

        font-size: 35px;
        font-weight: 400;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    .ButtonRainbowGradient {
      margin-top: 56px;

      @media (max-width: $minTablet) {
        margin-top: 46px;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/mixins";

  .SectionUnique {
    &__title {
      div {
        @include gradient-text(false);
      }
    }

    &__desc {
      p {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
