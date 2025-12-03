export default class platform {
  constructor(type,x, y, w, h) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    if (this.type == "Normal") {
      push();
      fill("blue");
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
    if (this.type == "Moving") {
      push();
      fill("orange");
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
    if (this.type == "Breaking") {
      push();
      fill("purple");
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
  }
}
