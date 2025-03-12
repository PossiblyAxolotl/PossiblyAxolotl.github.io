// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - p5party online multiplayer

const ROOM_WIDTH = 500;
const ROOM_HEIGHT = 500;
const ROOM_PADDING = 20;

let shared;
let player;
let players;

function preload() {
  partyConnect(
    "wss://demoserver.p5party.org", 
    "disc-room"
  );

  shared = partyLoadShared("global");
  player = partyLoadMyShared({ pos: {x: 0, y: 0}, alive: true, colour: [random(255),random(255),random(255)] });
  players = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  stroke("white");
  noFill();
  strokeWeight(4);
  strokeJoin(ROUND);

  if (partyIsHost()) {
    partySetShared(shared, { discs: [], inMatch: false, discCountdown: 3, discCountdownReset: 3 });
  }
}

function draw() {
  background(0);

  // processing
  processPlayer();

  // party host only -- make sure it doesn't double up on blade spawning
  if (partyIsHost()) {
    countdownToSaw();
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

function drawPlayers() {
  // Player will be an image so anchor will be in the center
  for (let p of players) {
    stroke(p.colour);
    rect(width/2 + p.pos.x - 5, height/2 + p.pos.y - 5, 10, 10);
  }
}

// Player movement
function processPlayer() {
  player.pos.x += horizontalButtons();
  player.pos.y += verticalButtons();

  clampPlayerPosition();
}

function clampPlayerPosition() {
  // Horizontal clamp
  if (Math.abs(player.pos.x) > ROOM_WIDTH/2) {
    player.pos.x = ROOM_WIDTH/2 * Math.sign(player.pos.x);
  }

  // Vertical clamp
  if (Math.abs(player.pos.y) > ROOM_HEIGHT/2) {
    player.pos.y = ROOM_HEIGHT/2 * Math.sign(player.pos.y);
  }
}

// Sawblades
function createSaw() {
  let newSaw = {
    x: random(width/2-ROOM_WIDTH/2, width/2+ROOM_WIDTH/2),
    y: random(height/2-ROOM_HEIGHT/2, height/2+ROOM_HEIGHT/2),
    r: random(359),
  };

  return newSaw;
}

function drawSaws() {
  for (let saw of shared.discs) {
    circle(saw.x, saw.y, 50);
  }
}

/// Host only
function countdownToSaw() {
  shared.discCountdown -= 0.1;

  if (shared.discCountdown <= 0) {
    shared.discCountdownReset -= 0.1;
    shared.discCountdown = shared.discCountdownReset;

    shared.discs.push(createSaw());
  }
}

// Window settings
function doubleClicked() {
  fullscreen(!fullscreen());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}