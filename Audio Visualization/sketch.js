var song;
var frequency;
var spheres = [];

function preload() {
  // preloads the mp3 file and stores in the song variable
  song = loadSound('bossanova.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // creates a new Fast Fourier Transform Object and stores in the frequency variable that allows to analyze audio
  frequency = new p5.FFT();
  // removes the scrollbar
  document.body.style = "overflow: hidden;";
  
  // The for loop is used to create spheres with a random positions, speed, and rotations, the triangle divisions from the X and Y axis of the sphere, and the size as well 
  
  // it also automatically adjust to the screen's width on how many number of spheres should be displayed
  for (let i = 0; i<width/5; i++) {
    var sphereMovement = {
      XX: random(-width/2,width/2),
      YY: random(-height/2,height/2),
      ZZ: random(-500,500),
      spdX: random(-3,1),
      spdY: random(-3,1),
      spdZ: random(-3,1),
      rotaX: random(TWO_PI),
      rotaY: random(TWO_PI),
      rotaZ: random(TWO_PI),
      triX: random(1,20),
      triY: random(1,10),
      size: random(10,50),
    }
    // stores the random sphere coordinates into the spheres array
    spheres.push(sphereMovement);
  }
}

function windowResized() {
  // automaitcally resizes the window's width and height
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  var start = color(228, 197, 158);
  var middle = color(175, 130, 96);
  var end = color(128, 61, 59);

  // obtain the waveform data of the frequency from the audio played which also automatically generates an array
  var wave = frequency.waveform();
  
  // a for loop is used to create the moving spheres
  for (var i = 0; i < spheres.length;i++) {
    
    // stores the corresphonding index into createSphere variable in which allows to access the sphere coordinates
    var createSphere = spheres[i];
    
    // updates the spheres' position
    createSphere.XX += createSphere.spdX;
    createSphere.YY += createSphere.spdY;
    createSphere.ZZ += createSphere.spdZ;
    
    
    // conditional statements to check if the spheres will touch the window boundaries and will bounce off it if it
    if(createSphere.XX > width/2 || createSphere.XX < -width/2) {
      createSphere.spdX *= -1;
    } else if (createSphere.YY > height/2 || createSphere.YY < -height/2) {
      createSphere.spdY *= -1;
    } else if (createSphere.ZZ > 500 || createSphere.ZZ < -500) {
      createSphere.spdZ *= -1;
    }

    // updates the spheres' rotation
    createSphere.rotaX += 0.001;
    createSphere.rotaY += 0.02;
    createSphere.rotaZ += 0.001;
    orbitControl(0.01);
    camera(0,0,800);
    
    // calculate the coordinates to initialze the gradient stroke colors
    var blendColor;
    var firstBlend = map(createSphere.YY, -height/2, height/2, 0,1);
    var secondBlend = map(createSphere.YY, -height/2, height/2, 0,1);

    if (firstBlend < 0.5) {
      blendColor = lerpColor(start, middle, map(firstBlend, 0, 0.5, 0, 1))
    } else {
      blendColor = lerpColor(middle, end, map(secondBlend, 0.5, 1, 0, 1))
    }

    noFill();
    stroke(blendColor);

    // we access the corresponding waveform data from the wave array in which we then multiply by 10 to visualize the audio more clearly from the moving spheres
    var m = wave[i] * 10;
    
    // displays the spheres
    push();
    translate(createSphere.XX,createSphere.YY,createSphere.ZZ);
    rotateX(createSphere.rotaX);
    rotateY(createSphere.rotaY);
    rotateZ(createSphere.rotaZ); sphere(m+createSphere.size,floor(createSphere.triX),floor(createSphere.triY));
    pop();
  }
}

// allows to play and pause the song when mouse is clicked
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}