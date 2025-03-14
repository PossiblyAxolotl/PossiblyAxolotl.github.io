const MOVE_SPEED = 2;

// Player drawing
function drawPlayers() {
  let o = getOffset();
  // Player will be an image so anchor will be in the center
  for (let p of players) {
    stroke(p.colour);
    rect(o.x + p.pos.x - 5, o.y + p.pos.y - 5, 10, 10);
  }
}

// Player movement
function processPlayer() {
  let i = input();

  player.pos.dx = lerp(player.pos.dx, i.x * MOVE_SPEED, 0.2);
  player.pos.dy = lerp(player.pos.dy, i.y * MOVE_SPEED, 0.2);
  
  player.pos.x += player.pos.dx;
  player.pos.y += player.pos.dy;

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
