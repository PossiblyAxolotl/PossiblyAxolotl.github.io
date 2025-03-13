// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - p5party online multiplayer

const ROOM_WIDTH = 400;
const ROOM_HEIGHT = 400;
const ROOM_PADDING = 20;

const MOVE_SPEED = 2;

let shared;
let player;
let players;

let font;

function preload() {
  font = loadFont("assets/mechanoid.ttf");

  // p5party connecting
  partyConnect(
    "wss://demoserver.p5party.org", 
    "disc-room"
  );

  // p5party global/shared variables
  shared = partyLoadShared("global");
  player = partyLoadMyShared({ pos: {x: 0, y: 0, dx: 0, dy: 0}, alive: true, colour: [random(255),random(255),random(255)] });
  players = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont(font);
  textSize(32);

  stroke("white");
  noFill();
  strokeWeight(4);
  strokeJoin(ROUND);


  if (partyIsHost()) {
    partySetShared(shared, { 
      discs: [], 
      inMatch: false, 
      discCountdown: 5, 
      discCountdownReset: 5 
    });
  }
}

function draw() {
  background(0);

  // processing
  processPlayer();

  // party host only -- make sure it doesn't double up on stuff
  if (partyIsHost()) {
    countdownToSaw();
    processSaws();
  }

  // drawing
  drawPlayers();
  drawSaws();
  drawWalls();
}

// Basic drawing
function drawWalls() {
  stroke("white");
  rect(width/2 - ROOM_WIDTH/2 - ROOM_PADDING/2, height/2 - ROOM_HEIGHT/2 - ROOM_PADDING/2, ROOM_WIDTH + ROOM_PADDING, ROOM_HEIGHT + ROOM_PADDING);
}

function getOffset() {
  let x = width/2;
  let y = height/2;
  let top = y - ROOM_HEIGHT/2;
  let bottom = y + ROOM_HEIGHT/2;
  let left = x - ROOM_WIDTH/2;
  let right = x + ROOM_WIDTH/2;
  let padding = ROOM_PADDING;

  return {x, y, top, bottom, left, right, padding};
}

// Window settings
function doubleClicked() {
  fullscreen(!fullscreen());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// helpers
function deg2rad(degrees) {
  return degrees * (Math.PI/180);
}