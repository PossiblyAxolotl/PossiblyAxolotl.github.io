// Sokoban
// PossiblyAxolotl
// Thursday, April 10
// Due at 1:12pm (start of class)
//
// Extra for Experts:
// Uses https://github.com/L05/p5.touchgui for gui elements
// Allow drag & drop level loading
// Multi-layer grid to allow certain elements to be overlapped easily
// Sort of recursive tile movement for ice

// assets from https://kenney.nl/assets/scribble-platformer

// amount of tiles wide and tall
let roomWidth  = 0;
let roomHeight = 0;
// border around edges of map and maximum size for tiles
const ROOM_MARGIN_X = 64;
const ROOM_MARGIN_Y = 100;
const MAX_TILESIZE  = 75; // large number, makes sure it doesn't fill fullscreen with small maps

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

let imgTile;

let xMapOffset = 0;
let yMapOffset = 0;

let levelName = "Cool Sokoban Title";
let level;

// undo moves
let previousGrids = [];

// Other gui stuff - not related to gameplay overall
let gui, font;

function preload() {
  font = loadFont("assets/Superfats.ttf");
  level = loadStrings("levels/0.txt");

  tileSprites[TILE_WALL]   = loadImage("assets/sprites/tile_brick.png");
  tileSprites[TILE_ICE]    = loadImage("assets/sprites/tile_diagonal.png");
  tileSprites[TILE_BLOCK]  = loadImage("assets/sprites/tile_crateDiagonal.png");
  tileSprites[TILE_TARGET] = loadImage("assets/sprites/ui_button.png");
  tileSprites[TILE_PLAYER] = loadImage("assets/sprites/character_roundRed.png");
  tileSprites[TILE_EXIT]   = loadImage("assets/sprites/tile_door.png");

  imgTile = loadImage("assets/sprites/ui_numPeriod.png");
}


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  canvas.drop(fileDropped);

  textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER);

  strokeWeight(2);

  figureOutGameDimensions();

  gui = createGui();
  gui.setFont(font);

  setupButtons();

  gotoTitle();
}

function draw() {
  background(220);
  drawGrids();
  
  figureOutGameDimensions();
  
  drawGui();
  drawLevelTitle();

  processButtons();
}

function keyPressed() {
  // player movement
  let i = input();
  movePlayer(i.x, i.y);
}

// go to title screen
function gotoTitle() {
  roomWidth = 8;
  roomHeight = 6;
  createBlankGrids();
  levelName = "Sokoban";

  showTitleButtons();
}

function drawLevelTitle() {
  fill("gray");
  text(levelName, width/2,24);
}

// drag & drop files
function fileDropped(file) {
  if (file.type === "text") {
    loadLevelFromData(file.data);
    showGameButtons();
  };
}

// Window settings
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  figureOutGameDimensions();

  moveButtons();
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