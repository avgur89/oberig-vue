<template lang="pug">
  section.BlockCollections(
    :class="cssClassesObject",
    :style="`background-image: url(${image})`"
  )
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-300",
      :action="revealSection"
    )
    .BlockCollections__btn(
      @mousemove="setHoverState",
      @mouseleave="removeHoverState"
    )
      nuxt-link(:to="url")
        .BlockCollections__btn-label {{ text }}
        img.BlockCollections__btn-sequence(
          v-for="(image, index) in imagesSequence",
          :key="index",
          :src="image",
          :data-collection-image-id="index + 1",
          alt=""
        )
</template>

<script>
  /**
   * IMAGE SEQUENCE DATA
   *
   * Total: 118
   * Until reveal: 44
   * Until hover: 84
   */

  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import animatable from '../../mixins/animatable';
  import webpExtension from '../../mixins/webpExtension';
  import { Resp } from '../../modules/_helpers';
  import BaseReveal from '../ui/BaseReveal.vue';

  @Component({
    props: {
      image: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      initiallyHidden: {
        type: Boolean,
        default: false
      }
    },
    mixins: [animatable, webpExtension],
    components: { BaseReveal },
    watch: {
      currentImage(next, prev) {
        const prevImage = Math.floor(prev);
        const nextImage = Math.floor(next);

        if (prevImage === nextImage) return;

        // hide prev
        TweenMax.set(`[data-collection-image-id="${prevImage}"]`, { visibility: 'hidden' });

        // show next
        TweenMax.set(`[data-collection-image-id="${nextImage}"]`, { visibility: 'visible' });
      }
    }
  })
  export default class BlockCollections extends Vue {
    /**
     * 'hovered' state indicator.
     *
     * @type {Boolean}
     */
    isHovered = false;

    /**
     * Reveal animation status.
     *
     * @type {Boolean}
     */
    revealed = false;

    /**
     * Currently visible image index.
     *
     * @type {Number}
     */
    currentImage = 0;

    /**
     * Sequence images.
     *
     * @type {Array}
     */
    imagesSequence = [];

    /**
     * Sequence images sources.
     *
     * @return {Array}
     */
    get images() {
      const imagesArray = Array(114).fill(9);

      return imagesArray.map((startPoint, i) => {
        const imageSrc = i < 10 ? `00${i}` : i < 100 ? `0${i}` : i;
        return require(`~/static/sequence/collections/btn_00${imageSrc}.${this.webp_png}`);
      });
    }

    mounted() {
      this.setSequenceImagesList(84);
    }

    /**
     * Animate-in collections screen (sequence, label).
     */
    revealSection() {
      const revealAnimation = new TimelineMax();

      // sequence
      if (Resp.isDesk) {
        revealAnimation.to(this, 2.55, {
          currentImage: 83,
          ease: Power0.easeNone,
          onComplete: this.startNormalSequence
        }, 0);
      } else {
        revealAnimation
          .set('.BlockCollections__btn-sequence', { display: 'block', opacity: 0 }, 0)
          .to('.BlockCollections__btn-sequence', 0.45, { opacity: 1, ease: Power1.easeIn }, 0);
      }

      revealAnimation
        // set initial opacity
        .to('.BlockCollections__btn', 0.3, { opacity: 1 }, 0)
        // label
        .fromTo('.BlockCollections__btn-label', Resp.isDesk ? 1 : 0.8, {
          opacity: 0,
          y: '-=85'
        }, {
          opacity: 1,
          y: '+=85'
        }, Resp.isDesk ? 0.6 : 0.35)
        // set revealed state
        .addCallback(() => { this.revealed = true; }, 1.1);
    }

    /**
     * Animate-in sequence to hovered state, set hovered sequence.
     */
    setHoverState() {
      if (!this.revealed) return;

      if (this.isHovered) return;

      this.killTweens();

      this.isHovered = true;

      TweenMax.to(this, 0.7, {
        currentImage: 94,
        ease: Power1.easeOut,
        onComplete: this.startHoveredSequence
      });
    }

    /**
     * Animate-out image from hovered state, restore default sequence.
     */
    removeHoverState() {
      this.killTweens();

      this.isHovered = false;

      TweenMax.to(this, 0.7, {
        currentImage: 83,
        ease: Power1.easeOut,
        onComplete: this.startNormalSequence
      });
    }

    /**
     * Start normal state sequence.
     */
    startNormalSequence() {
      this.killTweens();

      this.sequenceTimeline = new TimelineMax({ repeat: -1, yoyo: true })
        .to(this, 1.2, { ease: Power0.easeNone, currentImage: 47 })
        .to(this, 1.2, { ease: Power0.easeNone, currentImage: 83 });
    }

    /**
     * Start hovered state seq sequence.
     */
    startHoveredSequence() {
      this.killTweens();

      this.sequenceTimeline = new TimelineMax({ repeat: -1, yoyo: true })
        .to(this, 1.2, { ease: Power0.easeNone, currentImage: 114 })
        .to(this, 1.2, { ease: Power0.easeNone, currentImage: 95 });
    }

    /**
     * Kill all sequence's tweens.
     */
    killTweens() {
      TweenMax.killTweensOf([this, this.sequenceTimeline]);
    }

    /**
     * Fills imagesSequence array with images paths.
     *
     * @param {Number} index - image id displayed on mobile
     */
    setSequenceImagesList(index) {
      if (Resp.isDesk) {
        this.imagesSequence = this.images;
        return;
      }

      this.imagesSequence.push(this.images[index]);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";
  @import "../../assets/scss/variables";

  .BlockCollections {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 400px;
    width: calc(100% + 80px);

    //margin-top: 176px;
    margin-top: 101px;
    margin-left: -40px;

    z-index: 2;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);
      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      //margin-top: 182px;
      margin-top: 126px;
      width: calc(100% + 68px);
      margin-left: -34px;
    }

    @media (max-width: $minTablet) {
      //margin-top: 163px;
      margin-top: 97px;
      width: calc(100% + 28px);
      margin-left: -14px;
    }

    &.js-animatable {
      .BlockCollections {
        &__btn {
          opacity: 0;

          &-label {
            opacity: 0;
          }
        }
      }
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      text-decoration: none;

      width: 400px;
      height: 360px;

      overflow: hidden;

      &-label {
        position: absolute;

        left: 50%;
        top: 50%;

        transform: translate3d(-50%, -50%, 0);

        font-family: $CalibriBold;
        font-size: 14px;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 3.05px;
        text-shadow: 1px 2.5px 1px rgba(0, 0, 0, 0.1);

        z-index: 2;

        @include gradient-text(false);
      }

      &-sequence {
        position: absolute;

        left: 50%;
        top: 50%;

        transform: translate3d(-50%, -50%, 0);

        margin-left: -10px;

        @media(min-width: $desktop) {
          visibility: hidden;
        }

        @media (max-width: 400px) {
          transform: translate3d(-50%, -50%, 0) scale(0.9);
        }
      }
    }
  }
</style>
