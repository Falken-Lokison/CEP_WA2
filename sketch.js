let fireflies = [];
let attractors = [];
let windTunnel;
let showOverlay = true;
let chaoticMode = false;
let polarity = 1;
let seed = 12345;

function setup() {
  createCanvas(800, 600);
  randomSeed(seed);
  noiseSeed(seed);
  
  for (let i = 0; i < 8; i++) {
    fireflies.push(new Firefly(random(width), random(height)));
  }

  attractors.push(new Attractor(width/2, height/2, 500));

  windTunnel = new WindTunnel(200, 150, 400, 300);
}

function draw() {
  background(20, 20, 30, 80);

  for (let attractor of attractors) {
    attractor.display();
  }

  for (let f of fireflies) {
    for (let a of attractors) {
      let force = a.attract(f);
      f.applyForce(force);
    }

    if (windTunnel.contains(f)) {
      windTunnel.applyEffect(f);
    }

    f.update();
    f.display();
  }

  cleanUp();

  if (showOverlay) {
    drawOverlay();
  }
}

function mousePressed() {
  fireflies.push(new Firefly(mouseX, mouseY));
}

function keyPressed() {
  if (key === 'O') showOverlay = !showOverlay;
  if (key === 'M') chaoticMode = !chaoticMode;
  if (key === 'P') polarity *= -1;
  if (key === 'R') {
    seed = 12345;
    resetSketch();
  }
  if (key === 'N') {
    seed = floor(random(99999));
    resetSketch();
  }
}

function resetSketch() {
  fireflies = [];
  attractors = [];
  setup();
}

function cleanUp() {
  fireflies = fireflies.filter(f => !f.isDead());
}

function drawOverlay() {
  fill(255);
  noStroke();
  textSize(14);
  text(`Fireflies: ${fireflies.length}`, 10, 20);
  text(`Mode: ${chaoticMode ? "Chaotic" : "Calm"}`, 10, 40);
  text(`Polarity: ${polarity === 1 ? "Attract" : "Repel"}`, 10, 60);
}