let stars = [];

const triangleSize = 24;
const lavaSplits = 16;

// lava
function drawLava() {
  fill("#fd724e");
  beginShape();
  
  lavaBetweenSize = width / lavaSplits;

  for (let i = 0; i<lavaSplits+1; i++) {
    vertex(i * lavaBetweenSize, lavaHeight-camera.y + 8*Math.sin((millis() + i*120 + camera.x) / 160));
  }

  vertex(width, height);
  vertex(0, height);

  endShape();

  fill("#a02f40");

  beginShape();

  for (let i = 0; i<lavaSplits+1; i++) {
    vertex(i * lavaBetweenSize, lavaHeight+50-camera.y + 8*Math.cos((millis() + i*120 + camera.x) / 160));
  }

  vertex(width, height);
  vertex(0, height);

  endShape();
}

// stars
function makeStars() {
  for (let i = 0; i<64; i++) {
    stars.push({
      x: Math.random() * windowWidth,
      y: Math.random() * windowHeight,
      diameter: Math.random() * 4 + 2,
      dir: Math.random() * 359
    });
  }
}

function drawBackdrop() {
  noStroke();
  fill("#261b2e");

  for (let star of stars) {
    star.x += Math.sin(star.dir);
    star.y -= Math.cos(star.dir);

    if (star.x < camera.x) { 
      star.x += width;
    } 
    else if (star.x > camera.x + width) {
      star.x -= width;
    }

    if (star.y < camera.y) { 
      star.y += height;
    } 
    else if (star.y > camera.y + height) {
      star.y -= height;
    }

    circle(star.x - camera.x, star.y - camera.y, star.diameter);
  }
}
function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}
// exit
function spinTriangle(x, y) {
  fill("#0ce6f2");
  beginShape();

  x = x - camera.x + triangleSize/2;
  y = y - camera.y + triangleSize/2;

  let x1 = x - Math.sin(deg2rad(millis() / 10 + 120)) * triangleSize;
  let x2 = x + Math.sin(deg2rad(millis() / 10 + 240)) * triangleSize;
  let x3 = x + Math.sin(deg2rad(millis() / 10 + 360)) * triangleSize;
  let y1 = y + Math.cos(deg2rad(millis() / 10 + 120)) * triangleSize;
  let y2 = y + Math.cos(deg2rad(millis() / 10 + 240)) * triangleSize;
  let y3 = y + Math.cos(deg2rad(millis() / 10 + 360)) * triangleSize;

  triangle(x1,y1,x2,y2,x3,y3);

  endShape();
}