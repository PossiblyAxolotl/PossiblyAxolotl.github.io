// Perlin Noise Demo
// Moving a circle

let time = 0;

let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  x = noise(time) * width;
  y = noise(time, 1) * height;

  fill("black");
  circle(x, y, 50);

  time += 0.01;
}
