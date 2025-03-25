// Conway's Game of Life

const CELL_SIZE = 25;
const FRAME_BREAK = 5;

let grid;

let cols;
let rows;

let autoplay = false;

let gosper;

function preload() {
  gosper = loadJSON("flyergun.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = createEmptyGrid();
};

function draw() {
  // draw
  background(220);
  
  if (autoplay && frameCount % FRAME_BREAK === 0) {
    grid = updateGrid();
  }

  drawGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = createRandomGrid();
  }
  else if (key === "e") {
    grid = createEmptyGrid();
  }
  else if (key === " ") {
    autoplay = !autoplay;
  }
  else if (key === "n") {
    grid = updateGrid();
  }
  else if (key === "g") {
    grid = gosper;
  }
}

function mouseClicked() {
  let x = Math.floor(mouseX / CELL_SIZE);
  let y = Math.floor(mouseY / CELL_SIZE);

  toggleCell(x, y);
}

function toggleCell(x, y) {
  grid[y][x] = grid[y][x] === 1 ? 0 : 1;
}

function updateGrid() {
  let newGrid = createEmptyGrid();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbours = -grid[y][x];
      
      // look at every neighbour
      for (let i = -1; i<=1; i++) {
        for (let j = -1; j<=1; j++) {
          // don't fall off edge of grid
          if (x+j >= 0 && x+j < cols && y+i >= 0 && y+i < rows) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      // apply rules
      if (grid[y][x] ===1) { // alive
        if (neighbours === 2 || neighbours === 3) {
          newGrid[y][x] = 1;
        }
      }
      else {
        if (neighbours === 3) {
          newGrid[y][x] = 1;
        }
      }
    }
  }

  return newGrid;
}

function createRandomGrid() {
  cols = Math.ceil(width / CELL_SIZE);
  rows = Math.ceil(height / CELL_SIZE);
  
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(Math.round(random()));
    }
  }

  return newGrid;
}

function createEmptyGrid() {
  cols = Math.ceil(width / CELL_SIZE);
  rows = Math.ceil(height / CELL_SIZE);
  
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }

  return newGrid;
}

function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      fill(grid[y][x] === 1 ? 0 : 255);
      rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}