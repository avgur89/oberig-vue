<template lang="pug">
  section.SectionModels(
    v-if="sectionExists",
    :class="{ [$style.threeImages]: m.imagesWithModels.length === 3 }"
  )
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealSection"
    )
    img.SectionModels__photo(
      v-for="(photoSrc, index) in m.imagesWithModels",
      :key="index",
      :src="photoSrc",
      :class="photoClassName(index)",
      alt=""
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import { mapGetters } from 'vuex';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['m'])
  })
  export default class SectionModels extends Vue {
    /**
     * @return {Boolean}
     */
    get sectionExists() {
      const images = this.m.imagesWithModels;
      return images && images.length && images.length > 1;
    }

    /**
     * Portrait/Landscape css class
     *
     * @param {Number} index
     * @return {String}
     */
    photoClassName(index) {
      return !(index % 2) ? 'SectionModels__photo-landscape' : 'SectionModels__photo-portrait';
    }

    /**
     * Reveal models section
     */
    revealSection() {
      TweenMax.staggerFromTo('.SectionModels__photo', 1,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: Power1.easeOut },
        0.5
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionModels {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    margin-bottom: 127px;
    padding-left: 40px;

    @media (max-width: $minDesktop) {
      justify-content: center;
      padding-left: 0;
    }

    @media (max-width: $minTablet) {
      flex-direction: column;
      margin-bottom: 90px;
    }

    @media (min-width: $largeDesktop) {
      justify-content: center;
      padding-left: 0;
      padding-right: 90px;
    }

    &__photo {
      margin-right: 120px;

      box-shadow: 0 16px 49px rgba(30, 75, 120, 0.09);

      opacity: 0;

      &:last-child {
        margin-right: 0;
      }

      @media (max-width: $minDesktop) {
        margin-right: 88px;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 40px;
        margin-right: 0;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &-landscape {
        max-width: 540px;
        max-height: 318px;

        @media (max-width: $minDesktop) {
          max-width: 331px;
          max-height: 200px;
        }

        @media (max-width: $minTablet) {
          @include object-fit(cover);

          max-width: none;
          width: 100%;
          max-height: none;
          height: 320px;
        }
      }

      &-portrait {
        max-width: 380px;
        max-height: 500px;

        @media (max-width: $minDesktop) {
          max-width: 231px;
          max-height: 300px;
        }

        @media (max-width: $minTablet) {
          @include object-fit(cover);

          max-width: none;
          width: 100%;
          max-height: none;
          height: 320px;
        }
      }
    }
  }
</style>

<style lang="scss" module>
  .threeImages {
    justify-content: center !important;
    padding: 0 !important;
  }
</style>
