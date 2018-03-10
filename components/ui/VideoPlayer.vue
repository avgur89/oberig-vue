<template lang="pug">
  .VideoPlayer.video-player-box(
    v-video-player:videoPlayer="playerOptions",
    @ended="onVideoEnded"
  )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';

  @Component({
    props: {
      videoSrc: {
        type: String,
        required: true
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      playsinline: {
        type: Boolean,
        default: true
      },
      muted: {
        type: Boolean,
        default: false
      },
      onVideoEnded: {
        type: Function,
        default: () => () => {}
      },
      poster: {
        type: String,
        required: false
      }
    }
  })
  export default class VideoPlayer extends Vue {
    /**
     * Video.js plugin options.
     *
     * @type {Object}
     */
    playerOptions = {
      start: 0,
      playsinline: this.playsinline,
      muted: this.muted,
      language: 'en',
      sources: [{
        type: 'video/mp4',
        src: this.videoSrc
      }],
      preload: 'metadata'
    };

    beforeMount() {
      if (this.poster) this.playerOptions.poster = this.poster;
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/variables';

  .VideoPlayer {
    width: 100%;
    height: 100%;

    .video-js {
      width: 100%;
      height: 100%;

      .vjs-big-play-button {
        display: none;
      }

      .vjs-control-bar {
        display: flex !important;
        background: transparent;
      }

      .vjs-progress-holder {
        height: 1px;

        &:before,
        &:after {
          position: absolute;
          left: 0;
          content: '';
          width: 100%;
          height: 10px;
        }

        &:before {
          bottom: 0;
        }
        &:after {
          top: 0;
        }
      }

      .vjs-slider {
        background: rgba(255, 255, 255, 0.3);
      }

      .vjs-fade-in,.vjs-fade-out {
        visibility: visible !important;
        opacity: 1 !important;
        transition-duration: 0s!important;
      }

      .vjs-control-bar {
        position: absolute;

        top: calc(50% - 15px);
        left: 40px;

        width: calc(100% - 160px);
      }

      .vjs-play-control {
        outline: none;
        margin-right: 15px;
      }

      .vjs-fullscreen-control,
      .vjs-volume-panel {
        display: none;
      }

      .vjs-load-progress {
        background-color: rgba(255, 255, 255, 0.3);

        div {
          background: transparent;
        }
      }

      .vjs-play-progress {
        height: 1px;
        background-color: rgb(255, 255, 255);

        &:before {
          display: none;
        }
      }
    }
  }
</style>
