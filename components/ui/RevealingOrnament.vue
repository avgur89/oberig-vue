<template lang="pug">
  .RevealingOrnament
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-250",
      :action="revealOrnament"
    )
    .RevealingOrnament__svg
      BaseSvgIcon(
        :icon="icon",
        :fill="false",
        height="451",
        width="439"
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { Resp } from '../../modules/_helpers';
  import BaseSvgIcon from './BaseSvgIcon.vue';
  import BaseReveal from './BaseReveal.vue';

  @Component({
    components: { BaseSvgIcon, BaseReveal },
    props: {
      icon: {
        type: String,
        required: true
      }
    }
  })
  export default class RevealingOrnament extends Vue {
    /**
     * Draw ornament's paths (0 -> 1)
     */
    revealOrnament() {
      if (Resp.isMobile) return;

      const paths = this.$el.querySelectorAll('path');

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        .fromTo(paths, 2.5,
          { drawSVG: '100% 100%' },
          { drawSVG: '0% 100%', ease: Power1.easeOut },
          0
        );
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .RevealingOrnament {
    opacity: 0;
    position: relative;

    &__svg {
      .svg-icon {
        @media (max-width: $minDesktop) {
          max-width: 306px !important;
          max-height: 294px !important;
        }
      }

      path {
        fill: none;
        stroke: #e1e0e4;
      }

      .st1 {
        stroke-width: 1.9;
      }

      .st2 {
        stroke-width: 2.5;
      }

      .st0{fill:none;stroke:#E1E0E4;stroke-width:1.524;}
      .st1{fill:none;stroke:#E1E0E4;stroke-width:2.032;}
      .st2{fill:none;stroke:#E1E0E4;stroke-width:0.762;}
      .st3{fill:none;stroke:#E1E0E4;stroke-width:0.254;}
      .st4{fill:none;stroke:#E1E0E4;stroke-width:2.54;}
      .st5{fill:none;stroke:#E1E0E4;stroke-width:1.016;}
      .st6{fill:none;stroke:#E1E0E4;stroke-width:0.508;}
      .st7{fill:none;stroke:#E1E0E4;stroke-width:1.27;}
    }
  }
</style>
