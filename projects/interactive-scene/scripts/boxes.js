let colliders = [];
let exit      = {};

// generic box functions
function resetBoxes() {
  colliders = [];
  exit      = {};
}

function updateBoxes() {
  checkExits();
}

// draw all boxes (ground, exit)
function drawBoxes() {
  boxListRect(colliders);
  //boxListRect(exits);
  spinTriangle(exit.x, exit.y);
}

// create single box
function boxRect(genericBox) {
  rect(genericBox.x - camera.x, genericBox.y - camera.y, genericBox.w, genericBox.h);
}

// create all boxes in list
function boxListRect(list) {
  for (let box of list) {
    fill(box.col);
    boxRect(box);
  }
}

// Colliders
function addCollider(x,y,w,h,col) {
  colliders.push ({
    x,y,w,h,col
  });
}

function getColliders() {
  return colliders;
}

function collide1D(position, velocity, barrier, end = null) {
  // before -> after
  if (velocity > 0 && position <= barrier) {
    return position + velocity > barrier ? barrier - position : velocity;
  } 
  // after -> before
  else if (end !== null && velocity < 0 && position >= end) {
    return position + velocity < end ? end - position : velocity; 
  }
  
  return velocity;
}

// Exits
function addExit(x,y,w,h,leadTo) { // could be setExit now; changed to only one exit
  exit = {
    x,y,w,h,leadTo,
    "col":"#0ce6f2"
  };
}

function checkExits() {
  // horizontally inline
  if (player.x + player.w > exit.x && player.x < exit.x + exit.w) {
    // vertically inline
    if (player.y+ player.h > exit.y && player.y < exit.y + exit.h) {
      loadMap(exit.leadTo);
    }
  }
}