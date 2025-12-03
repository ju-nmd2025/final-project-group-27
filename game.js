import { Platform } from "platform";
import { Player } from "player";
import player from "./player";

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

let canvasWidth = 300;
let canvasHeight = 400;
let character = new player(canvasWidth * 0.5, canvasHeight * 0.97, 10, 10);
let floor = 400;
let camera = {
  x: canvasWidth * 0.5,
  y: canvasHeight * 0.5,
  w: canvasWidth,
  h: canvasHeight,
  zoom: 4,
  worldW: 2000,
  worldH: 2000,
};

function draw() {
  background(170, 170, 255);

  camera.x = character.x + character.w * 0.5;
  camera.y = character.y + character.h * 0.5;

  const halfViewW = (canvasWidth / camera.zoom) * 0.5;
  const halfViewH = (canvasHeight / camera.zoom) * 0.5;

  camera.x = Math.max(camera.x, halfViewW);
  camera.y = Math.max(camera.y, halfViewH);
  camera.x = Math.min(camera.x, camera.worldW - halfViewW);
  camera.y = Math.min(camera.y, camera.worldH - halfViewH);

  push();
  translate(canvasWidth * 0.5, canvasHeight * 0.5);
  scale(camera.zoom);
  translate(-camera.x, -camera.y);

  character.draw();
  stroke("magenta");
  strokeWeight(4);
  line(0, floor, camera.worldW, floor);

  pop();
}
let l = false;
while (l == true) {
  if (character.isFalling == false) {
    character.x += 10;
  }
}
const platformtypes = ["Normal", "Moving", "Breaking"];
