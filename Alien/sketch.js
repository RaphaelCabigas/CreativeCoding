function setup() {
  createCanvas(500, 500);
}

function draw() {
  background("#E1F0DA");
  noStroke(); // no strokes for all shapes
  translate(width/2, height/2); // to center the shapes
  fill("#99BC85");
  // ears & feet
  ellipse(90, -90, 25, 25);
  ellipse(-90, -90, 25, 25);
  ellipse(-50, 200, 35, 25);
  ellipse(50, 200, 35, 25);
  // body
  ellipse(0, 0, 200, 200); 

  // particles idk
  fill("#445D48");
  rotate(PI/4);
  rect(40, 0, 10, 10);
  rect(70, 0, 10, 10);
  rotate(PI/4);
  rect(60, 0, 10, 10);
  rotate(PI/4);
  rect(80, 0, 10, 10);
  rotate(PI/4);
  rect(45, 0, 10, 10);
  rotate(PI/4);
  rect(60, 0, 10, 10);
  rotate(PI/4);
  rect(34, 0, 10, 10);
  rotate(PI/4);
  rect(67, 0, 10, 10);
  rotate(PI/4);
  rect(55, 0, 10, 10);
  
  // eyes
  fill("#001524");
  ellipse(40, -20, 25, 45);
  ellipse(-40, -20, 25, 45);
  
  rect(-100, 60, 200, 120, 50);
  push();
  fill(100);
  rect(-200, 130, 400, 200, 500);
  pop();
  // hair
  push();
  translate(-width/4,-20-height/2);
  beginShape();
  fill(0);
  vertex(200,200);
  bezierVertex(10,80,40,300, 200, 200);
  bezierVertex(200,100,100,100, 200, 200);
  endShape();
  pop();
  // headlights for the ufo
  fill("#C3FF93");
  beginShape();
  vertex(200,200);
  bezierVertex(20,80,40,300, 200, 200);
  endShape();
}