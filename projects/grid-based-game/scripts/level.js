function loadLevelFromData(data) {
  level = data.replace("\r", "").split("\n");
  initialLevelSetup();
  createLevel();
}

// only run the first time; cuts off last line of file and sets it as level title
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