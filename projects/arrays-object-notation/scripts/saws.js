const wobbleTime = 3; // time after death to show wobbly

// Sawblades
function createSaw() {
  let radius = random(20, 50);
  let angle = Math.round(random(24)) * 15;

  let newSaw = {
    x: random(-ROOM_WIDTH/2 + radius, ROOM_WIDTH/2 - radius),
    y: random(-ROOM_HEIGHT/2 + radius, ROOM_HEIGHT/2 - radius),
    dx: Math.sin(deg2rad(angle)),
    dy: -Math.cos(deg2rad(angle)),
    r: radius,
    rotDir: random(0, 1) > 0.5 ? -1 : 1,
    
    lifespan: 8,
    spawnedTime: millis()/1000
  };

  return newSaw;
}

function drawSaws() {
  let o = getOffset();

  //stroke(255,255*Math.cos(millis()/100),255*Math.sin(millis()/100));
  stroke("white");

  for (let saw of shared.discs) {
    //circle(saw.x + o.x, saw.y + o.y, saw.r*2);

    // if about to die
    if (saw.lifespan + saw.spawnedTime < millis()/1000) {
      let points = [];

      for (let i = 0; i < 9; i++) {
        let wid = 360 / 8;
        points.push({x: saw.x + o.x + Math.sin(deg2rad(wid*i+millis()/10)) * saw.r, y: saw.y + o.y - Math.cos(deg2rad(wid*i+millis()/10)) * saw.r});
        // create saw shape, doubles point count
        //vertex(saw.x + o.x + Math.sin(deg2rad(wid*i+millis()/10)) * saw.r*0.8, saw.y + o.y - Math.cos(deg2rad(wid*i+millis()/10)) * saw.r*0.8);
      } 
  
      wobblePoly(points, (millis() / 1000 - (saw.lifespan + saw.spawnedTime)) * 4);
    } 
    // not about to die
    else {
      beginShape();

      for (let i = 0; i < 9; i++) {
        let wid = 360 / 8;
        //saw.rotDir = -(Math.sign(saw.dx) * Math.sign(saw.dy));
        vertex(saw.x + o.x + Math.sin(deg2rad(wid*i+millis()/10*saw.rotDir)) * saw.r, saw.y + o.y - Math.cos(deg2rad(wid*i+millis()/10*saw.rotDir)) * saw.r);
        // create saw shape, doubles point count
        //vertex(saw.x + o.x + Math.sin(deg2rad(wid*i+millis()/10)) * saw.r*0.8, saw.y + o.y - Math.cos(deg2rad(wid*i+millis()/10)) * saw.r*0.8);
      }
  
      endShape();
    }
    /*

    */


  }
}

function processSaws() {
  for (let i = 0; i < shared.discs.length; i++) {
    let saw = shared.discs[i];

    // bouncing
    if (Math.abs(saw.x) + saw.r >= ROOM_WIDTH/2 + ROOM_PADDING/2) {
      saw.dx *= -1;
      saw.x = ROOM_WIDTH / 2 * Math.sign(saw.x) + (saw.r - ROOM_PADDING/2) * -Math.sign(saw.x);
    }

    if (Math.abs(saw.y) + saw.r >= ROOM_HEIGHT/2 + ROOM_PADDING/2) {
      saw.dy *= -1;
      saw.y = ROOM_HEIGHT / 2 * Math.sign(saw.y) + (saw.r-ROOM_PADDING/2) * -Math.sign(saw.y);
    }

    saw.x += saw.dx;
    saw.y += saw.dy;

    // despawning
    if (saw.lifespan + saw.spawnedTime < millis()/1000 - wobbleTime) {
      shared.discs.splice(i, 1);
    }
  }
}

/// Host only
function countdownToSaw() {
  if (shared.discs.length < 10) {
    shared.discCountdown -= 0.1;
  }

  if (shared.discCountdown <= 0) {
    shared.discCountdownReset -= 0.1; // take less time to spawn next, then reset
    shared.discCountdown = shared.discCountdownReset;

    if (shared.discCountdownReset < 2) { // lower limit
      shared.discCountdownReset = 2;
    }

    shared.discs.push(createSaw());
  }
}
