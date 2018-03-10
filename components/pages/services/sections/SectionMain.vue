<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    .SectionMain__cnt
      h1.SectionMain__title {{ p.title }}
      .SectionMain__desc(v-html="p.description")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { Resp } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['p'])
  })
  export default class SectionMain extends Vue {
    /**
     * Reveal main section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionMain__title', {
        type: 'lines'
      });

      new TimelineMax()
        .set('.SectionMain__title', { opacity: 1 })
        // title
        .staggerFromTo(titleLines, 0.65,
          { opacity: 0, y: Resp.isMobile ? -40 : 40 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0
        )
        // description
        .fromTo('.SectionMain__desc', 1,
          { opacity: 0 },
          { opacity: 1, ease: Power1.easeOut },
          0.5
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionMain {
    position: relative;

    margin-bottom: 123px;

    @media (max-width: $minTablet) {
      margin-bottom: 37px;
    }

    &__title {
      margin-bottom: 33px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      letter-spacing: 1.25px;

      opacity: 0;

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

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      opacity: 0;
    }
  }
</style>
