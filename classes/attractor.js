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
    fill(100,100,255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 34);
    fill(150,150,255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 26);
    fill(180,180,255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 20);
    fill(0, 0, 255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 16);
  }
}
