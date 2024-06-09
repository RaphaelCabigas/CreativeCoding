var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStd1S7A3j_-kxt2Bx6YNYivq9F1LRfSZKG_9NQeOIT9aeas33EJc2KUZkro6J_WBQPvjFkJCfzL3ZT/pub?gid=492020129&single=true&output=csv";
var table;
var albums = [
  "Room for Squares",
  "Heavier Things",  
  "Continuum",
  "Battle Studies",
  "Born and Raised",
  "Paradise Valley",
  "The Search for Everything",
  "Sob Rock",
];
let albumCount = [];
var rfs;
var ht;
var ctn;
var bs;
var bar;
var pv;
var tsfe;
var srr;
var hover = false;

function preload() {
  table = loadTable(url, "csv", "header");
  rfs = loadImage('rfs.jpg');
  ht = loadImage('ht.jpg');
  ctn = loadImage("ctn.jpg");
  bs = loadImage("bs.jpg")
  bar = loadImage("bar.jpeg");
  pv = loadImage("pv.jpg");
  tsfe = loadImage("tsfe.jpg");
  srr = loadImage("srr.png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  push();
  textAlign(CENTER);
  textSize(width/40);
  textStyle(BOLD);
  text("FAVORITE JOHN MAYER ALBUMS OF JOHN MAYER SUBREDDIT'S MEMBERS", width/2, height/13);
  pop();
  push();
  textSize(width/50);
  textStyle(ITALIC);
  textAlign(LEFT);
  text("* hover on the boxes see what's the album *", 40, height/7);
  pop();
  for (let album of albums) {
    albumCount[album] = 0;
  }

  var total = table.getRowCount();
  for (let i = 0; i < total; i++) {
    var responses = table
      .getString(i, "What are your favorite John Mayer Albums")
      .split(","); // Split responses by comma
    for (let response of responses) {
      response = response.trim(); // removes extra whitespaces from the responses
      if (response in albumCount) {
        albumCount[response]++; // Increment count for each album
      }
    }
  }

  // Display the data
  var x = width/10; // x position
  var colorIndex = 0;
  var colors = [
    "#BC7C1D",
    "#1F4052",
    "#616666",
    "#ff2525",
    "#9E7D5A",
    "#74675B",
    "#A7A5A6",
    "#669298",
  ];
  
  var images = [rfs,ht,ctn,bs,bar,pv,tsfe,srr];
  for (let album of albums) {
    var count = albumCount[album];
    var percentage = (count / total) * 100; // Calculate percentage and multiply by 100
    var rectWidth = 50; // Rectangle width
    var rectHeight = count * 3;//Rectangle height based on albumCount
    
    /* mouse hover effect 
    x = 30
    rectWidth = 50
    rectHeight = count * 4 */
    if (mouseX > x && 
        mouseX < rectWidth + x && 
        mouseY > height - rectHeight - rectWidth - 2 && 
        mouseY < height - rectHeight + rectWidth + x) {
      hover = true;
    } else {
      hover = false;
    }
    
    noStroke();
    fill(colors[colorIndex % colors.length]); // Cycle through colors array for each album

    rect(x, height - rectHeight - rectWidth, rectWidth, rectHeight); // Draw rectangle

    textSize(12);
    text(percentage.toFixed(2) + "%", x + 5, height - rectHeight - 60); // Display percentage on top of rectangle

    if (hover === true) {
    push();
    fill(255);
    translate(mouseX - 50, mouseY - 150);
    image(images[colorIndex % images.length], 0, 0, 100, 100);
    pop();
    push();
    fill(255);
    textAlign(CENTER,CENTER);
    text(album, mouseX, mouseY - 20); // Display album name below rectangle
    pop();
  }
    x += 150; // Increment x position for next rectangle
    colorIndex++;
  }
}
