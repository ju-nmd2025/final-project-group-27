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
        if (
            (player.x + player.w <= platform.x + platform.w && 
            player.x >= platform.x) && 
            (player.y + player.h <= platform.y + platform.h &&
            player.y >= platform.y)
            ){
            console.log("collide true");
            console.log(player.x, platform.x);
            console.log(player.y, platform.y);
            return true;
        }
        else {
            console.log(platform.x);
            console.log(player.x);
            console.log(platform.y);
            console.log(player.y);
            console.log("collide false");
            return false;
        }
    }
    isFalling(player) {
        if (this.isColliding && player.y > 400){
            console.log("fall true");
            return true;
        }
        else {
            console.log("fall false");
            return false;
        }
        }
    }
