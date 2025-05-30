// Sierpinski Triangle Demo
// Visual recursion

let initialTriangle = [
  {x: 625, y: 50},
  {x: 50, y: 700},
  {x: 1200, y: 700},
];

let colours = ["blue","cyan","red","green","purple","coral","yellow","orange","gray"];

let triangleDepth = 0;
let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(0, 8, 0, 1);
  slider.position(0,0);
}

function draw() {
  if (triangleDepth !== slider.value) {
    background(220);
    sierpinski(initialTriangle, triangleDepth);
  }
  triangleDepth = slider.value();
}

function sierpinski(points, depth) {
  fill(colours[depth]);

  let pt0 = points[0];
  let pt1 = points[1];
  let pt2 = points[2];
  triangle(pt0.x, pt0.y, pt1.x, pt1.y, pt2.x, pt2.y);

  // pattern
  if (depth > 0) {
    // bottom left
    sierpinski([
      midpoint(pt0, pt1),
      points[1],
      midpoint(pt1, pt2),
    ], depth-1);

    // top
    sierpinski([
      midpoint(pt0, pt1),
      points[0],
      midpoint(pt0, pt2),
    ], depth-1);

    // bottom right
    sierpinski([
      midpoint(pt1, pt2),
      points[2],
      midpoint(pt0, pt2),
    ], depth-1);
  }
}

function midpoint(point1, point2) {
  return {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  };
}