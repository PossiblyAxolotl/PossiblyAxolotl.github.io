let nextLevel;

function loadLevelFromData(data) {
  level = data.replace("\r", "").split("\n");
  initialLevelSetup();
  createLevel();
}

function loadLevelFromStrings(data) {
  level = data;
  initialLevelSetup();
  createLevel();
}

// only run the first time; cuts off last line of file and sets it as level title
function initialLevelSetup() {
  let levelMeta = level.pop();

  // if level leads into another
  levelMeta = levelMeta.split(" -> ");

  nextLevel = levelMeta[1];
  levelName = levelMeta[0];

  // activate player & ui
  playerCanMove = true;
  showGameButtons();
}

function createLevel() {
  roomHeight = level.length;
  roomWidth = level[0].length;

  createBlankGrids();

  populateLowerGrid();
  populateUpperGrid();
}

function checkForWin() {
  if (allChecks()) {
    playerCanMove = false;
    hideGameButtons();

    setTimeout(levelFinished, 400);
  }
}

function levelFinished() {
  // if the level leads into another (levelname -> level2path)
  if (nextLevel) {
    loadStrings(nextLevel, loadLevelFromStrings);
  }
  // no next level provided
  else {
    gotoTitle();
  }
}