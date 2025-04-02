// Project Title
// Your Name
// Tueesday, April 8
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// uses https://github.com/L05/p5.touchgui for gui elements
// Allow drag & drop level loading

// amount of tiles wide and tall
let roomWidth = 16;
let roomHeight = 10;
// border around edges of map and maximum size for tiles
const ROOM_MARGIN_X = 64;
const ROOM_MARGIN_Y = 100;
const MAX_TILESIZE  = 100; // large number, makes sure it doesn't fill fullscreen with small maps

// tiles
let tileSize;

const TILE_BLANK  = ".";
const TILE_WALL   = "#";
const TILE_ICE    = "%";
const TILE_BLOCK  = "O";
const TILE_TARGET = "X";
const TILE_PLAYER = "@";
const TILE_EXIT   = "&";

const lowerTiles = [TILE_BLANK, TILE_WALL, TILE_ICE, TILE_TARGET, TILE_EXIT]; // tiles on the lower grid - don't move
const upperTiles = [TILE_BLOCK, TILE_PLAYER]; // tiles on the upper grid

let tileSprites = {
  [TILE_WALL]   : "red",
  [TILE_ICE]    : "lightblue",
  [TILE_BLOCK]  : "brown",
  [TILE_TARGET] : "coral",
  [TILE_PLAYER] : "green",
  [TILE_EXIT]   : "yellow",
};

let xMapOffset = 0;
let yMapOffset = 0;

let levelNumber = 0;
let levelName = "";
let level;

// undo moves
let previousGrids = [];

// Other ui-ey stuff - not related to gameplay overall
let gui, font, buttonReset, buttonBack;

function preload() {
  font = loadFont("assets/Superfats.ttf");
  level = loadStrings("levels/" + levelNumber + ".txt");
}

let b;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  canvas.drop(fileDropped);

  textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER);

  strokeWeight(2);

  figureOutGameDimensions();

  createBlankGrids();

  gui = createGui();
  b = createButton("test",50,50); // touchgui overwrites built-in functions

  buttonReset = createButton("Reset", width/2-64-48, height-40);
  buttonReset.visible = false;
  buttonReset.enabled = false;

  buttonBack  = createButton("Undo", width/2-64+48, height-40);
  buttonBack.visible = false;
  buttonBack.enabled = false;
}

function draw() {
  background(220);
  drawGrids();
  figureOutGameDimensions();
  drawGui();

  fill("gray");
  text(levelName, width/2,24);

  processButtons();

  if (b.isPressed) {
    initialLevelSetup();
    createLevel();

    b.visible = false;
    b.enabled = false;

    showGameButtons();
  }
}

function keyPressed() {
  let i = input();
  movePlayer(i.x, i.y);
}

// buttons
function showGameButtons() {
  buttonReset.visible = true;
  buttonReset.enabled = true;

  buttonBack.visible = true;
  buttonBack.enabled = true;
}

function processButtons() {
  if (buttonReset.isPressed) {
    createLevel();
    previousGrids = [];
  }

  if (buttonBack.isPressed && previousGrids.length > 0) {
    let previousGrid = previousGrids.pop();
    upperGrid = previousGrid.upper;
    lowerGrid = previousGrid.lower;

    player = previousGrid.player;
  }
}

// allow drag & drop
function fileDropped(file) {
  if (file.type === "text") {
    loadLevelFromData(file.data);
  };
}

// Window settings
/*function doubleClicked() {
  fullscreen(!fullscreen());
}*/

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  figureOutGameDimensions();

  buttonReset.x = width/2-64;
  buttonReset.y = height-40;
}

function figureOutGameDimensions() {
  // make sure game always fits in screen margins
  if (height - ROOM_MARGIN_Y < roomHeight * MAX_TILESIZE || width - ROOM_MARGIN_X < roomWidth * MAX_TILESIZE) {
    let tileSizeX = (width - ROOM_MARGIN_X)  / roomWidth;
    let tileSizeY = (height - ROOM_MARGIN_Y) / roomHeight;

    // make tilesize whatever the smaller maximum is based on screen dimensions
    tileSize = tileSizeX > tileSizeY ? tileSizeY : tileSizeX;
  } 
  else {
    // tilesize isn't limited above, set it to the maximum
    tileSize = MAX_TILESIZE;
  }

  // center map on screen
  xMapOffset = width  / 2 - tileSize * (roomWidth  / 2);
  yMapOffset = height / 2 - tileSize * (roomHeight / 2);
}