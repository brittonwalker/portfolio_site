import * as THREE from 'three';
import Sizes from './Sizes';
import Time from './Time';
import Camera from './Camera';
import Renderer from './Renderer.js';
import World from './World';
import Environment from './Environment';

export default class Webgl {
  constructor(canvas) {
    window.bw = this;
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.world = new World(this);
    // window.addEventListener('resize', () => {
    //   this.width = window.innerWidth;
    //   this.height = window.innerHeight;
    //   this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    // });
    this.sizes.on('resize', () => {
      console.log('A resize occurred');
    });
    this.time.on('tick', () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.renderer.update();
  }
}
