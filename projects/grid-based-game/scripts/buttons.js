const LOWER_BUTTON_OFFSET_X = 70;
const LOWER_BUTTON_OFFSET_Y = 42;
const HALF_BUTTON_WIDTH     = 64;

let buttonReset, buttonBack, buttonFullscreen, buttonCustom;

function setupButtons() {
  buttonReset = createButton("Reset", width/2 - HALF_BUTTON_WIDTH - LOWER_BUTTON_OFFSET_X, height - LOWER_BUTTON_OFFSET_Y);
  buttonReset.visible = false;
  buttonReset.enabled = false;

  buttonBack  = createButton("Undo", width/2 - HALF_BUTTON_WIDTH + LOWER_BUTTON_OFFSET_X, height - LOWER_BUTTON_OFFSET_Y);
  buttonBack.visible = false;
  buttonBack.enabled = false;

  buttonFullscreen = createButton("Fullscreen", 3, 3);
  buttonCustom = createButton("Custom", 3, 40);
}

function processButtons() {
  // fullscreen button
  if (buttonFullscreen.isPressed) {
    fullscreen(!fullscreen());
  }
  
  // custom level docs
  if (buttonCustom.isPressed) {
    window.open("./doc");
  }

  // reset level button
  if (buttonReset.isPressed) {
    createLevel();
    previousGrids = [];
  }

  // undo button
  if (buttonBack.isPressed && previousGrids.length > 0) {
    // undo grid
    let previousGrid = previousGrids.pop();
    upperGrid = previousGrid.upper;
    lowerGrid = previousGrid.lower;

    // move player back
    player = previousGrid.player;
  }
}

// visibility
function showGameButtons() {
  buttonReset.visible = true;
  buttonReset.enabled = true;

  buttonBack.visible = true;
  buttonBack.enabled = true;
}

function hideGameButtons() {
  buttonReset.visible = false;
  buttonReset.enabled = false;

  buttonBack.visible = false;
  buttonBack.enabled = false;
}

// move buttons when window is resized
function moveButtons() {
  buttonReset.x = width/2 - HALF_BUTTON_WIDTH - LOWER_BUTTON_OFFSET_X;
  buttonReset.y = height - LOWER_BUTTON_OFFSET_Y;

  buttonBack.x = width/2 - HALF_BUTTON_WIDTH + LOWER_BUTTON_OFFSET_X;
  buttonBack.y = height - LOWER_BUTTON_OFFSET_Y;
}