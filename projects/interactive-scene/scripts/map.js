let currentData;

function createMap(data, ignoreCamera = false) {
  currentData = data; // save data for reloading level

  // player data
  player.x = data.player.x;
  player.y = data.player.y;

  player.vx = 0;
  player.vy = 0;

  player.canJump = false;

  lavaHeight = 500; // reset lava to bottom
  
  // if you reset the level let the camera gradually move up
  if (!ignoreCamera) {
    camera.y = player.y - height / 2;
  }
  
  // clear boxes and create new ones
  resetBoxes();
  for (let platform of data.platforms) {
    addCollider(platform.x,platform.y,platform.w,platform.h,platform.col);
  }
  
  let exit = data.exit;
  addExit(exit.x,exit.y,exit.w,exit.h,exit.leadTo);
}

function loadMap(path) {
  loadJSON(path, createMap);
}

function reloadMap() {
  createMap(currentData, true);
}