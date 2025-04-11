// Walker OOP Demo

class Walker {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.speed = 10;
    this.radius = 5;
  }

  move() {
    let choice = random(100);

    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }

  display() {
    fill(this.colour);
    circle(this.x, this.y, this.radius * 2);
  }
}

let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  spawnWalker(width/2, height/2);
}

function draw() {
  for (let walker of walkers) {
    walker.move();
    walker.display();
  }
}

function mousePressed() {
  spawnWalker(mouseX, mouseY);
}

function spawnWalker(x, y) {
  //                R            G            B
  let colour = [random(255), random(255), random(255)];

  let w = new Walker(x, y, colour);

  walkers.push(w);
}