// Project Title
// Your Name
// Tueesday, April 8
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// https://p5js.org/libraries/
// https://github.com/L05/p5.touchgui
// createFileInput & drag/drop to load

// amount of tiles wide and tall
const ROOM_WIDTH = 16;
const ROOM_HEIGHT = 16;
// border around edges of map and maximum size for tiles
const ROOM_MARGIN  = 24;
const MAX_TILESIZE = 40;

// tiles
const TILE_BLANK = 0;
const TILE_WALL  = 1;

let tileSize = 40;

let tileSprites = [
  "nothing, this is a blank tile. Hello!",
  "red"
];

let xMapOffset = 0;
let yMapOffset = 0;

let lowerGrid; // immovable elements like walls and decoration
let upperGrid; // moving things like enemies, items, and player (entities)

let gui;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  canvas.drop(fileDropped);

  figureOutGameDimensions();

  createBlankGrids();

  gui = createGui();
  createButton("test",50,50); // touchgui overwrites built-in functions
}

function draw() {
  background(220);
  drawGrids();
  figureOutGameDimensions();
  drawGui();
}

function createBlankGrids() {
  lowerGrid = [];
  upperGrid = [];

  for (let y = 0; y < ROOM_HEIGHT; y++) {
    let row = Array(ROOM_WIDTH).fill(TILE_BLANK);

    lowerGrid.push(structuredClone(row)); // different reference
    upperGrid.push(row);
  }
}

function drawGrids() {
  for (let y = 0; y < ROOM_HEIGHT; y++) {
    for (let x = 0; x < ROOM_WIDTH; x++) {
      let lowerTile = lowerGrid[y][x];
      let upperTile = upperGrid[y][x];

      fill((x + y) % 2 === 0 ? "white" : "gray");
      square(x*tileSize + xMapOffset, y*tileSize + yMapOffset, tileSize);

      // draw lowerTile
      if (lowerTile > 0) {
        fill(tileSprites[lowerTile]);
        square(x*tileSize + xMapOffset, y*tileSize + yMapOffset, tileSize);
      }

      // draw upperTile
    }
  }
}

function figureOutGameDimensions() {
  if (height - ROOM_MARGIN < ROOM_HEIGHT * MAX_TILESIZE || width - ROOM_MARGIN < ROOM_WIDTH * MAX_TILESIZE) {
    let tileSizeX = (width - ROOM_MARGIN)  / ROOM_WIDTH;
    let tileSizeY = (height - ROOM_MARGIN) / ROOM_HEIGHT;

    tileSize = tileSizeX > tileSizeY ? tileSizeY : tileSizeX;
  } 
  else {
    tileSize = MAX_TILESIZE;
  }


  xMapOffset = width  / 2 - tileSize * (ROOM_WIDTH  / 2);
  yMapOffset = height / 2 - tileSize * (ROOM_HEIGHT / 2);
}

function fileDropped(file) {
  if (file.subtype === "json") {
    // load level
  }
}

// Window settings
function doubleClicked() {
  fullscreen(!fullscreen());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  figureOutGameDimensions();
}