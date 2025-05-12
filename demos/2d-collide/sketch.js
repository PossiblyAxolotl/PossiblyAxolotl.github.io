let hit = false;

function setup() {
  createCanvas(400, 400);
  collideDebug(true);
}

function draw() {
  background(255);
  line(200, 300, 100, 150);
  circle(mouseX, mouseY, 50);

  hit = collideLineCircle(200, 300, 100, 150, mouseX, mouseY, 50);

  stroke(hit ? 'red' : 0);
  print('colliding?', hit);
}