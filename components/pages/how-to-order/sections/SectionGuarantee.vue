<template lang="pug">
  section.SectionGuarantee
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-200",
      :action="revealSection"
    )
    .SectionGuarantee__cnt
      h2.SectionGuarantee__title {{ p.guaranteeTitle }}
      .SectionGuarantee__desc(v-html="p.guaranteeDescription")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['p'])
  })
  export default class SectionGuarantee extends Vue {
    /**
     * Reveal guarantee section
     */
    revealSection() {
      const [{ lines: title }, { lines: desc }] = [
        '.SectionGuarantee__title',
        '.SectionGuarantee__desc'
      ].map(el => new SplitText(el, { type: 'lines' }));

      new TimelineMax()
        .set('.SectionGuarantee__title', { opacity: 1 })
        .set('.SectionGuarantee__desc', { opacity: 1 })
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
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionGuarantee {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 134px;

    @media (max-width: $minTablet) {
      margin-bottom: 97px;
    }

    &__cnt {
      max-width: 542px;
      width: 100%;

      text-align: center;
    }

    &__title {
      margin-bottom: 40px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: 1.26px;

      color: #736d7b;

      opacity: 0;

      @media (max-width: $minTablet) {
        margin-bottom: 19px;

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
