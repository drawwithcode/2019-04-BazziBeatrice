var myImage;
var mySong;
var analyzer;
particles = [];
// let font;
// fontsize = 20;


function preload() {
  // mySong = loadSound("./assets/Inception.mp3");
  mySong = loadSound("./assets/PeakyBlinders.mp3");
  myImage = loadImage("./assets/smoke.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //song
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
  background(0);

  // variable containing the loaded image, x, y, [width, height]
  image(myImage, 0, 0, windowWidth, windowHeight);

  //text
  push();
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);
  textSize(20);
  text("LET'S SMOKE A CIGARETTE AND WAIT", windowWidth / 2, windowHeight / 1.2);
  pop();

  push();
  textAlign(CENTER, CENTER);
  noStroke();
  fill(215,195,141);
  textSize(10);
  text("stay on the right to keep the magic going", windowWidth / 1.7, windowHeight / 1.1);
  pop();

  push();
  textAlign(CENTER, CENTER);
  noStroke();
  fill(67, 67, 57);
  textSize(10);
  text("go to the left to shut the magic", windowWidth / 2.6 , windowHeight / 1.1);
  pop();

  function touchStarted() {
    getAudioContext().resume()
  }


  // song
  console.log("ok");
  if (mouseX > width / 2) {
    // background(0, 255, 0);
    if (mySong.isPlaying() == false) {
      mySong.play();
      mySong.rate();
      mySong.amp();
    }
  } else {
    // mySong.rate((mouseX + 1) * 2);
    // mySong.amplitude(mouseY / height);

    mySong.stop();
  }

  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  console.log("amplitude:" + analyzer.getLevel());
  console.log("var volume:" + volume);

  // ellipse(width / 2, height / 2, volume);
  //


  //smoke
  for (let i = 0; i < 5; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}

class Particle {

  constructor() {
    this.x = windowWidth / 1.52;
    this.y = windowHeight / 2;
    this.vx = random(-1, 1);
    this.vy = random(-6, -1);
    this.alpha = 255;

  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    // this.alpha -= 5;

    this.vy -= 0.025;
		this.alpha--;

  }

  show() {
    let s = 2;
    noStroke();
    //stroke(255);


      // if (volume <= 0) {
      // fill("red", this.alpha);
      // }

    fill(255, this.alpha);
    ellipse(this.x, this.y, (s + volume/3));
    // ellipse(this.x, this.y, volume * random(0.9, 1.1));
  }


}
