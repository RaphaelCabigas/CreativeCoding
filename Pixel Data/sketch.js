// initialize the variable
let img, x, y;
// preload the img to be used
function preload() {
  img = loadImage("dog-1.jpg");
}

function setup() {
  createCanvas(380, 500);
}

function draw() {
  background(0);
  // store the mouseX and mouseY position to the corresponding variables
  x = mouseX;
  y = mouseY;
  // initialize the image and position it in the middle of the canvas and then change the size to width/4 and height/4
  image(img, 0, 0, img.width / 4, img.height / 4);
  // get the corresponding color pixel data based on the mouse's position and store it in the variable
  let c = get(x, y);
  // fill the shape with the data that we got from the variable
  fill(c);
  // remove the stroke for the shape
  noStroke();
  // rectangle follows the mouse's position and then round the border by 30
  rect(x, y, 80, 80, 30);
}
