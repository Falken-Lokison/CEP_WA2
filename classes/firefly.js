class Firefly {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.mass = random(1, 3);
    this.energy = 255;
  }

  applyForce(f) {
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.energy -= 0.5;
  }

  display() {
    noStroke();
    fill(200, 255, 100, this.energy);
    ellipse(this.pos.x, this.pos.y, this.mass * 5);
  }

  isDead() {
    return (
      this.energy <= 0 ||
      this.pos.x < -50 || this.pos.x > width + 50 ||
      this.pos.y < -50 || this.pos.y > height + 50
    );
  }
}
