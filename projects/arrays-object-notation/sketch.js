// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - p5party online multiplayer

const roomWidth = 500;
const roomHeight = 500;

let shared;
let player;
let players;

function preload() {
  partyConnect(
    "wss://demoserver.p5party.org", 
    "disc-room"
  );

  shared = partyLoadShared("global");
  player = partyLoadMyShared({ pos: {x: 200, y: 20}, alive: true });
  players = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  stroke("white");
  noFill();
  strokeWeight(4);
  strokeJoin(ROUND);

  if (partyIsHost()) {
    partySetShared(shared, { discs: [], inMatch: false });
  }
}

function draw() {
  background(0);
  rect(width/2 - roomWidth/2, height/2 - roomHeight/2, roomWidth, roomHeight);

  player.pos.x += horizontalButtons();
  player.pos.y += verticalButtons();

  for (let p of players) {
    rect(width/2 + p.pos.x, height/2 + p.pos.y, 10, 10);
  }
}

// Window settings
function doubleClicked() {
  fullscreen(!fullscreen());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}