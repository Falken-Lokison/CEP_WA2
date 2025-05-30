// === Global Variables ===
let fireflies = [];
let attractors = [];
let windTunnel;
let showOverlay = true;
let chaoticMode = false;
let polarity = 1;
let seed = 12345;
let canvas;
let spawnInterval;
let windInterval;
let windOn = true;
let windDirection = 1;

// UI Controls
let toggleButton;
let strengthSlider;

function setup() {
  // === Canvas Setup ===
  canvas = createCanvas(800, 600);
  canvas.elt.setAttribute("tabindex", "0");
  canvas.elt.focus();

  // === Random Seed Setup ===
  randomSeed(seed);
  noiseSeed(seed);

  // === Initial Fireflies ===
  for (let i = 0; i < 8; i++) {
    fireflies.push(new Firefly(random(width), random(height)));
  }

  // === Attractor Grid Setup ===
  let edgeStrength = 100;
  let spacing = 50;

  for (let x = 0; x <= width; x += spacing) {
    attractors.push(new Attractor(x, 0, edgeStrength));        // Top edge
    attractors.push(new Attractor(x, height, edgeStrength));   // Bottom edge
  }

  for (let y = 0; y <= height; y += spacing) {
    attractors.push(new Attractor(0, y, edgeStrength));        // Left edge
    attractors.push(new Attractor(width, y, edgeStrength));    // Right edge
  }

  attractors.push(new Attractor(width / 2, height / 2, edgeStrength)); // Center

  // === Wind Tunnel Setup ===
  windTunnel = new WindTunnel(200, 150, 400, 300);

  // === UI Buttons ===
  toggleButton = createButton("Toggle Wind: On");
  toggleButton.position(10, height + 10);
  toggleButton.mousePressed(toggleWind);

  let overlayButton = createButton("Toggle Overlay");
  overlayButton.position(10, height + 40);
  overlayButton.mousePressed(() => {
    showOverlay = !showOverlay;
  });

  let modeButton = createButton("Toggle Mode");
  modeButton.position(130, height + 40);
  modeButton.mousePressed(() => {
    chaoticMode = !chaoticMode;
    setWindInterval();
  });

  let polarityButton = createButton("Toggle Polarity");
  polarityButton.position(250, height + 40);
  polarityButton.mousePressed(() => {
    polarity *= -1;
  });

  let resetButton = createButton("Reset (Same Seed)");
  resetButton.position(370, height + 40);
  resetButton.mousePressed(() => {
    seed = 12345;
    resetSketch();
  });

  let newSeedButton = createButton("Reset (New Seed)");
  newSeedButton.position(510, height + 40);
  newSeedButton.mousePressed(() => {
    seed = floor(random(99999));
    resetSketch();
  });

  // === Attractor Strength Slider ===
  strengthSlider = createSlider(50, 200, 100);
  strengthSlider.position(25, 140);
  strengthSlider.style('width', '140px');

  // === Timed Functions ===
  spawnInterval = setInterval(spawnFromCursor, 500);
  setWindInterval();
}

function setWindInterval() {
  clearInterval(windInterval);
  let intervalTime = chaoticMode ? 750 : 1500;
  windInterval = setInterval(changeWindDirection, intervalTime);
}

function changeWindDirection() {
  windDirection = random([-1, 1]);
}

function draw() {
  background(20, 20, 30, 80); // dark semi-transparent background

  // === Display All Attractors ===
  for (let attractor of attractors) {
    attractor.display();
  }

  // === Display Wind Tunnel if On ===
  if (windOn) {
    windTunnel.display();
  }

  // === Update and Display Each Firefly ===
  for (let f of fireflies) {
    for (let a of attractors) {
      a.strength = strengthSlider.value(); // Apply slider strength
      let force = a.attract(f);
      f.applyForce(force);
    }

    // Apply wind if inside tunnel
    if (windOn && windTunnel.contains(f)) {
      windTunnel.applyEffect(f);
    }

    f.update();
    f.display();
  }

  cleanUp();

  // === Draw Overlay if Enabled ===
  if (showOverlay) {
    drawOverlay();
    strengthSlider.show();
  }
  else{
    strengthSlider.hide();
  }
}

function spawnFromCursor() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    fireflies.push(new Firefly(mouseX, mouseY));
  }
}

function toggleWind() {
  windOn = !windOn;
  toggleButton.html("Toggle Wind: " + (windOn ? "On" : "Off"));
}

function mousePressed() {
  fireflies.push(new Firefly(mouseX, mouseY));
}

function resetSketch() {
  fireflies = [];
  attractors = [];
  clear();
  removeElements(); // clear buttons and sliders
  clearInterval(spawnInterval);
  clearInterval(windInterval);
  setup();
}

function cleanUp() {
  fireflies = fireflies.filter(f => !f.isDead());
}

// === HUD + Info Text Overlay ===
function drawOverlay() {
  fill(255);
  noStroke();
  textSize(14);
  textAlign(LEFT);

  // Left-side Status Panel
  text(`Fireflies: ${fireflies.length}`, 20, 30);
  text(`Mode: ${chaoticMode ? "Chaotic" : "Calm"}`, 20, 50);
  text(`Polarity: ${polarity === 1 ? "Attract" : "Repel"}`, 20, 70);
  text(`Wind: ${windOn ? "On" : "Off"}`, 20, 90);
  text(`Direction: ${windDirection === 1 ? "Right" : "Left"}`, 20, 110);
  text(`Attractor Strength: ${strengthSlider.value()}`, 20, 130);

  // Right-side Educational Quote
  let quoteX = width - 230;
  let quoteY = 30;
  let quote = "Fireflies being attracted to fire,\nwhich somehow is really similar to\ncharged particles in a field,\nusing the formula:\nF = G * (m1 * m2) / r²";

  textAlign(LEFT);
  text(quote, quoteX, quoteY);
}
