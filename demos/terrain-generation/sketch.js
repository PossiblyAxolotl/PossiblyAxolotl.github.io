// Terrain Generation Demo

let terrain = [];

const NUMBER_OF_RECTS = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  stroke("green");
  fill("green");

  generateTerrain(width/NUMBER_OF_RECTS);
}

function draw() {
  background(220);

  for (let rectangle of terrain) {
    rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
  }
}

function generateTerrain(rectWidth) {
  let time = 0;
  let deltaTime = 0.002;
  for (let i = 0; i < NUMBER_OF_RECTS; i++) {
    terrain.push(newRectangle(i * rectWidth, rectWidth, noise(time) * height));

    time += deltaTime;
  }
}

function newRectangle(leftSide, rectWidth, rectHeight) {
  let newRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return newRect;
}