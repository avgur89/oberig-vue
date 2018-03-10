<template lang="pug">
  section.SectionGuarantee
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealSection"
    )
    .SectionGuarantee__cnt
      .SectionGuarantee__heading
        h3.SectionGuarantee__title {{ p.warrantyTitle }}
        p.SectionGuarantee__subtitle {{ p.warrantyTextUnderTitle }}
      .SectionGuarantee__image-wrapper
        img.SectionGuarantee__image(
          :src="m.titleImageSrc",
          alt=""
        )
      .SectionGuarantee__desc
        .SectionGuarantee__desc-text(v-html="p.warrantyDescription")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import { mapGetters } from 'vuex';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['p', 'm'])
  })
  export default class SectionGuarantee extends Vue {
    /**
     * Reveal guarantee section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionGuarantee__title', {
        type: 'lines'
      });
      const { lines: descLines } = new SplitText('.SectionGuarantee__desc-text p', {
        type: 'lines'
      });

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // image
        .fromTo('.SectionGuarantee__image-wrapper', 1.3,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0
        )
        // title and subtitle
        .staggerFromTo([...titleLines, '.SectionGuarantee__subtitle'], 0.5,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.2,
          0.4
        )
        // description
        .staggerFromTo(descLines, 0.5,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.2,
          0.4
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionGuarantee {
    position: relative;

    margin-bottom: 150px;

    opacity: 0;

    @media (max-width: $minDesktop) {
      margin-bottom: 135px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 95px;
    }

    &__cnt {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: $minDesktop) {
        justify-content: center;
        flex-direction: column;

        max-width: 500px;
        width: 100%;

        margin: 0 auto;
      }
    }

    &__heading {
      flex: 1 1 auto;
      width: 100%;

      margin-right: 100px;
      text-align: center;

      @media (max-width: $minDesktop) {
        margin-right: 0;
        margin-bottom: 55px;
      }

      @media (max-width: $minTablet) {
        margin-right: 0;
        margin-bottom: 50px;
      }
    }

    &__title {
      margin-bottom: 25px;

      font-family: $MinionProDisp;
      font-size: 30px;
      font-weight: 400;
      line-height: 40px;
      text-transform: uppercase;
      letter-spacing: 1.5px;

      color: #736d7b;

      @media (max-width: $minTablet) {
        margin-bottom: 17px;

        font-size: 25px;
        letter-spacing: 1.25px;
      }
    }

    &__subtitle {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    &__image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      flex: 0 0 290px;
      height: 292px;

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;

        max-width: 165px;
        width: 100%;
        height: 167px;

        margin-bottom: 51px;
      }

      @media (max-width: $minTablet) {
        max-width: 119px;
        height: 119px;

        margin-bottom: 40px;
      }
    }

    &__image {
      max-width: 290px;
      max-height: 290px;

      @media (max-width: $minDesktop) {
        max-width: 165px;
        max-height: 167px;
      }

      @media (max-width: $minTablet) {
        max-width: 119px;
        max-height: 119px;
      }
    }

    &__desc {
      flex: 1 1 auto;
      width: 100%;

      margin-left: 100px;

      @media (max-width: $minDesktop) {
        margin-left: 0;
        text-align: center;
      }

      &-text {
        margin-bottom: 26px;

        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/mixins";

  .SectionGuarantee {
    &__title {
      div {
        @include gradient-text(false);
      }
    }

    &__desc-text {
      p {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
