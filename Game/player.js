// create a class Player for creating the movement and conditions
class Player {
  // the player will have 6 parameters for the x and y position, the theme which is the color, role, and what controls will the player have
  constructor(x, y, theme, name, role, controls) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.w = 20;
    this.h = 20;
    this.onGround = false;
    this.fallingVelocity = 10;
    this.role = role;
    this.timer = 60;
    this.controls = controls;
    this.theme = theme;
    this.name = name;
  }
  // draw method to render the player
  draw() {
    push();
    fill(this.theme);
    rect(this.x, this.y, this.w, this.h);
    pop();
    textSize(15);
    text(this.name, this.x, this.y + -10);
  }
  // update method with a parameter of the platforms array so that we will be able to update the players position taking into consideration of the platforms
  update(platforms) {
    // if the player is not on the ground we add the falling velocity to the player
    if (!this.onGround) {
      this.vy += 0.9;
      // we limit the falling velocity by the 10
      this.vy = min(this.vy, this.fallingVelocity);
    }
    
    // if the player is jumping and the condition for jumping is false and the player is on the ground
    if (keyIsDown(this.controls.jump) && !this.jump && this.onGround) {
      this.jump = true;
      this.onGround = false;
      this.vy = -13;
    }
    
    // checks if the player is on the ground and not jumping we enable the player to have the ability to jump again
    if (this.onGround && !keyIsDown(this.controls.jump)) {
      this.jump = false;
    }
    
    // left and right movement
    if (keyIsDown(this.controls.left)) {
      this.vx -= 0.9;
    } else if (keyIsDown(this.controls.right)) {
      this.vx += 0.9;
    }

    // updating the position based on the players x and y origins and the movement of the player
    this.y += this.vy;
    this.x += this.vx;
    // simulates like a air resistance when player is moving 
    this.vx *= 0.9;
  
    // checks if the players exceed the height and width of the canvas
    // the players will be move to the opposite side of
    if (this.y + this.h >= height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height - this.h;
    }
    if (this.x > width) {
      this.x = -this.w;
    }
    if (this.x + this.w < 0) {
      this.x = width;
    }
    
    // we assume that the ground is false 
    this.onGround = false;
    // a for loop that runs through the array of created platforms
    for (let i = 0; i < platforms.length; i++) {
      // a platform variable the checks the corresponding index
      let platform = platforms[i];
      // if the collisionPlayerPlatform is true
      if (collisionPlayerPlatform(this, platform)) {
        // make ground to true which means the player is on platform
        this.onGround = true;
        // set the falling velocity to 0 which allows the player to not fall through the platform
        this.vy = 0;
        // adjust the players position to the top of the platform
        this.y = platform.y - this.h;
        break; // Exit the loop since the player is on a platform
      }
    }
    
    // allows the player to position under the platform
    if (keyIsDown(this.controls.down) && this.onGround) { 
      this.y += this.h;
    }
  }
}
