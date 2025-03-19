const WOBBLE_TIME = 3; // time after death to show wobbly
const SAW_SIDES = 7;
const SAW_COUNTDOWN_RESET = 5;

// Sawblades
function createSaw() {
  let radius = random(20, 50);
  let angle = Math.round(random(24)) * 15;
  let speed = random(1, 3);

  let newSaw = {
    x: random(-ROOM_WIDTH/2 + radius, ROOM_WIDTH/2 - radius),
    y: random(-ROOM_HEIGHT/2 + radius, ROOM_HEIGHT/2 - radius),
    dx: Math.sin(deg2rad(angle)) * speed,
    dy: -Math.cos(deg2rad(angle)) * speed,

    radius,
    rotDir: random(0, 1) > 0.5 ? -1 : 1,

    alpha: 100,
    
    lifespan: 8,
  };

  return newSaw;
}

function deleteSaws() {
  shared.discs = [];
}

function drawSaws() {
  for (let saw of shared.discs) {
    stroke(255,255,255,saw.alpha);

    // if about to die
    if (saw.lifespan <= 0) {
      let points = [];

      for (let i = 0; i < SAW_SIDES+1; i++) {
        let wid = 360 / SAW_SIDES;
        points.push({
          x: saw.x + width/2  + Math.sin(deg2rad(wid*i+millis()/10)) * saw.radius, 
          y: saw.y + height/2 - Math.cos(deg2rad(wid*i+millis()/10)) * saw.radius
        });
      } 
  
      wobblePoly(points, -saw.lifespan * 3);
    } 
    // not about to die
    else {
      beginShape();

      for (let i = 0; i < SAW_SIDES+1; i++) {
        let wid = 360 / SAW_SIDES;
        vertex(
          saw.x + width/2  + Math.sin(deg2rad(wid*i+millis()/10*saw.rotDir)) * saw.radius, 
          saw.y + height/2 - Math.cos(deg2rad(wid*i+millis()/10*saw.rotDir)) * saw.radius
        );
      }
  
      endShape();
    }
  }
}

function processSaws() {
  for (let i = shared.discs.length - 1; i >= 0; i--) {
    let saw = shared.discs[i];

    // gradually appear
    if (saw.alpha < 255) {
      saw.alpha += 2.5;
    } else {
      saw.lifespan -= deltaTime / 1000;
    }

    // bouncing
    if (Math.abs(saw.x) + saw.radius >= ROOM_WIDTH/2 + ROOM_PADDING/2) {
      saw.dx *= -1;
      saw.x = ROOM_WIDTH / 2 * Math.sign(saw.x) + (saw.radius - ROOM_PADDING/2) * -Math.sign(saw.x);
    }

    if (Math.abs(saw.y) + saw.radius >= ROOM_HEIGHT/2 + ROOM_PADDING/2) {
      saw.dy *= -1;
      saw.y = ROOM_HEIGHT / 2 * Math.sign(saw.y) + (saw.radius-ROOM_PADDING/2) * -Math.sign(saw.y);
    }

    saw.x += saw.dx;
    saw.y += saw.dy;

    // despawning
    if (saw.lifespan <= -WOBBLE_TIME) {
      shared.discs.splice(i, 1);
    }
  }
}

function collideWithSaws(p) {
  for (let saw of shared.discs) {
    // only if fully visible
    if (saw.alpha >= 255) {
      if (dist(p.pos.x, p.pos.y, saw.x, saw.y) < saw.radius) {
        p.alive = false;
        p.colour[3] = 150; // alpha
      }
    }
  }
}

/// Host only
function countdownToSaw() {
  // count down to next disc
  if (shared.discs.length < 10) {
    shared.discCountdown -= 0.1;
  }

  // spawn new disc
  if (shared.discCountdown <= 0) {
    shared.discCountdown = SAW_COUNTDOWN_RESET;

    shared.discs.push(createSaw());
  }
}
