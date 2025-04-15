// Connected Nodes OOP Demo

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let pt = new MovingPoint(width/2, height/2);
  nodes.push(pt);
}

function draw() {
  background(255);

  for (let node of nodes) {
    node.update();
    node.connectTo(nodes);
  }

  for (let node of nodes) {
    node.display();
  }
}

function mousePressed() {
  let pt = new MovingPoint(mouseX, mouseY);
  nodes.push(pt);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.color = color(random(255), random(255), random(255));
    this.reach = 200;
    this.maxRadius = 45;
    this.minRadius = 15;
  }

  display() {
    noStroke();
    this.color.setAlpha(255);
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.move();
    this.wrap();
    this.mouseReact();
  }

  connectTo(nodesArray) {
    for (let node of nodesArray) {
      if (node !== this) {
        let distance = dist(this.x, this.y, node.x, node.y);
        if (distance < this.reach) {
          this.color.setAlpha(map(distance, 0, this.reach, 255, 0));
          stroke(this.color);
          line(this.x, this.y, node.x, node.y);
        }
      }
    }
  }

  mouseReact() {
    let distance = dist(this.x, this.y, mouseX, mouseY);

    if (distance < this.reach) {
      this.radius = map(distance, 0, this.reach, this.maxRadius, this.minRadius);
    } 
    else {
      this.radius = this.minRadius;
    }
  }

  move() {
    // Perlin noise movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // Scale to movement speed
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    // Move point
    this.x += dx;
    this.y += dy;

    // Move on time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrap() {
    // horizontal wrap
    if (this.x < -this.radius) {
      this.x = width+this.radius;
    }
    else if (this.x > width + this.radius) {
      this.x = -this.radius;
    }

    // vertical wrap
    if (this.y < -this.radius) {
      this.y = height+this.radius;
    }
    else if (this.y > height + this.radius) {
      this.y = -this.radius;
    }
  }
}