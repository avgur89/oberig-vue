<template lang="pug">
  .IconScrolldown
    span
    span
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';

  @Component
  export default class IconScrolldown extends Vue {
    /**
     * @return {Array<HTMLElement>}
     */
    get lines() {
      return [...this.$el.children];
    }

    /**
     * Start infinite animation of scrollDown's lines.
     */
    startAnimation() {
      const [shortLine, tallLine] = this.lines;

      new TimelineMax({ repeat: -1, repeatDelay: 0.5 })
        // short line animation
        .fromTo(shortLine, 0.45, { immediateRender: false, y: 0 }, { y: 52 })
        .fromTo(shortLine, 0.7, { immediateRender: false, y: -20 }, { y: 0 })
        // tall line animation
        .fromTo(tallLine, 0.45, { immediateRender: false, y: 0 }, { y: 52 }, 0.11)
        .fromTo(tallLine, 0.7, { immediateRender: false, y: -52 }, { y: 0 }, 0.66);
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  .IconScrolldown {
    padding: 0 15px;

    cursor: pointer;

    overflow: hidden;

    span {
      display: inline-block;
      width: 1px;
      vertical-align: top;

      &:first-child {
        height: 17px;

        background-color: #4f556c;
      }
      &:last-child {
        height: 52px;

        margin-left: 3px;

        background-color: #815e5b;

        @media (max-width: $minTablet) {
          height: 42px;
          margin-left: 5px;
        }
      }
    }
  }
</style>
