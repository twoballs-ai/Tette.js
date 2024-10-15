import { Context } from './context.js';
import { SceneManager } from './sceneManager.js';

export class Core {
  constructor(canvasId, backgroundColor = 'black', renderType = '2d', initialSceneName = 'main', controlType = 'keyboard') {
    this.contextClass = new Context(canvasId, renderType);
    this.context = this.contextClass.getContext();
    if (!this.context) {
      console.error("Failed to initialize the rendering context.");
      return;
    }
    this.canvas = this.contextClass.getCanvas();
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.lastTime = 0;
    this.backgroundColor = backgroundColor;
    this.renderType = renderType;

    this.sceneManager = new SceneManager();
    this.createScene(initialSceneName);

    // Control type selection logic
    this.controls = null;
    this.setupControls(controlType); // Initialize controls based on the user input
  }

  async setupControls(controlType) {
    switch (controlType) {
      case 'keyboard':
        const keyboardModule = await import('../controls/keyboardControl.js');
        this.controls = new keyboardModule.KeyboardControl();
        break;
      case 'mouse':
        const mouseModule = await import('../controls/mouseControl.js');
        this.controls = new mouseModule.MouseControl(this.canvas);
        break;
      case 'touch':
        const touchModule = await import('../controls/touchControl.js');
        this.controls = new touchModule.TouchControl(this.canvas);
        break;
      default:
        console.error('Unknown control type');
        break;
    }
  }

  createScene(sceneName) {
    this.sceneManager.createScene(sceneName);
    this.changeScene(sceneName);
  }

  changeScene(sceneName) {
    this.sceneManager.changeScene(sceneName);
  }

  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.clearScreen();
    this.render();

    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  update(deltaTime) {
    if (this.controls) {
      this.controls.update(); // Let controls update each frame
    }
    this.sceneManager.update(deltaTime);
  }

  clearScreen() {
    if (this.renderType === '2d') {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.width, this.height);
    } else if (this.renderType === 'webgl') {
      this.context.clearColor(0, 0, 0, 1); // Clear with black background
      this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
    }
  }

  render() {
    this.sceneManager.render(this.context);
  }

  start() {
    this.lastTime = performance.now();
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }
}