// Rectangle Grid Demo

let grid;
let cellSize = 10;

let cols;
let rows;

let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  createGrid();

  slider = createSlider(5, 100, 10, 1);
  slider.position(0,0);
};

function draw() {
  // process slider
  if (slider.value() !== cellSize) {
    cellSize = slider.value();
    
    createGrid();
  }

  // draw
  background(220);
  drawGrid();
}

function createGrid() {
  cols = Math.ceil(width / cellSize);
  rows = Math.ceil(height / cellSize);
  
  grid = [];
  for (let y = 0; y < rows; y++) {
    grid.push([]);
    for (let x = 0; x < cols; x++) {
      grid[y].push(Math.round(random()));
    }
  }
}

function drawGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      fill(grid[y][x] === 1 ? 0 : 255);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}