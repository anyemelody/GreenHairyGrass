const canvasSketch = require("canvas-sketch");
const palettes = require("nice-color-palettes/1000.json");
import CircleFlowFieldParticle from "./circleFlowFieldParticle.js";
let palette;

// Grab P5.js from npm
const p5 = require("p5");
// Attach p5.js it to global scope
new p5();

const settings = {
  // pixelsPerInch: 300,
  // units: "in",
  // dimensions: "a4",
  dimensions: [4096, 4096],
  // Tell canvas-sketch we're using p5.js
  p5: true,
  // Turn on a render loop (it's off by default in canvas-sketch)
  animate: true,
  // We can specify WebGL context if we want
  // context: 'webgl',
  // Optional loop duration
  // duration: 6,
  // Enable MSAA
  attributes: {
    antialias: true,
  },
};

var particles = [];

const sketch = ({ width, height }) => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  background(0);

  for (let i = 0; i < 3000; i++) {
    particles[i] = new CircleFlowFieldParticle();
  }

  // Attach events to window to receive them
  // window.mouseClicked = () => {
  //   console.log('Mouse clicked');
  // };

  // Return a renderer to 'draw' the p5.js content
  return ({ context, width, height, playhead }) => {
    push();
    translate(width / 2, height / 2);

    if (particles.length > 0) {
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        particles[i].edges();
        if (particles[i].dead) {
          particles.splice(i, 1);
        }
      }
    }
    pop();
  };
};

canvasSketch(sketch, settings);
