<template lang="pug">
  section.SectionPersonalManager
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealSection"
    )
    .SectionPersonalManager__image-container
      PortraitImage.SectionPersonalManager__image(:imgUrl="manager.photo")
    .SectionPersonalManager__cnt
      h2.SectionPersonalManager__title {{ p.managerTitle }}
      no-ssr
        .SectionPersonalManager__desc
          p.SectionPersonalManager__name {{ manager.name }}
          a.SectionPersonalManager__link(:href="`tel:${manager.phone}`") {{ t.phone }}: {{ manager.phone }}
          a.SectionPersonalManager__link(:href="`mailto:${manager.email}`") {{ t.email }}: {{ manager.email }}
          .SectionPersonalManager__link(
            v-for="(messenger, index) in manager.messengers",
            :key="index"
          ) {{ messenger.messenger }}: {{ messenger.content }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import PortraitImage from '../../../ui/PortraitImage.vue';

  @Component({
    components: { PortraitImage, BaseReveal },
    computed: mapGetters(['t', 'm', 'p'])
  })
  export default class SectionPersonalManager extends Vue {
    /**
     * @return {Object}
     */
    get manager() {
      return this.m.manager;
    }

    /**
     * Animate manager section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionPersonalManager__title', {
        type: 'lines'
      });
      const descLines = this.$el.querySelectorAll(
        '.SectionPersonalManager__name, .SectionPersonalManager__link'
      );

      new TimelineMax()
        .set('.SectionPersonalManager__cnt', { opacity: 1 })
        // title
        .staggerFromTo(titleLines, 0.8,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.3,
          0
        )
        // description
        .staggerFromTo(descLines, 0.55,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0.65
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionPersonalManager {
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 120px 0;

    @media (min-width: $largeDesktop) {
      justify-content: center;
    }

    @media (max-width: $minDesktop) {
      flex-direction: column;
      padding-bottom: 135px;
    }

    @media (max-width: $minTablet) {
      padding: 95px 0;
    }

    &__image {
      position: relative;

      left: 66px;
      top: 0;

      width: 431px;
      height: 440px;

      z-index: 2;

      @media (min-width: $largeDesktop) {
        left: 40px;
      }

      @media (max-width: $minDesktop) {
        position: relative;

        left: auto;
        top: auto;

        margin: 0 auto;
      }

      &-container {
        position: relative;

        display: flex;
        justify-content: center;
        align-items: flex-start;

        flex: 0 0 435px;

        margin-right: 200px;

        @media (max-width: $minDesktop) {
          display: block;
          width: 100%;

          padding-top: 165px;
          margin-right: 0;
          margin-bottom: 50px;
        }

        @media (max-width: $minTablet) {
          padding-top: 115px;
          margin-bottom: 10px;
        }
      }
    }

    &__cnt {
      position: relative;
      flex: 1 1 auto;

      max-width: 400px;
      width: 100%;

      opacity: 0;

      @media (max-width: $minDesktop) {
        text-align: center;
      }
    }

    &__title {
      margin-bottom: 35px;

      font-family: $MinionProDisp;
      font-size: 50px;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: 1.25px;
      text-align: left;

      color: #736d7b;

      @media (max-width: $minDesktop) {
        position: absolute;

        top: -551px;
        left: 50%;

        max-width: 335px;
        width: 100%;

        margin: 0 auto;

        transform: translateX(-50%);
      }

      @media (max-width: $minTablet) {
        top: -452px;

        font-size: 35px;
        line-height: 50px;
        letter-spacing: 0.88px;
      }
    }

    &__link {
      display: block;

      margin-bottom: 13px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      text-decoration: none;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__name {
      margin-bottom: 22px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";

  @media (max-width: $minDesktop) {
    .SectionPersonalManager {
      &__title {
        div {
          text-align: center !important;
        }
      }
    }
  }
</style>
