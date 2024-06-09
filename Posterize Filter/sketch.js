let dogImg;
// preload the image
function preload() {
  dogImg = loadImage("dog.jpg");
}

function setup() {
  createCanvas(500, 600);
}

function draw() {
  background(0);
  // we map the mouseX and mouseY from 0 and width to 2 and 20
  let xPos = map(mouseX, 0, width, 2, 20);
  let yPos = map(mouseY, 0, height, 2, 20);
  image(dogImg, 0, 0, dogImg.width / 2, dogImg.height / 2);
  // the posterize filter is affected by the mouseY position
  filter(POSTERIZE, xPos, yPos);
}
