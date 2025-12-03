import { Platform } from "platform";
import { Player } from "player";
import player from "./player";

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

let canvasWidth = 400;
let canvasHeight = 4000;
let character = new player(100,100,1,1);
function draw() {
  background(170, 170, 255);
  character.draw();
}

const platformtypes = ["Normal", "Moving", "Breaking"];
