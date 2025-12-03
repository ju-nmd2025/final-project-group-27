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
        image(img,this.x,this.y,this.w,this.h);
    }
    isColliding(player, platform) {
        if (platform.y === player.y + player.w && platform.x <= player.x + player.w && platform.x + platform.w > player.x){
            return true;
        }
        else {
            return false;
        }
    }
    isFalling(player) {
        if (this.isColliding == false && player.x > 400){
            return true;
        }
        else {
            return false;
        }
        }
    }
