// 2D Grid Neighbours Demo

const SQUARE_DIMENSIONS = 20;

let cellSize;
let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // largest possible grid
  if (height > width) {
    cellSize = width / SQUARE_DIMENSIONS;
  } 
  else {
    cellSize = height / SQUARE_DIMENSIONS;
  }

  grid = generateRandomGrid(SQUARE_DIMENSIONS,SQUARE_DIMENSIONS);
}

function draw() {
  background(220);

  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
  else if (key === "e") {
    grid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
}

function mouseClicked() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  // self
  toggleCell(x, y);

  // neighbours
  toggleCell(x-1, y);
  toggleCell(x+1, y);
  toggleCell(x, y-1);
  toggleCell(x, y+1);
}

function toggleCell(x, y) {
  if (x >= 0 && x < SQUARE_DIMENSIONS && y >= 0 && y < SQUARE_DIMENSIONS) {
    grid[y][x] = grid[y][x] === 1 ? 0 : 1;
  }
}

function displayGrid() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      fill(grid[y][x] === 1 ? "black" : "white");
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function generateGrid(columns, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < columns; x++) {
      newGrid[y].push(0);
    }
  }

  return newGrid;
}

function generateRandomGrid(columns, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < columns; x++) {
      newGrid[y].push(Math.round(random()));
    }
  }

  return newGrid;
}