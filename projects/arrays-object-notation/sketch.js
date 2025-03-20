// Disc Room Ripoff
// PossiblyAxolotl
// March 20, 2025
//
// Extra for Experts:
// - p5party online multiplayer
// - the game does some weird funky stuff where it acts as though (0,0) is the middle of the screen if that counts
// - wobbly vector shapes, separate files
// - sfx (made with https://www.bfxr.net/)

const ROOM_WIDTH = 400;
const ROOM_HEIGHT = 400;
const ROOM_PADDING = 100;

let shared;
let player;
let players;

let font;

let timer = null;

let soundDeath;
let soundStart;
let soundBgm;

function preload() {
  soundFormats('mp3');
  soundDeath = loadSound('assets/audio/explosion');
  soundStart = loadSound('assets/audio/start');
  soundBgm   = loadSound('assets/audio/placeholder');

  font = loadFont("assets/Vector Waves.ttf");

  // p5party
  partyConnect(
    "wss://demoserver.p5party.org", 
    "disc-room"
  );

  // p5party global/shared variables
  shared  = partyLoadShared("global");
  players = partyLoadGuestShareds();
  player  = partyLoadMyShared({
    pos: {
      x: random(ROOM_WIDTH) - ROOM_WIDTH/2, 
      y: random(ROOM_HEIGHT) - ROOM_HEIGHT/2, 
      dx: 0, 
      dy: 0
    }, 
    alive: false, 
    colour: [random(255), random(255), random(255), 100]
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont(font);
  textSize(32);

  strokeWeight(2);
  strokeJoin(ROUND);

  //soundBgm.loop(true); // Also starts music, no need for .play()

  // create new globals if you're the first one in
  if (partyIsHost()) {
    partySetShared(shared, { 
      discs: [], 
      discCountdown: 5, 
    });
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

    resetIfAllDead();
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

// death / restart
function drawDeadOverlay() {
  noStroke();
  textAlign(CENTER, CENTER);

  fill("white");
  text("Spectating", width/2, height/2 - ROOM_WIDTH/2 - 26);

  fill(player.colour[0], player.colour[1], player.colour[2]);
  text("THIS IS YOUR COLOUR", width/2, height/2 + ROOM_WIDTH/2 + 26);

  fill("#777777");
  text("WASD\nIJKL\nARROWS", width/2, height/2);
}

function resetToTitle() {
  deleteSaws();
  for (let p of players) {
    // position
    p.pos.dx = 0;
    p.pos.dy = 0;

    p.pos.x = random(ROOM_WIDTH) - ROOM_WIDTH/2, 
    p.pos.y = random(ROOM_HEIGHT) - ROOM_HEIGHT/2, 

    p.colour[3] = 255; // set alpha back to max

    p.alive = true;
  }

  timer = null;

  soundStart.play();
}

// Host only; only one timer should be made
function resetIfAllDead() {
  if (!timer && areAllPlayersDead()) {
    timer = window.setTimeout(resetToTitle, 3000);
  }
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