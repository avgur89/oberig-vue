<template lang="pug">
  nuxt-link.BaseImageItem.BaseImageItem--hover(v-if="alias.length", :to="url")
    .BaseImageItem__wrapper(
      @mouseenter="onMouseEnter",
      @mouseleave="onMouseLeave"
    )
      BaseReveal(
        :in-viewport-once="true",
        :in-viewport-offset-top="index === 0 || index === 1 ? 0 : -200",
        :action="revealItem"
      )
      img.BaseImageItem__image(
        :src="previewUrl || imageUrl",
        :alt="`Oberig ${label} collection`"
      )
      span.BaseImageItem__desc {{ label }}
  .BaseImageItem(v-else)
    .BaseImageItem__wrapper
      BaseReveal(
        :in-viewport-once="true",
        :in-viewport-offset-top="-150",
        :action="revealItem"
      )
      img.BaseImageItem__image(:src="previewUrl || imageUrl")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import imagesLoaded from 'imagesloaded';
  import { generateUrl } from '../../modules/_helpers';
  import BaseReveal from './BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    props: {
      index: {
        type: Number,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      previewUrl: {
        type: String,
        default: () => ''
      },
      pictureMode: {
        type: Boolean,
        default: false
      },
      alias: {
        type: String,
        default: () => ''
      },
      label: {
        type: String,
        default: () => ''
      }
    }
  })
  export default class BaseImageItem extends Vue {
    /**
     * Collection title image preload timer
     *
     * @type {Number|Undefined}
     */
    preloadTimer = undefined;

    /**
     * Title image loaded status
     *
     * @type {Boolean}
     */
    loaded = false;

    /**
     * Item collection url
     *
     * @return {String}
     */
    get url() {
      return generateUrl(this.$route.params.lang, `collection/${this.alias}`);
    }

    /**
     * Reveal section list item
     *
     * @async
     */
    async revealItem() {
      await new Promise(resolve => imagesLoaded('.BaseImageItem__image', resolve));

      TweenMax.fromTo(
        this.$el,
        1,
        { transformOrigin: 'center', opacity: 0, y: 50 },
        { transformOrigin: 'center', opacity: 1, y: 0, ease: Power0.easeNone }
      );
    }

    /**
     * Wait for a few secs and start preloading main image
     */
    onMouseEnter() {
      if (this.loaded) return;

      this.preloadTimer = setTimeout(() => {
        const img = new Image();
        img.src = this.imageUrl;

        this.loaded = true;
      }, 1200);
    }

    /**
     * Clear waiting timer
     */
    onMouseLeave() {
      if (this.loaded) return;

      clearTimeout(this.preloadTimer);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .BaseImageItem {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 0 1 50%;

    margin-bottom: 40px;

    opacity: 0;

    z-index: 3;

    @media (max-width: $minTablet) {
      flex: 1 1 auto;
      width: 100%;
    }

    &--hover {
      cursor: pointer;

      @media (min-width: $desktop) {
        .BaseImageItem__wrapper {
          &:hover {
            box-shadow: none;

            .BaseImageItem {
              &__image {
                opacity: 0.1;
                box-shadow: none;
              }
              &__desc {
                opacity: 1;
              }
            }
          }
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:nth-child(4n + 2),
    &:nth-child(4n + 3) {
      .BaseImageItem {
        &__image {
          width: 380px;
          height: 500px;

          @media (max-width: $minDesktop) {
            width: 230px;
            height: 300px;
          }

          @media (max-width: $minTablet) {
            width: 100%;
            height: 320px;
          }
        }
      }
    }

    &__wrapper {
      position: relative;
      background-color: #fff;
      font-size: 0;
      border-radius: 0;

      overflow: hidden;

      box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);

      transition: box-shadow .6s ease;

      @media (max-width: $minTablet) {
        width: 100%;
      }
    }

    &__image {
      width: 540px;
      height: 320px;

      transition: opacity .6s ease;

      transform: translate3d(0, 0, 0);

      @include object-fit(cover);

      @media (max-width: $minDesktop) {
        width: 330px;
        height: 200px;
      }

      @media (max-width: $minTablet) {
        width: 100%;
        height: 320px;
      }
    }

    &__desc {
      position: absolute;

      left: 50%;
      top: 50%;

      transform: translate3d(-50%, -50%, 0);

      opacity: 0;

      transition: opacity .6s ease;

      font-family: $MinionProDisp;
      font-size: 47px;
      line-height: 57px;
      letter-spacing: 1.25px;
      text-transform: capitalize;
      text-align: center;

      @include gradient-text(false);

      z-index: 4;
    }
  }
</style>
