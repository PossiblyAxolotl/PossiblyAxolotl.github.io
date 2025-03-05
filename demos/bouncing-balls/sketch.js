// Bouncing Ball Object Demo

let ballArray = new Array();

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();

  fill("red");
}

function draw() {
  background(220);

  for (let ball of ballArray) {
    // move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // teleport around screen
    if (ball.x > width + ball.radius) {ball.x -= width + ball.radius*2}
    else if (ball.x < -ball.radius) {ball.x += width + ball.radius*2}

    if (ball.y > height + ball.radius) {ball.y -= height + ball.radius*2}
    else if (ball.y < -ball.radius) {ball.y += height + ball.radius*2}

    // draw ball
    circle(ball.x, ball.y, ball.radius*2);
  }
}

function mousePressed() {
  spawnBall();
}

function spawnBall() {
  let newBall = {
    x : random(width),
    y : random(height),
    dx: random(-5,5),
    dy: random(-5,5),

    radius: random(15, 40),
  };

  ballArray.push(newBall);
}