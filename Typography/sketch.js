// initialize the variables
let font, points;

// preload the font
function preload() {
  font = loadFont("TerminaTest-Black.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 190, 255);
  // set fill to black with transparency of 100
  fill(0, 100);
  // remove stroke
  noStroke();
  // use textToPoints which traces the text turning it into points with x position width/15 and y half the canvas and has a size of width/25
  // samplefactor
  points = font.textToPoints(
    "Welcome to Bathspa University",
    width/15,
    height / 2,
    width / 25,
    { sampleFactor: 0.5 }
  );
  // for loop that checks the returned length for points
  for (let i = 0; i < points.length; i++) {
    // variable stores the corresponding index from the array
    var p = points[i];
    // the positions used is based on the points given and I used randomization for its width and height to simulate the text like rain  
    ellipse(p.x, p.y, random(2), random(2, 10));
  }
}
