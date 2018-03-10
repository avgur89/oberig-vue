/**
 * Animation-screen section transforms.
 *
 * @module Animation
 */

import { getPaths, Resp, animation } from './_helpers';

export default class Animation {
  /**
   * Create new Animation instance with specified settings.
   *
   * @constructor
   * @param {Object} elements - DOM nodes
   * @return {Animation}
   */
  constructor(elements) {
    this.elements = elements;

    this.break = false;

    return this;
  }

  /**
   * Draw first animation ornament.
   *
   * @return {Animation}
   */
  animationStageOne() {
    const icon           = this.elements.iconOne;
    const animationWaves = [...icon.children || icon.childNodes];
    const wavesPart      = animationWaves.length / 5;
    const firstWave      = animationWaves.slice(0, wavesPart);
    const secondWave     = animationWaves.slice(wavesPart, wavesPart * 2);
    const thirdWave      = animationWaves.slice(wavesPart * 2, wavesPart * 3);
    const fourthWave     = animationWaves.slice(wavesPart * 3, wavesPart * 4);
    const fifthWave      = animationWaves.slice(wavesPart * 4, wavesPart * 5);

    this.getFirstIconElements = getPaths(animationWaves);
    const rotateForward = this.getFirstIconElements(id => (
      id === 16 || id === 14 || id === 11 || id === 7
    ));
    const rotateBackward = this.getFirstIconElements(id => (
      id === 15 || id === 9 || id === 5
    ));

    this.animation
      .set('.SectionAnimation', { opacity: 1 })
      .fromTo(icon, 2.7, {
        scale: 1.65
      }, {
        scale: 1
      }, 0)
      .staggerFromTo(firstWave, 1.7, {
        drawSVG: '0%',
        rotation: 40,
        transformOrigin: 'center center'
      }, {
        ease: Power1.easeInOut,
        drawSVG: '100%'
      }, 0.1, 0)
      .staggerFromTo(secondWave, 1.65, {
        drawSVG: '100% 100%',
        rotation: 140,
        transformOrigin: 'center center'
      }, {
        ease: Power2.easeInOut,
        drawSVG: '0% 100%'
      }, 0.1, 0.2)
      .staggerFromTo(thirdWave, 1.6, {
        drawSVG: '0%',
        rotation: 100,
        transformOrigin: 'center center'
      }, {
        ease: Power2.easeInOut,
        drawSVG: '100%'
      }, 0.1, 0.4)
      .staggerFromTo(fourthWave, 1.6, {
        drawSVG: '0%',
        rotation: 200,
        transformOrigin: 'center center'
      }, {
        ease: Power3.easeInOut,
        drawSVG: '100%'
      }, 0.1, 0.6)
      .staggerFromTo(fifthWave, 1.55, {
        drawSVG: '100% 100%',
        rotation: 90,
        transformOrigin: 'center center'
      }, {
        ease: Power1.easeInOut,
        drawSVG: '0% 100%'
      }, 0.1, 0.8)
      .staggerFromTo(rotateForward, 2.3, { rotation: '+=180', transformOrigin: 'center center' }, {
        ease: Power1.easeInOut,
        rotation: 0,
        transformOrigin: 'center center'
      }, 0.05, 0)
      .staggerFromTo(rotateBackward, 2.3, { rotation: -180, transformOrigin: 'center center' }, {
        ease: Power2.easeInOut,
        rotation: 0,
        transformOrigin: 'center center'
      }, 0.05, 0);


    return this;
  }

  /**
   * Re-draw first animation ornament,
   * show text then hide first ornament and text.
   *
   * @return {Animation}
   */
  animationStageTwo() {
    const itemsToHide = this.getFirstIconElements(id => (
      id !== 0 && id !== 13 && id !== 14 && id !== 15
    ));
    const mainElement = this.getFirstIconElements(0);
    const secondaryElements = [
      ...this.getFirstIconElements(13),
      ...this.getFirstIconElements(14),
      ...this.getFirstIconElements(15)
    ];
    const textOneWords = this.elements.textOne.querySelectorAll('div');

    this.animation
      .fromTo(...mainElement, 1, { rotation: 0 }, {
        ease: Power1.easeInOut,
        strokeWidth: 2.2,
        morphSVG: 'M293.3,32.9c40.6,0.1,75,10.1,109.2,26.7c28.3,13.8,58.3,31.9,79.7,54.5c24.2,25.5,41.6,54.8,53.9,88.4  c10.2,28,17.5,59.4,17.5,90.9c0,38.6-37.5,68.9-52.5,101.9c-16.6,36.3-12.2,74.5-42.7,99.6c-21.9,18-54.5,21.1-81.5,31.2  c-28.5,10.7-56.6,16.9-88.8,16.9c-41.1,0-62.7-9.2-97.2-26.2c-31.8-15.6-72.1-26.7-95-53.3c-23.4-27.2-34.9-51.4-45.6-86.6  c-7.2-23.9-17.5-57.2-17.5-83.5c0-43.3,20-91.8,38.7-127.8c13.7-26.4,22.4-42.6,44-62.7c26.5-24.8,55.5-39.6,90.6-51.6  C232.5,42.4,263.9,33.1,293.3,32.9'
      }, 3)
      .fromTo(secondaryElements[2], 1, { rotation: 0, css: { strokeWidth: 0.45 } }, {
        ease: Power1.easeInOut,
        opacity: 1,
        morphSVG: 'M293.8,0.3c161.1,0.6,291.5,131.3,291.5,292.5c0,161.5-131,292.5-292.5,292.5S0.3,454.3,0.3,292.8  C0.3,131.5,132.6,0.7,293.8,0.3'
      }, 3.15)
      .fromTo(secondaryElements[1], 0.85, { rotation: 0, css: { strokeWidth: 0.4 } }, {
        ease: Power1.easeInOut,
        opacity: 1,
        morphSVG: 'M292.8,14.6C446.1,15.2,572,139.8,572,293.3C572,447.2,447.2,572,293.3,572S14.6,447.2,14.6,293.3 C14.6,139.5,139.1,14.6,292.8,14.6'
      }, 3.25)
      .fromTo(secondaryElements[0], 0.7, { rotation: 0, css: { strokeWidth: 0.3 } }, {
        ease: Power1.easeInOut,
        opacity: 1,
        morphSVG: 'M294.4,25.2c41.8,0.1,76.8,10.4,112.1,27.6c29.2,14.2,60.1,32.9,82.2,56.2c25,26.3,42.9,56.4,55.6,91.1  c10.6,28.8,18.1,61.1,18.1,93.6c0,39.8-33.6,76.6-49.1,110.6c-17.1,37.4-17.7,71.2-49.1,97c-22.5,18.5-56.2,21.7-84,32.1  c-29.4,11-58.3,17.4-91.6,17.4c-42.4,0-64.7-9.5-100.3-26.9c-32.8-16.1-74.4-27.5-98-54.9c-24.2-28-36-52.9-47-89.2  c-7.5-24.6-18.1-58.9-18.1-86c0-44.6,20.6-94.6,39.9-131.6c14.2-27.2,23.1-43.9,45.4-64.6c27.3-25.5,57.3-40.8,93.4-53.2  C231,35,264.2,25.4,294.4,25.2'
      }, 3.35)
      .staggerTo(itemsToHide, 0.05, {
        css: { opacity: 0 }
      }, 0.04, 3.1)
      .staggerTo(textOneWords, 0.5, {
        css: { transform: 'none', opacity: 1 }, ease: Power1.easeOut, force3D: true, rotation: 0.01
      }, 0.08, 3.4)
      .staggerTo(textOneWords, 0.5, {
        css: { transform: 'translateY(-60px)', opacity: 0 }, ease: Power1.easeOut, force3D: true, rotation: 0.01
      }, 0.08, 5)
      .to(...this.getFirstIconElements(0), 0.7, {
        scale: 1.2,
        ease: Power1.easeOut
      }, 4.9)
      .to(...mainElement, 0.2, {
        opacity: 0
      }, 5.5)
      .staggerTo(secondaryElements, 0.15, {
        opacity: 0
      }, 0.1, 4.85);

    return this;
  }

  /**
   * Draw second animation ornament,
   * show second text then hide it and hide ornament.
   *
   * @return {Animation}
   */
  animationStageThree() {
    const iconTwo            = this.elements.iconTwo;
    const iconTwoPathes      = [...iconTwo.querySelectorAll('path')];
    const getIconTwoElements = getPaths(iconTwoPathes);
    const forward            = getIconTwoElements(id => id !== 4 && id !== 11);
    const backward           = getIconTwoElements(id => id === 4 || id === 11);
    const iconTwoSidePathes  = getIconTwoElements(id => id === 2 || id === 9);
    const textTwoLines       = new SplitText(this.elements.textTwo, { type: 'lines' }).lines;

    this.animation
      .staggerFromTo(forward, 3, { drawSVG: '0%' }, {
        ease: Power1.easeOut,
        drawSVG: '100%',
        onComplete: () => TweenMax.set(forward, { drawSVG: '0% 100%' })
      }, 0.04, 6)
      .staggerFromTo(backward, 3, { drawSVG: '100% 100%' }, {
        ease: Power1.easeOut,
        drawSVG: '0% 100%',
        onComplete: () => TweenMax.set(backward, { drawSVG: '100%' })
      }, 0.04, 6)
      .staggerTo(textTwoLines, 0.5, {
        ease: Power1.easeOut,
        force3D: true,
        rotation: 0.01,
        css: { transform: 'none', opacity: 1 }
      }, 0.2, 6.6)
      .to(iconTwoSidePathes, 1.4, {
        ease: Power1.easeOut,
        drawSVG: '100% 100%'
      }, 9.5)
      .staggerTo(forward, 1.5, {
        ease: Power1.easeOut,
        drawSVG: '100% 100%'
      }, 0.04, 10)
      .staggerTo(backward, 1.5, {
        ease: Power1.easeOut,
        drawSVG: '0%'
      }, 0.04, 10)
      .staggerTo(textTwoLines, 0.35, {
        ease: Power1.easeOut,
        force3D: true,
        rotation: 0.01,
        css: { opacity: 0 }
      }, 0.2, 10)
      .staggerTo(textTwoLines, 0.5, {
        ease: Power1.easeOut,
        force3D: true,
        rotation: 0.01,
        css: { transform: 'translateY(-60px)' }
      }, 0.2, 10);

    return this;
  }

  /**
   * Draw third animation ornament,
   * show third text then hide them and show final icon.
   *
   * @return {Animation}
   */
  animationStageFour() {
    const iconThree        = this.elements.iconThree;
    const iconThreePathes  = iconThree.querySelectorAll('path');
    const iconThreeCircles = iconThree.querySelectorAll('circle');
    const textThreeLines   = this.elements.textThree.querySelectorAll('div');
    const iconFinal        = this.elements.iconFinal;

    this.animation
      .fromTo(iconThreeCircles, 0.8, { opacity: 0 }, {
        ease: Power1.easeInOut,
        opacity: 1
      }, 11.3)
      .fromTo(iconThreePathes, 1.9, { drawSVG: '0%' }, {
        ease: Power1.easeInOut,
        drawSVG: '100%'
      }, 11.3)
      .staggerTo(textThreeLines, 0.5, {
        ease: Power1.easeOut,
        css: { transform: 'none', opacity: 1 }
      }, 0.1, 12)
      .to(iconThree, 0.85, {
        opacity: 0,
        ease: Power1.easeInOut
      }, 13.9)
      .staggerTo(textThreeLines, 0.3, {
        ease: Power1.easeOut,
        force3D: true,
        rotation: 0.01,
        css: { opacity: 0 }
      }, 0.08, 13.8)
      .staggerTo(textThreeLines, 0.43, {
        ease: Power1.easeOut,
        force3D: true,
        rotation: 0.01,
        css: { transform: 'translateY(-60px)' }
      }, 0.08, 13.8);

    if (!Resp.isMobile) {
      this.animation.to(iconFinal, 1, {
        opacity: 1,
        ease: Power1.easeInOut
      }, 13.9);
    }

    return this;
  }

  /**
   * Run animation
   *
   * @return {Promise} resolved when animation is finished
   */
  run() {
    return new Promise((resolve) => {
      this.animation = new TimelineMax({
        onComplete: () => {
          this.afterAnimation();
          resolve();
        }
      });

      this.startAnimation();
    });
  }

  /**
   * Run animation.
   */
  startAnimation() {
    this
      .animationStageOne()
      .animationStageTwo()
      .animationStageThree()
      .animationStageFour();
  }

  /**
   * Finish animation (animate to opacity 0 and break)
   *
   * @async
   */
  async breakAnimation() {
    await animation(this.elements.screen, 0.5, { opacity: 0 });

    this.break = true;

    this.animation.kill();

    if (!Resp.isMobile) {
      TweenMax.set(this.elements.iconFinal, {
        width: 268,
        height: 355,
        top: '5px'
      });
    }

    TweenMax.set('.SliderRadial__images', {
      boxShadow: 'inset 0 16px 35px rgba(93, 102, 114, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0)'
    });
    TweenMax.fromTo(['.SliderRadial__image:nth-child(3)', '.SliderRadial__images'], 0.8,
      { opacity: 0 },
      { opacity: 1, delay: 0.4 }
    );
  }

  /**
   * Return final icon's default size and hide it.
   *
   * @TODO: refactor shieet
   */
  afterAnimation() {
    const { iconFinal, screen } = this.elements;
    const imageContainer = document.querySelector('.SliderRadial__images');
    const afterAnimationTimeline = new TimelineMax();

    if (!this.break) {
      afterAnimationTimeline.set(imageContainer, {
        boxShadow: 'inset 0 16px 35px rgba(93, 102, 114, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0)'
      }, 0);
    }

    if (Resp.isMobile) {
      afterAnimationTimeline
        .set('.SliderRadial__image:nth-child(3)', { opacity: 1 }, 0)
        .fromTo('.SectionSymbols__slider', 2, {
          opacity: 0
        }, {
          opacity: 1,
          onComplete() {
            TweenMax.set(screen, { display: 'none' });
            TweenMax.set(imageContainer, { overflow: 'hidden' });
          }
        }, 0);

      return;
    }

    afterAnimationTimeline.to(iconFinal, 0.65, {
      ease: Power1.easeOut,
      width: 268,
      height: 355,
      top: '5px',
      onComplete() {
        TweenMax.set(screen, { display: 'none' });
        TweenMax.set(imageContainer, { overflow: 'hidden' });
      }
    }, 0);
  }
}
