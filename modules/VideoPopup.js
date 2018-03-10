/**
 * Popup module.
 *
 * Coderiver studio module was taken as basis
 * Coderiver studio - http://riverco.de/
 */

import { Resp, safariClipPathRerender } from './_helpers';

export default class VideoPopup {
  constructor(prop) {
    this._container = prop.container;
    this._trigger = document.querySelector(prop.trigger);
    this._closeBtn = document.querySelector(prop.closeBtn);
    this._popupWrap = prop.popupWrap || null;
    this._popupSelector = prop.popup;

    this._clip = prop.clip;
    this._clipWrap = prop.clipWrap;

    this._wavesDuration = prop.wavesDuration;
    this._enableOpacityAnimation = prop.enableOpacityAnimation;
    this._opacityAnimationDuration = this._enableOpacityAnimation ? 0.6 : 0;

    this._timeLine = new TimelineMax({ paused: true });

    this._onOpen = prop.onOpen;
    this._onClose = prop.onClose;
    this._cbContext = prop.cbContext;

    if (Resp.isSafari || Resp.isMobile) {
      const clipPathBlock = document.querySelector(prop.popupWrap);
      const clipPathInitialValue = clipPathBlock.style.clipPath;

      this._rerenderClipPathBlock = () => {
        safariClipPathRerender(clipPathBlock, clipPathInitialValue);
      };
    }

    if (this._enableOpacityAnimation) {
      const popupWrap = document.querySelector(this._popupWrap);
      popupWrap.style.clipPath = 'none';
      popupWrap.style.webkitClipPath = 'none';
    }

    this._init();
  }

  static get _scaleData() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const scaleData = (windowHeight > windowWidth) ? windowHeight : windowWidth;

    return scaleData * 1.1;
  }

  _clipPosition(element) {
    const offset = element.getBoundingClientRect();
    const addittionalOffset = Resp.isMobile ? 16 : 22;

    this._positionLeft = offset.left + addittionalOffset;
    this._positionTop = offset.top + addittionalOffset;
  }

  _animWrap() {
    if (this._enableOpacityAnimation) {
      return (
        new TimelineMax()
          .add(
            new TimelineMax()
              .to(this._popupWrap, this._opacityAnimationDuration, {
                alpha: 1,
                ease: Power0.easeNone
              }, 0)
          )
      );
    }

    return (
      new TimelineMax()
        .set(this._popupWrap, {
          opacity: 1
        })
        .to(this._clipWrap, this._wavesDuration, {
          scale: VideoPopup._scaleData,
          ease: Power3.easeIn,
          onUpdate: this._rerenderClipPathBlock
        }, 0)
    );
  }

  _play() {
    this._timeLine
      // set style
      .set(this._clip, { x: this._positionLeft, y: this._positionTop })
      .set(this._clipWrap, { transformOrigin: 'center center' })
      // show popups wrapper
      .set(this._container, {
        zIndex: 100,
        visibility: 'visible',
      })
      .add(this._animWrap(), 0)
      .eventCallback('onReverseComplete', () => {
        const delay = this._opacityAnimationDuration;
        TweenMax.set(this._activePopup, {
          display: 'none',
          visibility: 'hidden',
          opacity: 0,
          zIndex: -10,
          delay
        });
        TweenMax.set(this._container, {
          zIndex: -1,
          visibility: 'hidden',
          delay
        });
      })
      .play();
  }

  _reverse() {
    this._timeLine.reverse();
  }

  _open() {
    let _this = this;
    this._trigger.addEventListener('click', function openPopup() {
      _this._activePopup = document.querySelector(_this._popupSelector);

      _this._clipPosition(this);
      TweenMax.set(_this._activePopup, {
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        zIndex: 10
      });
      _this._play();

      // onOpen callback
      _this._onOpen.call(this._cbContext);
    });
  }

  close = async () => {
    TweenMax.set(this._clip, { x: this._positionLeft, y: this._positionTop });

    // onOpen callback
    await this._onClose.call(this._cbContext);

    this._reverse();
  };

  _close() {
    this._closeBtn.addEventListener('click', this.close);
  }

  _init() {
    this._open();
    this._close();
  }
}
