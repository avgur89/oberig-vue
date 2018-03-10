<template lang="pug">
  .VideoBlock
    .VideoBlock__play-icon
      .VideoBlock__play(ref="VideoBlockPlayRef")
      IconOberig.VideoBlock__icon(
        width="55",
        height="56",
        :videoMode="true",
        ref="VideoBlockIconRef"
      )
    .VideoBlock__text(ref="VideoBlockTextRef") {{ blockText }}
    .VideoBlock__player
      svg.VideoBlock__mask(width="13", height="12")
        defs
          clipPath#video-clip-wrap
            path#video-clip-wrap-circle(d="M5.4,0c3,0,6.2,2.7,5.8,6c-0.5,3.3-2.3,3.4-5.4,5.5C3.1,13.1-0.1,10.9,0,6C0.1,2.7,2.4,0,5.4,0z")
      .VideoBlock__inner
        .VideoBlock__wrap
          .VideoBlock__wrap-inner
            VideoPlayer.VideoBlock__video(
              ref="VideoBlockPlayerRef",
              :videoSrc="videoSrc",
              :onVideoEnded="onVideoEnded"
            )
            .VideoBlock__close
              span
              div close
              span
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import VideoPopup from '../../modules/VideoPopup';
  import bus from '../../plugins/event-bus';
  import { Resp } from '../../modules/_helpers';
  import {
    SHOW_HEADER,
    HIDE_HEADER
  } from '../../modules/_events';
  import { bind, throttle } from 'lodash';
  import IconOberig from './IconOberig.vue';
  import VideoPlayer from './VideoPlayer.vue';

  @Component({
    components: { IconOberig, VideoPlayer },
    props: {
      videoSrc: {
        type: String,
        required: true
      },
      blockText: {
        type: String,
        required: true
      }
    }
  })
  export default class VideoBlock extends Vue {
    /**
     * VideoPopup instance, activated after element mount.
     *
     * @type {VideoPopup|Undefined}
     */
    videoPopupInstance = undefined;

    /**
     * Change block height on resize
     *
     * @type {Function}
     */
    changeHeightOnResizeListener = bind(throttle(this.setBlockHeight, 100), this);

    mounted() {
      this.initVideoPopup();

      this.setBlockHeight();

      window.addEventListener('resize', this.changeHeightOnResizeListener);
    }

    destroyed() {
      window.removeEventListener('resize', this.changeHeightOnResizeListener);
    }

    /**
     * Set video block height in px
     */
    setBlockHeight() {
      if (!Resp.isDesk) TweenMax.set('.VideoBlock__wrap-inner', { height: window.innerHeight });
    }

    /**
     * Reveal video block: animate icon and show text
     */
    reveal() {
      const {
        VideoBlockIconRef: icon,
        VideoBlockTextRef: text,
        VideoBlockPlayRef: play
      } = this.$refs;
      const revealAnimation = new TimelineMax();

      // IE fix
      if (!Resp.isIE) TweenMax.set(text, { opacity: 1 });

      revealAnimation
        // start icon animation with video mode (play button)
        .addCallback(() => icon.startAnimation(true), 0)
        // reveal text
        .to(text, 3, {
          force3D: true,
          css: Resp.isIE ? { opacity: 1 } : { backgroundPosition: '0px 0px' }
        }, 1.7)
        // reveal play icon
        .to(play, 0.3, { css: { opacity: 1 } }, 0)
        .to(play, 0.4, {
          ease: Power0.easeNone,
          css: {
            width: 0,
            height: 0,
            borderRadius: 0,
            borderTopWidth: '4px',
            borderLeftWidth: '5px',
            borderBottomWidth: '4px',
            backgroundColor: 'transparent',
            borderBottomStyle: 'solid',
            borderTopStyle: 'solid',
            borderLeftStyle: 'solid'
          }
        }, 2);
    }

    /**
     * Initialize video-popup with callbacks.
     */
    initVideoPopup() {
      this.videoPopupInstance = new VideoPopup({
        container: '.VideoBlock__player',
        trigger: '.VideoBlock__play-icon',
        closeBtn: '.VideoBlock__close',

        popup: '.VideoBlock__inner',
        popupWrap: '.VideoBlock__wrap',

        clip: '#video-clip-wrap',
        clipWrap: '#video-clip-wrap path',

        wavesDuration: 1,

        onOpen: this.onVideoPopupOpen,
        onClose: this.onVideoPopupClose,
        cbContext: this,

        enableOpacityAnimation: Resp.isIE
      });
    }

    /**
     * Animate-in (show) video player close button, play video.
     *
     * @return {Promise}
     */
    onVideoPopupOpen() {
      if (!Resp.isDesk) bus.$emit(HIDE_HEADER);

      return new Promise((resolve) => {
        const videoPlayer = this.$refs.VideoBlockPlayerRef.videoPlayer;

        new TimelineMax({ onComplete: resolve })
          // animate text label
          .fromTo('.VideoBlock__close div', 1, {
            opacity: 0, y: -50
          }, {
            ease: Power1.easeInOut, opacity: 1, y: 0
          }, 0.9)
          // animate lines
          .staggerFromTo('.VideoBlock__close span', 0.7, { y: 0 }, {
            ease: Power1.easeOut, cycle: { y: [-180, 180] },
          }, 0, 0.7)
          // play video
          .addCallback(() => videoPlayer.play(), 0);
      });
    }

    /**
     * Animate-out (hide) video player close button, stop video.
     *
     * @return {Promise}
     */
    onVideoPopupClose() {
      return new Promise((resolve) => {
        const videoPlayer = this.$refs.VideoBlockPlayerRef.videoPlayer;
        const afterClosingAnimation = () => {
          if (!Resp.isDesk) bus.$emit(SHOW_HEADER);
          videoPlayer.pause();
          resolve();
        };

        new TimelineMax({ onComplete: afterClosingAnimation })
          // animate text label
          .to('.VideoBlock__close div', 0.5, {
            opacity: 0, y: -50
          }, 0)
          // animate lines
          .to('.VideoBlock__close span', 0.5, {
            ease: Power1.easeOut,
            y: 0
          }, 0.35);
      });
    }

    /**
     * Perform when video is finished (close popup).
     */
    onVideoEnded() {
      this.videoPopupInstance && this.videoPopupInstance.close();
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/variables';

  .VideoBlock {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    height: 61px;

    @media (max-width: $minTablet) {
      height: 44px;
    }

    &__icon {
      cursor: pointer;

      @media (max-width: $minTablet) {
        height: 44px !important;
        width: 44px !important;
      }
    }

    &__play {
      position: absolute;
      left: 26.4px;
      top: 50%;

      width: 2px;
      height: 2px;

      border-radius: 50%;

      transform: translateY(-50%);

      opacity: 0;

      border-top-color: transparent;
      border-left-color: #434243;
      border-bottom-color: transparent;

      background-color: #434243;

      @media (max-width: $minTablet) {
        left: 21px;
      }
    }

    &__text {
      font-family: $MinionProRegular;
      text-transform: uppercase;
      font-size: 21px;
      letter-spacing: 1.2px;
      color: #52556b;
      opacity: 0;

      margin-left: 28px;
      margin-bottom: -6px;

      background: -webkit-linear-gradient(left, #52556b 0%, #746066 20%, rgba(255, 255, 255, 0.001) 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      background-size: 500px 100%;
      background-position: -500px 0;
      background-repeat: no-repeat;

      @media (max-width: $minTablet) {
        margin-left: 18px;
        font-size: 15px;
        margin-bottom: -2px;
      }
    }

    &__player {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -10;
      visibility: hidden;
    }

    &__mask {
      position: absolute;
    }

    &__inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: none;
    }

    &__wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      z-index: 1;
      opacity: 0;
      -webkit-clip-path: url(#video-clip-wrap);
      clip-path: url(#video-clip-wrap);

      &-inner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #ffffff;
      }
    }

    &__close {
      position: fixed;

      right: 30px;
      top: 50%;

      transform: translate3d(0, -50%, 0);

      cursor: pointer;

      div {
        display: inline-block;

        color: white;
        text-transform: uppercase;
        font-family: $MinionProDisp;
        font-size: 16px;
        line-height: 30px;
        letter-spacing: 3px;

        opacity: 0;
      }

      span {
        position: absolute;
        display: inline-block;

        background: white;

        height: 1px;
        width: 20px;

        &:first-child {
          transform: rotate(-45deg);
          bottom: 50%;
          right: 0;
        }

        &:last-child {
          transform: rotate(45deg);
          top: 50%;
          right: 0;
        }
      }

      z-index: 6;
    }
  }
</style>
