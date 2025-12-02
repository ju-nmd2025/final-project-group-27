import { Platform } from "platform";
import { Player } from "player";

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

let canvasWidth = 400;
let canvasHeight = 4000;

function draw() {
  background(170, 170, 255);
}

const platformtypes = ["Normal", "Moving", "Breaking"];
