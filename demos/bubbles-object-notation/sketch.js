// Bubble Object Notation & Arrays Demo

let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  for (let i = 0; i < 10; i++) {
    spawnBubble();
  }

  // new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);

  for (let bubble of bubbles) {
    // randomize movement
    bubble.dx = random(-5, 5);
    bubble.dy = random(-5, 5);

    // move bubble
    bubble.x += bubble.dx;
    bubble.y += bubble.dy;

    // draw bubble
    fill(bubble.colour);
    circle(bubble.x, bubble.y, bubble.radius * 2);


  }
}

function mouseClicked() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    let bubble = bubbles[i];
    if (dist(mouseX, mouseY, bubble.x, bubble.y) < bubble.radius) {
      bubbles.splice(i, 1);

      return;
    }
  }
}

function spawnBubble() {
  let newBubble = {
    x: random(width),
    y: random(height),
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(40, 80),
    colour: [random(255), random(255), random(255)]
  };

  bubbles.push(newBubble);
}