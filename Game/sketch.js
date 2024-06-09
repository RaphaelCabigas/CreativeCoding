// Credits to: https://github.com/bmoren/p5.collide2D (p5.collide 2d library)
// https://github.com/koerismo/p5.buttons (p5.buttons library)
// Background music used from: https://pixabay.com/music/video-games-flat-8-bit-gaming-music-instrumental-211547/

let p, p2; // players initialization
let platforms = []; // platforms array
let countdown = 3; // countdown
let collision = false; // set collision to false
let mode = 'title'; // mode to title
let taggedText = false; // taggedtext to false
let taggedTimer = 20; // tagged timer to 20

// class for creating platforms 
class Platform {
  constructor(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  }  

  // render the platform
  draw() {
    push();
    stroke(255);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

function keyPressed() {
  
  // checks the collision between players if its true
  if (collision === true && p.role === 'seeker' && (keyIsDown(220)) || collision === true && p2.role === 'seeker' && (keyIsDown(32))) {
    // change the roles between the players when player 1 press backslash or player 2 press spacebar
    let changeRole = p.role;
    p.role = p2.role;
    p2.role = changeRole;    
    if (p.role === 'seeker') {
       taggedText = true; 
    }
    if (p2.role === 'seeker') {
       taggedText = true; 
    }
  } 
}

let musicButton;
let bgm;
let musicPlaying = false;
let howTo = false;
let howToText = "W or UP is to jump, A/D and LEFT/RIGHT is to move, S or DOWN is to go under the platform, SPACEBAR or \\ is to tag the runner";
let xPos, yPos, boxWidth, boxHeight;
function preload() {
  bgm = loadSound('flat-8-bit-gaming-music-instrumental-211547.mp3');
}

function again() {
  if(musicPlaying) {
    bgm.loop();
  }
}

function setup() {
  createCanvas(600, 400);
  // create music button
  musicButton = new Button({
    x: 120, y: 70,
    width: 100, height: 50,
    content: 'MUSIC: OFF',
    on_press() {
      // conditions if the music is playing
      if (musicPlaying) {
        bgm.pause();
        musicButton.text('MUSIC: OFF');
      } else if (!musicPlaying) {
        bgm.play();
        musicButton.text('MUSIC: ON');
      }
      // set the conditions for musicPlaying if its true return false and if its false then return true
      musicPlaying = !musicPlaying;
    }
  });
  
  // when the music ends call the again function
  bgm.onended(again);
  // create a how to play button
  howToPlayButton = new Button ({
    x: 280+width/2, y: height/2-130,
    width: 100, height: 50,
    content:'HOW TO PLAY',
    on_press() {
    howTo = true
    }
  });
  noStroke();
p = new Player(528, 200, color(0, 0, 255), "P1", "", {
  jump: UP_ARROW,
  left: LEFT_ARROW,
  right: RIGHT_ARROW,
  down: DOWN_ARROW
});
p2 = new Player(100, 100, color(255, 0, 0), "P2", "", {
  jump: 87, // "W" key
  left: 65, // "A" key
  right: 68, // "D" key
  down: 83 // "S" key
});
  fill(255);
  // add the platforms to the array
  platforms.push(new Platform(450, 100, 130, 0.05));
  platforms.push(new Platform(250, 200, 100, 0.05));
  platforms.push(new Platform(1, 150, 150, 0.05));
  platforms.push(new Platform(250, 50, 50, 0.05));
  platforms.push(new Platform(10, 50, 30, 0.05));
  platforms.push(new Platform(200, 370, 100, 0.05));
  platforms.push(new Platform(300, 270, 800, 0.05));
  platforms.push(new Platform(-100, 270, 250, 0.05));
  // initialize player roles through randomization
  if (random(0,1) < 0.5) {
    p.role = "seeker";
    p2.role = "runner";
  } else {
    p.role = "runner";
    p2.role = "seeker";
  }
}

function draw() {
  if (mode === "title") {
    title();
  } else if (mode === "start") {
    start();
  } else if (mode === "gameover") {
    gameOver();
  }
}

// displays the games instructions
function gameplayInstructions() {
  push();
  // this adds the darken overlay with a transparent fill
  fill(0, 150);
  // takes up the whole screen
  rect(0,0, width, height);
  
  // make the text box white
  fill(255);
  boxWidth = width/2;
  boxHeight = height/2;
  // centers the box
  xPos = (width - boxWidth)/2;
  yPos = (height - boxHeight)/2;
  rect(xPos, yPos, boxWidth, boxHeight);
  
  fill(0);
  textSize(20);
  // centers the text
  textAlign(CENTER, CENTER);
  text(howToText,xPos,yPos,boxWidth,boxHeight);
  pop();
}

function mousePressed() {
  howTo = false;
}

function title() {
  push();
  background(0);
  musicButton.draw();
  howToPlayButton.draw();
  textSize(50);
  translate(width/2, height/2)
  textAlign(CENTER, CENTER);
  fill(255);
  text("TAYA-TAYAAN", 0, 0);
  textSize(40);
  text("PRESS ENTER TO START", 0, 100);
  pop();
  if(howTo) {
    gameplayInstructions();
  }
  if (keyCode === ENTER) {
    mode = "start";
  }
}

//checks the collisiong between players and platform
function collisionPlayerPlatform(playr, platfrm) {
  return(
    playr.x < platfrm.x + platfrm.w &&
    playr.x + playr.w > platfrm.x &&
    playr.y < platfrm.y + platfrm.h &&
    playr.h + playr.y > platfrm.y
  );
}

function start() {
  background(0);
  if (countdown > 0) {
  push();
  textSize(50);
  text(countdown, width / 2, height / 2);
  if (frameCount % 30 === 0 && countdown > 0 ){
  countdown--;
  }
  pop();
    return;
  }

// the first four parameters checks the first player box and the second four parameters checks the 2nd player box
  collision = collideRectRect(p.x, p.y, p.w+25, p.h-0.05, p2.x, p2.y, p.w+25, p2.h-0.05); // subtract the height by the platform's height so that the seeker needs to go under the platform to tag the runner increasing the difficulty
  push();
  textSize(20);
  // player 1 text and timer
  push();
  fill(0,0, 255);
  text('PLAYER 1', width / 1.23, height / 1.2);
  text(p.role, width / 1.15, height / 1.1);
  text(p.timer.toFixed(2), width / 1.13, height / 1.3);
  pop();
  push();
  fill(255,0, 0);
  text('PLAYER 2', width / 30, height / 1.2);
  text(p2.role, width / 30, height / 1.1);
  text(p2.timer.toFixed(2), width / 30, height / 1.3);
  pop();
  // if the players' role is seeker decrease the timer by 1/20
  if (p.role === 'seeker') {
    p.timer -= 1 / 20;
    if (taggedText === true) {
      text('TAYA', width/2+150,height/1.3);
      taggedTimer--;
    } if (taggedTimer <= 0) {
      taggedText = false;
      taggedTimer = 25;
    }
  }
  if (p2.role === 'seeker') {
      p2.timer -= 1 / 20;
    if (taggedText === true) {
      text('TAYA', width/6.5,height/1.3);
      taggedTimer--;
    } if (taggedTimer <= 0) {
      taggedText = false;
      taggedTimer = 25;
    }
  }
  
  // update and render the players and platforms
  p.update(platforms);
  p.draw();
  p2.update(platforms);
  p2.draw();
  // for each platform in the array render it
  platforms.forEach(platform => platform.draw()); 

  
  // gameover screen
  if (p.timer <= 0 || p2.timer <= 0) {
    mode = "gameover";
  }
}

function gameOver() {
  background(0);
  push();
  musicButton.draw();
  fill(255);
  textSize(20);
  translate(width/2, height/2)
  textAlign(CENTER,CENTER);
  if (p.timer <= 0) {
    text('PLAYER 2 WINS', 0, 0);
  } else if (p2.timer <= 0) {
    text('PLAYER 1 WINS', 0, 0);
  } 
  text("Press Enter to Play Again",0, 100);
  pop();
  // when players want to play again this will reset some values in order to start the game again
  if (keyIsDown(ENTER)) {
    
    // player positions
    p.x = 528;
    p.y = 200;
    p2.x = 100;
    p2.y = 100;
    
    // taggedtexts display
    taggedText = false;
    taggedTimer = 25;
    
    // timer
    p.timer = 60;
    p2.timer = 60;
    countdown =  3;
    
    // player roles
    if (random(0,1) < 0.5) {
      p.role = "seeker";
      p2.role = "runner";
    } else {
      p.role = "runner";
      p2.role = "seeker";
    }
    
    // set the mode to start
    mode = "start";
  }
}