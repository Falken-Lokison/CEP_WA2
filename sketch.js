let fireflies = [];
let attractors = [];
let windTunnel;
let showOverlay = true;
let chaoticMode = false;
let polarity = 1;
let seed = 12345;
let canvas;

function setup() {
  canvas = createCanvas(800, 600);
  canvas.elt.setAttribute("tabindex", "0");
  canvas.elt.focus();
  window.addEventListener("keydown", handleKeyPress);

  randomSeed(seed);
  noiseSeed(seed);

  for (let i = 0; i < 8; i++) {
    fireflies.push(new Firefly(random(width), random(height)));
  }

let edgeStrength = 80;
let spacing = 100;

for (let x = 0; x <= width; x += spacing) {
  attractors.push(new Attractor(x, 0, edgeStrength));
  attractors.push(new Attractor(x, height, edgeStrength));
}

for (let y = 0; y <= height; y += spacing) {
  attractors.push(new Attractor(0, y, edgeStrength)); 
  attractors.push(new Attractor(width, y, edgeStrength));
}

attractors.push(new Attractor(width / 2, height / 2, edgeStrength));

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

function handleKeyPress(e) {
  let k = e.key.toUpperCase();
  if (k === 'O') showOverlay = !showOverlay;
  if (k === 'M') chaoticMode = !chaoticMode;
  if (k === 'P') polarity *= -1;
  if (k === 'R') {
    seed = 12345;
    resetSketch();
  }
  if (k === 'N') {
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
  text(`Press O/M/P/R/N to test keys`, 10, 80);
}
