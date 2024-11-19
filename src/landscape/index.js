import canvasSketch from "canvas-sketch";
import p5 from "p5";
import FlowFieldParticle from "./FlowFieldParticle";

new p5();
let particles = [];

const settings = {
  // pixelsPerInch: 72,
  // units: 'in',
  // dimensions: "a1",
  dimensions: [3600, 2025],
  // Tell canvas-sketch we're using p5.js
  p5: true,
  // Turn on a render loop (it's off by default in canvas-sketch)
  animate: true,
  // We can specify WebGL context if we want
  // context: 'webgl',
  // Optional loop duration
  // duration: 20,
  // Enable MSAA
  attributes: {
    antialias: true,
  },
};

export const sketch = ({ width, height }) => {
  let diaParameter = 3600;
  background(0);

  for (let i = 0; i < Math.round(diaParameter * 3.); i++) {
    let hue = floor(random(10, 120));
    particles[i] = new FlowFieldParticle(hue, Math.round(diaParameter / 240));
  }

  // Attach events to window to receive them
  // window.mouseClicked = () => {
  //   console.log('Mouse clicked');
  // };

  // Return a renderer to 'draw' the p5.js content
  return ({ context, width, height, playhead }) => {
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
  };
};

canvasSketch(sketch, settings);
