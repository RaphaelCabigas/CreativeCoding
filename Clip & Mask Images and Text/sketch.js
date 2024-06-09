// initialize the variables
let sleep, sleep3;

// preload the images
function preload() {
  sleep = loadImage('sleep.jpg');
  sleep3 = loadImage('sleep3.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(40, 200, 100);

  // create graphics for the clip about 300
  clipImg = createGraphics(300, 300);
  // resize the image based on the created graphics
  sleep.resize(clipImg.width,clipImg.height);
  clipImg.noStroke();
  // position the rectangle at the center of the graphics with a size of 100
  clipImg.rect(clipImg.width/2, clipImg.height/2, 400);
  // clip the sub canvas only within the rectangle shape
  clipImg.canvas.getContext('2d').clip();
  clipImg.image(sleep, 0,0); // draw the image inside the sub canvas
  image(clipImg, 0, 0); // initialize the image inside the main canvas
  
  // create another graphics for the mask about 300
  maskImg = createGraphics(300, 300);
  // position the ellipse at the center of the graphics with a size of 100
  maskImg.ellipse(maskImg.width/2, maskImg.height/2, 100);
  sleep3.mask(maskImg); // mask the image with the created graphics
  image(sleep3, 0, 0);
  
  // create another graphics for clipping the text about 400
  clipTxt = createGraphics(400, 400);
  // set the rect to have no stroke and color white
  clipTxt.noStroke();
  clipTxt.fill(255);
  // set the rect at the center with 200 width and 100 height
  clipTxt.rect(clipTxt.width/2, clipTxt.height/2, 200, 100);
  // erase anything that is occupied by the text
  clipTxt.erase();
  // set the textsize and the text as well and x and y position to 200 and 260
  clipTxt.textSize(20);
  clipTxt.text("Cairo the Schnau-Tzu", 200, 260);
  // display the image and x position to 300 
  image(clipTxt, 300, 0);
}