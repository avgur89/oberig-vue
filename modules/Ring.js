let PIXI;
let loaded;

if (process.browser) {
  PIXI = require('pixi.js');
}

/**
 * @class Ring
 */
export default class Ring {
  /**
   * @param {HTMLElement} container
   * @param {Number} animationSpeed
   * @param {Number} totalFrames
   * @return {Ring}
   */
  constructor(container, animationSpeed = 0.3, totalFrames = 157) {
    this._container = container;
    this._animationSpeed = animationSpeed;
    this._totalFrames = totalFrames;

    this._pixi = new PIXI.Application(360, 360, {
      transparent: true,
    });
    this._container.appendChild(this._pixi.view);

    this._setup();

    return this;
  }

  /**
   * Play/pause indicator
   *
   * @public
   * @return {Boolean}
   */
  paused() {
    return !this._clip.playing;
  }

  /**
   * Start sequence animation (at specified frame index)
   *
   * @public
   * @param {Number} frame
   * @return {Ring}
   */
  play(frame) {
    frame ? this._clip.gotoAndPlay(frame) : this._clip.play();

    return this;
  }

  /**
   * Stop sequence (at specified frame index)
   *
   * @public
   * @param {Number} frame
   * @return {Ring}
   */
  pause(frame) {
    frame ? this._clip.gotoAndStop(frame) : this._clip.stop();

    return this;
  }

  /**
   * Stop and destroy sprite animation
   *
   * @public
   * @return {Ring}
   */
  destroy() {
    this._clip.destroy();

    return this;
  }

  /**
   * Load assets and run callback
   *
   * @private
   */
  _setup() {
    if (loaded) return this._onAssetsLoaded();

    loaded = true;

    PIXI.loader
      .add('/sequence/main/ring_frames.json')
      .load(this._onAssetsLoaded);
  }

  /**
   * Create frames and run sequence animation
   *
   * @private
   * @this {Ring}
   */
  _onAssetsLoaded = () => {
    let num;

    const frames = Array(this._totalFrames).fill(0).map((zero, i) => {
      i += 1;
      num = i <= 9 ? `00${i}` : i <= 99 ? `0${i}` : i;
      return PIXI.Texture.fromFrame(`frame0${num}.png`);
    });

    this._clip = new PIXI.extras.AnimatedSprite(frames);

    this._clip.animationSpeed = this._animationSpeed;
    this._clip.play();

    this._pixi.stage.addChild(this._clip);
  }
}
