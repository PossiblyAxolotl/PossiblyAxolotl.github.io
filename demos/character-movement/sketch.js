// Rectangle Grid Demo
// https://opengameart.org/content/wall-grass-rock-stone-wood-and-dirt-480

const CELL_SIZE = 40;

const OPEN_TILE = 0;
const WALL_TILE = 1;

const PLAYER = 9;

let player = {
  x : 0,
  y : 0,
};

let grid;
let cols;
let rows;

let imgGrass;
let imgPath;
let imgMan;

function preload() {
  imgGrass = loadImage("assets/grass.png");
  imgPath  = loadImage("assets/paving.png");
  imgMan   = loadImage("assets/man.jpg");
}

function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);

  createGrid();

  grid[player.y][player.x] = PLAYER;
};

function draw() {
  // draw
  background(220);
  drawGrid();
}

function mouseClicked() {
  let x = Math.floor(mouseX / CELL_SIZE);
  let y = Math.floor(mouseY / CELL_SIZE);

  toggleCell(x, y);
}

function keyPressed() {
  if (key === "w") {
    movePlayer(player.x, player.y - 1);
  }
  if (key === "s") {
    movePlayer(player.x, player.y + 1);
  }
  if (key === "a") {
    movePlayer(player.x - 1, player.y);
  }
  if (key === "d") {
    movePlayer(player.x + 1, player.y);
  }
}

function movePlayer(x, y) {
  if ( x >= 0 && y >= 0 && x <cols && y < rows && grid[y][x] === OPEN_TILE) {
    grid[player.y][player.x] = OPEN_TILE;
  
    player.x = x;
    player.y = y;
  
    // add to grid
    grid[player.y][player.x] = PLAYER;
  }
}

function createGrid() {
  cols = Math.ceil(width / CELL_SIZE);
  rows = Math.ceil(height / CELL_SIZE);
  
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
      if (grid[y][x] === WALL_TILE) {
        //fill("black");
        image(imgGrass, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === OPEN_TILE) {
        //fill("white");
        image(imgPath, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === PLAYER) {
        //fill("red");
        //rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        image(imgMan, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function toggleCell(x, y) {
  grid[y][x] = grid[y][x] === WALL_TILE ? OPEN_TILE : WALL_TILE;
}
