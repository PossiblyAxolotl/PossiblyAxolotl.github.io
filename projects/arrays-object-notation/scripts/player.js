const MOVE_SPEED = 2;
const PLAYER_SIZE = 10;

// Player drawing
function drawPlayers() {
  for (let p of players) {
    stroke(p.colour);
    // solid box
    if (p.alive) {
      rect(width/2 + p.pos.x - PLAYER_SIZE/2, height/2 + p.pos.y - PLAYER_SIZE/2, PLAYER_SIZE, PLAYER_SIZE);
    } 
    // wobbly box
    else {
      wobbleRect(width/2 + p.pos.x - PLAYER_SIZE/2, height/2 + p.pos.y - PLAYER_SIZE/2, PLAYER_SIZE, PLAYER_SIZE, 5);
    }
  }
}

function areAllPlayersDead() {
  let allDead = true;
  for (let p of players) {
    if (p.alive) {
      allDead = false;
      break; // only needs one to be alive
    }
  }

  return allDead;
}

// Player movement
function processPlayer() {
  if (player.alive) {
    let i = input();

    // smoother movement
    player.pos.dx = lerp(player.pos.dx, i.x * MOVE_SPEED, 0.2);
    player.pos.dy = lerp(player.pos.dy, i.y * MOVE_SPEED, 0.2);
    
    player.pos.x += player.pos.dx;
    player.pos.y += player.pos.dy;
  
    clampPlayerPosition();
  }
}

function killPlayer(p) {
  soundDeath.play();
  
  p.alive = false;
  p.colour[3] = 150; // alpha
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
