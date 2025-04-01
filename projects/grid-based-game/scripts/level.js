function loadLevelFromData(data) {
  level = data.replace("\r", "").split("\n");
  initialLevelSetup();
  createLevel();
}

function initialLevelSetup() {
  levelName = level.pop();
}

function createLevel() {
  roomHeight = level.length;
  roomWidth = level[0].length;

  createBlankGrids();

  populateLowerGrid();
  populateUpperGrid();
}