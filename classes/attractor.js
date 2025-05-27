class Attractor {
  constructor(x, y, strength) {
    this.pos = createVector(x, y);
    this.strength = strength;
  }

  attract(firefly) {
    let force = p5.Vector.sub(this.pos, firefly.pos);
    let d = constrain(force.mag(), 5, 50);
    force.normalize();
    let magnitude = (this.strength * firefly.mass) / (d * d);
    force.mult(magnitude * polarity);
    return force;
  }

  display() {
    fill(150,150,150);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 34);
    fill(200,200,200);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 26);
    fill(255,255,255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 20);
    fill(255, 0, 180);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 16);
  }
}
