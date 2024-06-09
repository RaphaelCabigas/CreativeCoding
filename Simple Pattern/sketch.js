// P.S you need to hover on the pattern to change cause running the pattern first time might just display rotating squares

// pattern creation that gets a part of the image based on a random position and then returns it to display

// you may change the incremented values and get a desired pattern based on the mouse's x position
// initialize the variable
let img;

// preload the image
function preload(){
  img=loadImage('horizon.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // center the image
  imageMode(CENTER);
  // display the image that positions half the width and height and fill it with the canvas' width and height
  image(img, width/2, height/2, width, height);
  
  
  let circleRad = 10;
  // return milliseconds of the drawing the sketch and divide it by 50
  let imgAngle = millis()/500;
  // while circleRad is less than 100 keep running
  while (circleRad < 100) {
    
    // round off the randomize number ensuring that the numbers are a whole number
    let xPos = int(random(0, img.width));
    let yPos = int(random(0, img.height));
    // get the a random x and y position and then get a part of the returned image based on the circleRad value
    let pos = img.get(xPos,yPos, circleRad, circleRad);
    
    // push and pop is used so that it will only affect the images within
    push();
    // position to the center of the canvas
    translate(width/2, height/2);
    // rotate the images based on the imgAngle
    rotate(imgAngle);
    // position the images based on the circlRad and subtract the y position of circleRad by the mouse x position 
    // meaning you can change how big the middle space between the images is displayed
    translate(circleRad, circleRad - mouseX);
    // display the images
    image(pos, 0,0)
    pop();
    // increment the angle and raidus by the mouse positions
    imgAngle += mouseX/10;
    circleRad += 0.9;
  }
}