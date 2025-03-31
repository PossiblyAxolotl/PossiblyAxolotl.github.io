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
let roomWidth = 16;
let roomHeight = 10;
// border around edges of map and maximum size for tiles
const ROOM_MARGIN  = 24;
const MAX_TILESIZE = 50;

// tiles
let tileSize;

const TILE_BLANK  = ".";
const TILE_WALL   = "#";
const TILE_ICE    = "%";
const TILE_BLOCK  = "O";
const TILE_TARGET = "X";
const TILE_PLAYER = "@";

const lowerTiles = [TILE_BLANK, TILE_WALL, TILE_ICE];
const upperTiles = [TILE_BLOCK, TILE_TARGET, TILE_PLAYER];

let tileSprites = {
  [TILE_WALL]   : "red",
  [TILE_ICE]    : "blue",
  [TILE_BLOCK]  : "brown",
  [TILE_TARGET] : "coral",
  [TILE_PLAYER] : "green",
};

let xMapOffset = 0;
let yMapOffset = 0;

let lowerGrid; // immovable elements like walls and decoration
let upperGrid; // moving things like enemies, items, and player (entities)

let gui;

let levelNumber = 0;
let level;

function preload() {
  level = loadStrings("levels/" + levelNumber + ".txt");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  canvas.drop(fileDropped);

  figureOutGameDimensions();

  createBlankGrids();

  gui = createGui();
  //createButton("test",50,50); // touchgui overwrites built-in functions
}

function draw() {
  background(220);
  drawGrids();
  figureOutGameDimensions();
  drawGui();
}

function loadLevelFromData(data) {
  level = data.split("\n");
  createLevel();
}

function createBlankGrids() {
  lowerGrid = [];
  upperGrid = [];

  for (let y = 0; y < roomHeight; y++) {
    let row = Array(roomWidth).fill(TILE_BLANK);

    lowerGrid.push(structuredClone(row)); // different reference
    upperGrid.push(row);
  }
}

function drawGrids() {
  for (let y = 0; y < roomHeight; y++) {
    for (let x = 0; x < roomWidth; x++) {
      let lowerTile = lowerGrid[y][x];
      let upperTile = upperGrid[y][x];

      fill((x + y) % 2 === 0 ? "white" : "gray");
      square(x*tileSize + xMapOffset, y*tileSize + yMapOffset, tileSize);

      // draw lowerTile
      if (lowerTile !== TILE_BLANK) {
        fill(tileSprites[lowerTile]);
        square(x*tileSize + xMapOffset, y*tileSize + yMapOffset, tileSize);
      }

      // draw upperTile
      if (upperTile !== TILE_BLANK) {
        fill(tileSprites[upperTile]);
        square(x*tileSize + xMapOffset, y*tileSize + yMapOffset, tileSize);
      }
    }
  }
}

function populateLowerGrid() {
  for (let row = 0; row < roomHeight; row++) {
    for (let tile = 0; tile < roomWidth; tile++) {
      let currentTile = level[row][tile];

      if (lowerTiles.includes(currentTile)) {
        lowerGrid[row][tile] = currentTile;
      }
    }
  }
}

function populateUpperGrid() {
  for (let row = 0; row < roomHeight; row++) {
    for (let tile = 0; tile < roomWidth; tile++) {
      let currentTile = level[row][tile];
      
      if (upperTiles.includes(currentTile)) {
        upperGrid[row][tile] = currentTile;
      }
    }
  }
}

function createLevel() {
  roomHeight = level.length-1;
  roomWidth = level[0].length-1;

  createBlankGrids();

  populateLowerGrid();
  populateUpperGrid();
}

function figureOutGameDimensions() {
  if (height - ROOM_MARGIN < roomHeight * MAX_TILESIZE || width - ROOM_MARGIN < roomWidth * MAX_TILESIZE) {
    let tileSizeX = (width - ROOM_MARGIN)  / roomWidth;
    let tileSizeY = (height - ROOM_MARGIN) / roomHeight;

    tileSize = tileSizeX > tileSizeY ? tileSizeY : tileSizeX;
  } 
  else {
    tileSize = MAX_TILESIZE;
  }


  xMapOffset = width  / 2 - tileSize * (roomWidth  / 2);
  yMapOffset = height / 2 - tileSize * (roomHeight / 2);
}

function fileDropped(file) {
  if (file.type === "text") {
    loadLevelFromData(file.data);
  };
}

// Window settings
function doubleClicked() {
  fullscreen(!fullscreen());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  figureOutGameDimensions();
}