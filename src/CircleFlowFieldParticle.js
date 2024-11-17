const p5 = require("p5");

function CircleFlowFieldParticle() {
  let noiseFloat;
  this.size = 1600;
  this.radius = random(this.size);
  this.theta = random(TWO_PI);
  this.pos = createVector(
    sin(this.theta) * this.radius,
    cos(this.theta) * this.radius
  );
  this.pPos = this.pos.copy();
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 2.0;
  this.lifeTime = int(random(100, 500));
  this.age = 0;
  this.dead = false;
  this.hue = floor(random(40, 120));

  this.update = function () {
    noiseFloat = noise(this.pos.x * 0.002, this.pos.y * 0.002); //smoothier, smaller
    this.acc.x = cos(noiseFloat * TWO_PI * 2); //smoothier, smaller
    this.acc.y = sin(noiseFloat * TWO_PI * 2);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    // this.acc.mult(0);
    this.age++;
  };

  this.show = function () {
    colorMode(HSB, 360, 100, 100);
    let lifeRatio = this.age / this.lifeTime;
    // let hue = floor(random(50, 80));
    let sat = map(this.acc.x, -1, 1, 30, 90);
    let bright = map(this.acc.y, -1, 1, 20, 90);

    noFill();
    stroke(this.hue, sat, bright, (1 - lifeRatio) * 255);
    strokeWeight(lifeRatio * 8);
    line(this.pos.x, this.pos.y, this.pPos.x, this.pPos.y);
    this.updatePrev();
  };

  this.updatePrev = function () {
    this.pPos.x = this.pos.x;
    this.pPos.y = this.pos.y;
  };

  this.edges = function () {
    if (this.age >= this.lifeTime) this.dead = true;

    if (sq(this.pos.x) + sq(this.pos.y) > sq(this.size)) {
      this.dead = true;
      ellipse(this.pos.x, this.pos.y, 8, 8);
    }
  };
}

export default CircleFlowFieldParticle;
