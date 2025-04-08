let player = {x: 0, y: 0};
let playerCanMove = true;

function movePlayer(x, y) {
  // ensure only one input exists, arbitrarily prioritizes horizontal
  if (x !== 0) {
    y = 0;
  }

  // check if within bounds   
  if (!isWithinBounds(x+player.x, y+player.y) || !playerCanMove) {
    return false;
  }

  // save map for undo
  previousGrids.push({
    upper: structuredClone(upperGrid),
    lower: structuredClone(lowerGrid),
    player: structuredClone(player)
  });

  let result = true;

  // push blocks if a block is there
  if (mget(player.x + x, player.y + y).upper === TILE_BLOCK) {
    result = moveTile(player.x + x, player.y + y, x, y);
    //console.log(result);
  }

  // if block was pushed or nothing there
  if (result) {
    result = moveTile(player.x, player.y, x, y);
  }

  // move the player
  if (result) {
    player.x += x;
    player.y += y;
  }

  // only perform checks for level completion after all movement is done
  if (allChecks()) {
    playerCanMove = false;
    hideGameButtons();
    console.log("level done!");

    setTimeout(levelFinished, 200);
  }
}