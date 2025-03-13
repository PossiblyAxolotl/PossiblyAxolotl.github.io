// Sawblades
function createSaw() {
  let newSaw = {
    x: random(-ROOM_WIDTH/2, ROOM_WIDTH/2),
    y: random(-ROOM_HEIGHT/2, ROOM_HEIGHT/2),
    r: random(359),
    
    lifespan: 8,
    spawnedTime: millis()/1000
  };

  return newSaw;
}

function drawSaws() {
  for (let saw of shared.discs) {
    circle(saw.x, saw.y, 50);
  }
}

function processSaws() {
  for (let i = 0; i < shared.discs.length; i++) {
    let saw = shared.discs[i];

    saw.x += Math.sin(deg2rad(saw.r));
    saw.y -= Math.cos(deg2rad(saw.r));

    if (saw.lifespan + saw.spawnedTime < millis()/1000) {
      shared.discs.splice(i, 1);
    }
  }
}

/// Host only
function countdownToSaw() {
  shared.discCountdown -= 0.1;

  if (shared.discCountdown <= 0) {
    shared.discCountdownReset -= 0.1;
    shared.discCountdown = shared.discCountdownReset;

    if (shared.discCountdownReset < 2) {
      shared.discCountdownReset = 2;
    }

    shared.discs.push(createSaw());
  }
}
