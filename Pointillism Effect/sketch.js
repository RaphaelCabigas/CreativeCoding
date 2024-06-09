// initialize the variables
var img, x, y;

// preload the images
function preload() {
img = loadImage("forest.jpg");
}

function setup() {
createCanvas (windowWidth, windowHeight);
background(100);
// resize the image based on the canvas' width and height
img.resize(width,height);
// adjust framerate so that the pointillism effect is faster
frameRate(1200);
}

function draw() {
// get a random number based on width and height
x = random(width);
y = random(height);
// get a random position in the image and store it in the array
var c = img.get(x, y);
// fill the shape based on the array's index and make it transparent by 100
fill(c[0], c[1], c[2], 100);
// remove stroke
noStroke();
// display rect based on a random position with 20 width, 40 height, and round the sides by 20
rect(x, y, 20, 40, 20);
}