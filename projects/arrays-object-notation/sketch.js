// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// https://p5party.org/

const roomWidth = 700;
const roomHeight = 400;

let shared;
let player;
let players;

function preload() {
  partyConnect(
    "wss://demoserver.p5party.org", 
    "disc-room"
  );

  shared = partyLoadShared("global");
  player = partyLoadMyShared({ x: 200, y: 200 });
  players = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (partyIsHost()) {
    partySetShared(shared, {discs: []});
  }
}

function draw() {
  background(0);
  fill("white");
  rect(width/2 - roomWidth/2, height/2 - roomHeight/2, roomWidth, roomHeight);
}

// Window settings
function doubleClicked() {
  fullscreen(!fullscreen());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}