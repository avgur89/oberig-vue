<template lang="pug">
  section.SectionVideo
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    VideoPlayer.SectionVideo__video(
      ref="SectionVideoPlayerRef",
      :videoSrc="pageData.videoSrc",
      :autoplay="true",
      :onVideoEnded="indicatorEvent",
      :poster="p.videoBanner"
    )
    .SectionVideo__skip(@click.once="indicatorEvent")
      .SectionVideo__skip-inner {{ t.pass_video }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters, mapActions } from 'vuex';
  import bus from '../../../../plugins/event-bus';
  import {
    PHILOSOPHY_VIDEO_CLOSED,
    SHOW_HEADER,
    HIDE_HEADER,
    SET_LOCK
  } from '../../../../modules/_events';
  import indicator from '../../../../mixins/indicator';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import VideoPlayer from '../../../ui/VideoPlayer.vue';

  @Component({
    components: { BaseReveal, VideoPlayer },
    mixins: [indicator],
    computed: mapGetters(['p', 'pageData', 't']),
    methods: mapActions(['setVideoFlag'])
  })
  export default class SectionVideo extends Vue {
    /**
     * Reveal video section
     */
    revealSection() {
      this.$refs.SectionVideoPlayerRef.videoPlayer.play();

      TweenMax.to(this.$el, 1, {
        delay: 0.1,
        opacity: 1,
        ease: Power1.easeOut
      });
    }

    destroyed() {
      bus.$emit(SET_LOCK, false);
    }

    /**
     * Hide video and set 'philosophyVideoWasShown' state
     */
    indicatorEvent() {
      this.$_indicator_removeListeners();

      bus.$emit(HIDE_HEADER);

      const video = this.$el.querySelector('video');
      const dummy = { volume: 1 };
      const onVideoClosed = () => {
        bus.$emit(PHILOSOPHY_VIDEO_CLOSED);
        bus.$emit(SHOW_HEADER, 1.2, 0.3);
        this.setVideoFlag(true);
      };

      new TimelineMax({ onComplete: onVideoClosed })
        .to('.SectionVideo .vjs-control-bar, .SectionVideo__skip', 0.8, {
          y: 175,
          ease: Power1.easeInOut
        })
        .to(dummy, 1.15, {
          volume: 0,
          onUpdate: () => this.$refs.SectionVideoPlayerRef.videoPlayer.volume(dummy.volume)
        }, 0)
        .to(this.$el, 1.15, {
          y: '-100%',
          ease: Power1.easeInOut
        }, 0)
        .to(video, 1.15, {
          scale: 1,
          y: '15%',
          ease: Power1.easeInOut
        }, 0)
        .to('.page-view__inner', 1.15, {
          y: 0,
          ease: Power1.easeInOut
        }, 0);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";

  .SectionVideo {
    position: absolute;
    height: 100vh;
    width: 100vw;

    transform: translate3d(0, 0 , 0);

    background-color: black;

    opacity: 0;

    margin-left: -40px;

    overflow: hidden;

    z-index: 1;

    @media (min-width: $largeDesktop) {
      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      margin-left: -34px;
    }

    @media (max-width: $minTablet) {
      margin-left: -14px;
    }

    &__skip {
      position: absolute;

      right: 54px;
      bottom: 15px;

      cursor: pointer;

      @media (max-width: $minTablet) {
        right: 35px;
        bottom: 70px;
      }

      &-inner {
        position: absolute;

        transform: rotate(-90deg);
        transform-origin: 0 0;

        left: 0;
        bottom: 0;
        color: #ffffff;
        font-family: $CalibriBold;
        font-size: 14px;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.8px;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionVideo .VideoPlayer .video-js {
    video {
      left: 50%;
      top: 50%;

      transform: translate3d(-50%, -50%, 0) scale(1.2);

      @media (min-width: $desktop) {
        @include object-fit(cover);
      }
    }

    .vjs-control-bar {
      top: auto;
      bottom: 70px;
      left: 23px;
      width: calc(100% - 93px);
      opacity: 1 !important;

      @media (max-width: $minTablet) {
        left: 5px;
        bottom: 130px;
        width: calc(100% - 40px);

        @media (orientation: landscape) {
          bottom: 100px;
        }
      }
    }
    .vjs-play-control {
      margin-right: 8px;

      @media (max-width: $minTablet) {
        margin-right: -5px;
      }
    }
  }
</style>
