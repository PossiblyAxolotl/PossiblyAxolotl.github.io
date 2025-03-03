function startTitle() {
    camera.x = 0;
    camera.y = 0;
}

function titleDraw() {
    lavaHeight = height - 300;

    drawLava();
    
    fill("white");

    // text
    textSize(64);
    text("Scary Lava Game ahh lava rising run away", 0, 200, width);
    
    textSize(32);
    text("Arrow keys/wasd to move, space/w/up to jump.\nHold jump to jump higher.\nDouble click to toggle fullscreen.", 0, height-120, width)

    // button
    let bWidth = 200;
    let bHeight = 70;

    let top    = height / 2 - bHeight / 2;
    let left   = width  / 2 - bWidth  / 2;
    let bottom = height / 2 + bHeight / 2;
    let right  = width  / 2 + bWidth  / 2;

    rect(left, top, bWidth, bHeight);
    text("Start", width/2, height/2);

    // horizontally inline
    if (mouseX > left && mouseX < right) {
        // vertically inline
        if (mouseY > top && mouseY < bottom) {
            if (mouseIsPressed) {
                loadMap("./levels/1.json");
            }
        }
    }
}