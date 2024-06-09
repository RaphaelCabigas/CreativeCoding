function setup() {
  createCanvas(windowWidth, windowHeight);
  // removes any fill color and the cursor as well
  noFill();
  noCursor();
}

function draw() {
  // background color with a transparency of 80
  background(0, 80);
  
  // make a pulse effect between 50 to 100
  // cos is used so that whenever it reaches to 100 it will revert back to its original form which is also based on how many frames have been made multiplied by 0.1
  let pulse = map(cos(frameCount * 0.1), 0, 1, 50, 100);
  // randomize color
  let c = [random(0,255), random(0,255), random(0, 255)];
  // randomize border radius
  let radius = random(20, 30);
  // stroke indexed the array's random numbers 
  stroke(c[0], c[1], c[2]);
  // positions are based on the mouse curser, and size is based on the pulse and the border is based on the radius
  rect(mouseX, mouseY, pulse, pulse, radius);
}