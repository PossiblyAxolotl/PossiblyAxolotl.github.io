// Fireworks OOP Demo

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    let angle = random(0, 359);
    angle = deg2rad(angle);

    this.dx = Math.sin(angle) * random(1, 5);
    this.dy = -Math.cos(angle) * random(1, 5);

    this.radius = 2;

    this.color = [255, 0, 0, 255];
  }

  display() {
    noStroke();

    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    this.dy += 0.05;

    this.color[3]--;
  }

  isDead() {
    return this.color[3] <= 0;
  }
}

const PARTICLE_COUNT = 150;

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let firework of theFireworks) {
    if (firework.isDead()) {
      let i = theFireworks.indexOf(firework);
      theFireworks.splice(i, 1);
    }
    else {
      firework.update();
      firework.display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let f = new Particle(mouseX, mouseY);

    theFireworks.push(f);
  }
}

function deg2rad(angle) {
  return angle * Math.PI / 180;
}