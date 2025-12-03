let img;

function preload() {
    img = loadImage('player.png');
}
export default class player {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        image(img,this.w,this.h);
    }
    isColliding(player, platform) {
// if (platform.y === character.y + character.w && platform.x <= character.x + character.w && platform.x + platform.w > character.x)
}
}