function wobblePoly(points, area) {
  beginShape();

  for (let point of points) {
    vertex(point.x + random(-area, area), point.y + random(-area, area));
  }

  endShape();
}

function wobbleRect(x, y, w, h, area) {
  let points = [
    {x,y},
    {x: x+w,y},
    {x: x+w, y: y+h},
    {x, y: y+h},
    {x,y}
  ];

  wobblePoly(points, area);
}