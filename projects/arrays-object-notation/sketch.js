// Disc Room Ripoff
// PossiblyAxolotl
// March 20, 2025
//
// Extra for Experts:
// - p5party online multiplayer
// - the game does some weird funky stuff where it processes as if (0,0) is the middle of the screen if that counts
// - wobbly vector shapes, separate files

const ROOM_WIDTH = 400;
const ROOM_HEIGHT = 400;
const ROOM_PADDING = 100;

let shared;
let player;
let players;

let font;

function preload() {
  font = loadFont("assets/Vector Waves.ttf");

  // p5party connecting
  partyConnect(
    "wss://demoserver.p5party.org", 
    "disc-room"
  );

  // p5party global/shared variables
  shared = partyLoadShared("global");
  players = partyLoadGuestShareds();
  player = partyLoadMyShared({
    pos: {
      x: random(ROOM_WIDTH) - ROOM_WIDTH/2, 
      y: random(ROOM_HEIGHT) - ROOM_HEIGHT/2, 
      dx: 0, 
      dy: 0
    }, 
    alive: true, 
    colour: [random(255),random(255),random(255),255]
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER);

  strokeWeight(2);
  strokeJoin(ROUND);

  //noCursor();

  // create new globals if you're the first one in
  if (partyIsHost()) {
    partySetShared(shared, { 
      discs: [], 
      inMatch: false, 
      discCountdown: 5, 
    });
  }

  // do not appear until next match
  if (shared.inMatch) {
    player.alive = false;
  }
}

function draw() {
  background(0);
  noFill();

  // processing
  processPlayer();
  collideWithSaws(player);

  // party host only -- make sure it doesn't double up processing
  if (partyIsHost()) {
    countdownToSaw();
    processSaws();
  }

  // drawing
  drawPlayers();
  drawSaws();
  drawWalls();

  if (!player.alive) {
    drawDeadOverlay();
  }
}

// General game drawing, not object specific
function drawWalls() {
  stroke("white");
  rect(width/2 - ROOM_WIDTH/2 - ROOM_PADDING/2, height/2 - ROOM_HEIGHT/2 - ROOM_PADDING/2, ROOM_WIDTH + ROOM_PADDING, ROOM_HEIGHT + ROOM_PADDING);
  
  // wobbly player edge wall
  stroke(70);
  wobbleRect(width/2 - ROOM_WIDTH/2, height/2 - ROOM_HEIGHT/2, ROOM_WIDTH, ROOM_HEIGHT, 1);
}

function drawDeadOverlay() {
  noStroke();

  fill("white");
  text("Spectating", width/2, height/2 - ROOM_WIDTH/2 - 26);

  fill(player.colour[0], player.colour[1], player.colour[2]);
  text("THIS IS YOUR COLOUR", width/2, height/2 + ROOM_WIDTH/2 + 26);
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