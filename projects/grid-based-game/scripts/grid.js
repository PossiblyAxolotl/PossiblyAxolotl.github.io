let lowerGrid; // immovable elements like walls and decoration
let upperGrid; // moving things like enemies, items, and player (entities)

function createBlankGrids() {
  lowerGrid = [];
  upperGrid = [];

  for (let y = 0; y < roomHeight; y++) {
    let row = Array(roomWidth).fill(TILE_BLANK);

    lowerGrid.push(structuredClone(row)); // different reference
    upperGrid.push(row);
  }
}

function drawGrids() {
  for (let y = 0; y < roomHeight; y++) {
    for (let x = 0; x < roomWidth; x++) {
      // get both tiles in the same location
      let lowerTile = lowerGrid[y][x];
      let upperTile = upperGrid[y][x];

      // draw backing grid
      fill((x + y) % 2 === 0 ? "white" : "gray");
      square(x*tileSize + xMapOffset, y*tileSize + yMapOffset, tileSize);

      // draw lowerTile
      if (lowerTile !== TILE_BLANK) {
        fill(tileSprites[lowerTile]);
        square(x*tileSize + xMapOffset, y*tileSize + yMapOffset, tileSize);
      }

      // draw upperTile
      if (upperTile !== TILE_BLANK) {
        fill(tileSprites[upperTile]);
        square(x*tileSize + xMapOffset, y*tileSize + yMapOffset, tileSize);
      }
    }
  }
}

function populateLowerGrid() {
  for (let row = 0; row < roomHeight; row++) {
    for (let tile = 0; tile < roomWidth; tile++) {
      let currentTile = level[row][tile];

      if (lowerTiles.includes(currentTile)) { // only add to grid if it's a lowergrid tile
        lowerGrid[row][tile] = currentTile;
      }
    }
  }
}

function populateUpperGrid() {
  for (let row = 0; row < roomHeight; row++) {
    for (let tile = 0; tile < roomWidth; tile++) {
      let currentTile = level[row][tile];
      
      if (upperTiles.includes(currentTile)) { // only add to grid if it's an uppergrid tile
        upperGrid[row][tile] = currentTile;

        if (currentTile === "@") { // add player info
          player.x = Number(tile);
          player.y = Number(row);
        }
      }
    }
  }
}

function mget(x, y) { // named after PICO-8 mget function https://pico-8.fandom.com/wiki/Mget
  return {lower: lowerGrid[y][x], upper: upperGrid[y][x]};
}

function mset(x, y, t) {
  upperGrid[y][x] = t;
}

function isWithinBounds(x, y) {
  return !(x < 0 || x >= roomWidth || y < 0 || y >= roomHeight);
}

function moveTile(x, y, dx, dy) { // upper grid can be moved only, lower one is static
  // immediately check if within bounds
  if (!isWithinBounds(x+dx, y+dy)) {
    return false;
  }

  let tileToMove = mget(x, y).upper;

  let moveTo = mget(x + dx, y + dy);

  if (moveTo.lower !== TILE_WALL && moveTo.upper !== TILE_BLOCK) {
    mset(x, y, TILE_BLANK);
    mset(x + dx, y + dy, tileToMove);

    if (moveTo.lower === TILE_ICE) {
      setTimeout(function() { moveTile(x + dx, y + dy, dx, dy) }, 100);
    }

    return true;
  }

  return false;
}

// gameplay tile checks
function checkIfTileOver(x, y, lower, upper) {
  // check if the lower and upper tile match at the specified x and y
  let tile = mget(x, y);

  return tile.lower === lower && tile.upper === upper;
}

function checkIfAllTilesOver(lower, upper) {
  // check each tile of a grid with the prev. func.
  for (let y = 0; y < roomHeight; y++) {
    for (let x = 0; x < roomWidth; x++) {
      // if not all match
      if (!checkIfTileOver(x, y, lower, upper) && mget(x, y).lower === lower) {
        return false;
      }
    }
  }

  // all match, no early return
  return true;
}

function allChecks() {
  // check if player is above the exit and blocks are above the targets
  return checkIfAllTilesOver(TILE_EXIT, TILE_PLAYER) && checkIfAllTilesOver(TILE_TARGET, TILE_BLOCK);
}