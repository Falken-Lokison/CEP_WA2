class WindTunnel {
  constructor(x, y, w, h) {
    this.bounds = {x, y, w, h};
  }

  contains(body) {
    let {x, y, w, h} = this.bounds;
    return (body.pos.x > x && body.pos.x < x + w &&
            body.pos.y > y && body.pos.y < y + h);
  }

  applyEffect(body) {

    let wind = createVector(windDirection * (chaoticMode ? 1.2 : 0.2), 0);
    body.applyForce(wind);
  }

  display() {
    fill(100, 150, 255, 50);
    noStroke();
    let {x, y, w, h} = this.bounds;
    rect(x, y, w, h);
  }
}
