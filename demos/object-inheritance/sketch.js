// OOP Inheritance Demo

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 10; i++) {
    let colour = color(random(255), random(255), random(255));
    let x = random(width);
    let y = random(height);

    let newShape;
    let choice = random(200);
    if (choice < 50) {
      newShape = new Shape(x, y, colour);
    } 
    else if (choice < 100) {
      newShape = new Square(x, y, random(40, 100), colour);
    }
    else if (choice < 150) {
      newShape = new MovingCircle(x, y, random(20, 50), colour, random(2, 10));
    }
    else {
      newShape = new Circle(x, y, random(20, 50), colour);
    }
    shapes.push(newShape);
  }
}

function draw() {
  background(220);
  for (let shape of shapes) {
    shape.display();
  }
}

class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 30, 60);
  }
}

class Circle extends Shape {
  constructor(x, y, radius, color) {
    super(x, y, color);

    this.radius = radius;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }
}

class Square extends Shape {
  constructor(x, y, size, color) {
    super(x, y, color);
    this.size = size;
  }

  display() {
    noStroke();
    fill(this.color);
    square(this.x, this.y, this.size);
  }
}

class MovingCircle extends Circle {
  constructor(x, y, radius, color, speed) {
    super(x, y, radius, color);
    this.speed = speed;
  }

  update() {
    this.x += this.speed;

    if (this.x > width + this.radius) {
      this.x = -this.radius;
    }
  }

  display() {
    this.update();
    super.display();
  }
}