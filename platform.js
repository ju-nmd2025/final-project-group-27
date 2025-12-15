export default class platform {
  constructor(type, x, y, w, h) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.coinflip = Math.random() < 0.5;
    
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
      let wall = false;
      if (this.x <= 1 || this.x >= 250) wall = true;
      for (let z = 0; z < 3; z++) {
        if (!wall){
          if (this.coinflip) this.x +=1;
          else if (!this.coinflip) this.x -=1;
        }
        if (wall) {
          this.coinflip = !this.coinflip;
          if (this.coinflip) this.x +=3;
          else if (!this.coinflip) this.x -=3;
        }
      }
    }
    if (this.type == "Breaking") {
      push();
      fill("purple");
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
  }
}