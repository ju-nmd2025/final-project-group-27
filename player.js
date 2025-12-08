let img;

function preload() {
  img = loadImage("player.png");
}
export default class player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    image(img, this.x, this.y, this.w, this.h);
  }
  isColliding(player, platforms) {
    for (const platform of platforms) {
      const playerL = player.x;
      const playerR = player.x + player.w;
      const platformL = platform.x;
      const platformR = platform.x + platform.w;
      const playerT = player.y;
      const playerB = player.y + player.h;
      const platformT = platform.y;
      const platformB = platform.y + platform.h;
      if (
        ((playerR >= platformL && playerR <= platformR) ||
          (playerL <= platformR && playerL >= platformL)) &&
        ((playerT >= platformT && playerT <= platformB) ||
          (playerB <= platformB && playerB >= platformT))
      ) {
        console.log("collide true");
        console.log(player.x, platform.x);
        console.log(player.y, platform.y);
        return true;
      }
    }
    console.log("collide false");
    return false;
  }
  isFalling(player) {
    if (this.isColliding && player.y > 400) {
      console.log("fall true");
      return true;
    } else {
      console.log("fall false");
      return false;
    }
  }
}
