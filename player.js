let img;
export default class player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    rect(this.x, this.y, this.w, this.h);
  }
  isColliding(player, platforms) {
    // check if character is colliding with platform
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
        if (platform.type == "Breaking") {
          platforms.splice(platforms.indexOf(platform), 1);
        }
        return true;
      }
    }
    return false;
  }
  //Specifically for when the player lands on top of a platform
  isLandingOnTop(player, platforms, jumpVelocity) {
    for (const platform of platforms) {
      const playerL = player.x;
      const playerR = player.x + player.w;
      const platformL = platform.x;
      const platformR = platform.x + platform.w;
      const playerB = player.y + player.h;
      const platformT = platform.y;

      //Check horizontal overlap
      const horizontalOverlap = playerR >= platformL && playerL <= platformR;
      //Check if player bottom is near platform top
      const verticalOverlap = playerB >= platformT && playerB <= platformT + 15;
      //Check if player is moving downward (falling)
      const movingDownward = jumpVelocity > 0;

      if (horizontalOverlap && verticalOverlap && movingDownward) {
        return true;
      }
    }
    return false;
  }
}
export { player };