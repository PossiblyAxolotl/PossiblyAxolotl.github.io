let player = {
  x  : 0,
  y  : 0,
  vy : 0,
  vx : 0,
  w  : 20,
  h  : 20,
  
  canJump : false
};

function changePlayerVelocity() {
  // gravity
  player.vy += deltaTime * 
    (buttonJump() && player.vy < 0) ? 0.175 : 0.35; // hold to jump higher
  
  // Horizontal movement
  let lerpAmnt = player.canJump ? 0.2 : 0.05;
  player.vx = lerp(player.vx, horizontalButtons()*5, lerpAmnt);
  
  // jumping
  if (buttonJump() && player.canJump) {
    player.vy = -6;
    player.canJump = false;
  }
}

function movePlayer() {
  player.x += player.vx;
  player.y += player.vy;
}

/*
Doesn't work diagonally as it checks Y and then X, but not X + Y
can potentially avoid by having all platforms as semi-solid as to not
bother rewriting
*/
function collidePlayer() {
  for (let collider of getColliders()) {
    // horizontally inline
    if (player.x + player.w > collider.x && player.x < collider.x + collider.w) {
      // vertical collision
      let prevVy = player.vy;
      //player.vy = collide1D(player.y + player.h, player.vy, collider.y, collider.y + collider.h + player.h);
      player.vy = collide1D(player.y + player.h, player.vy, collider.y);
      if (player.vy === 0 && prevVy > 0) {
        player.canJump = true;
      }
    }
    
    /*/ vertically inline
    if (player.y + player.h > collider.y && player.y < collider.y + collider.h) {
      // horizontal collision
      player.vx = collide1D(player.x + player.w, player.vx, collider.x, collider.x + collider.w + player.w);
    }*/
  }
}

function drawPlayer() {
  fill("#ff0546");
  rect(player.x - camera.x, player.y - camera.y, player.w, player.h);
}