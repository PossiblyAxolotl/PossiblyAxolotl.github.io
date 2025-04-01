let player = {x: 0, y: 0};

function movePlayer(x, y) {
  // ensure only one input exists, arbitrarily prioritizes horizontal
  if (x !== 0) {
    y = 0;
  }

  let tilesToMoveTo = checkGrid(x, y);

  // moveTile(x,y,dx,dy) moves tile if allowed, returns true or false
}