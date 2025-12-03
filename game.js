import { Platform } from "platform";
import { Player } from "player";
import player from "./player";

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

let canvasWidth = 300;
let canvasHeight = 400;
let character = new player(canvasWidth*0.5,canvasHeight*0.97,10,10); 
let floor = 400;
function draw() {
  background(170, 170, 255);
  character.draw();
  stroke('magenta');
  strokeWeight(4);
  line(0,floor,canvasWidth,floor);
}
let l = false;
//while (l == true)
const platformtypes = ["Normal", "Moving", "Breaking"];
