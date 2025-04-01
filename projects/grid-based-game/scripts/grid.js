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
          player.x = tile;
          player.y = row;
        }
      }
    }
  }
}

function checkGrid(x, y) {
  return {lower: lowerGrid[y][x], upper: upperGrid[y][x]};
}