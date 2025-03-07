// Generative Art Demo
// Using object notation and arrays
// March 7, 2025

let lines    = [];
let lineSize =  8;

let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(2, 100, 100, 1);
  slider.position(0,0);

  makeLines();
}

function draw() {
  background(220);

  updateLineSize();

  drawLines();
}

function spawnLine(x, y, size) {
  let choice = random(100) < 50 ? 1 : -1;
  let newLine = {
    x1: x - size/2,
    x2: x + size/2,
    y1: y - size/2 * choice,
    y2: y + size/2 * choice,
  };

  lines.push(newLine);
}

function remakeLines() {
  lines = [];
  makeLines();
}

function makeLines() {
  for (let y = 0; y < height / lineSize; y++) {
    for (let x = 0; x < width / lineSize; x++) {
      spawnLine(lineSize/2+lineSize*x, lineSize/2+lineSize*y, lineSize);
    }
  }
}

function drawLines() {
  for (let lineToDraw of lines) {
    line(lineToDraw.x1, lineToDraw.y1, lineToDraw.x2, lineToDraw.y2);
  }
}

function updateLineSize() {
  if (slider.value() !== lineSize) {
    lineSize = slider.value();
    remakeLines();
  }
}