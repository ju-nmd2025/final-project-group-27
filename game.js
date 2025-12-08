import { Platform } from "platform";
import { Player } from "player";
import player from "./player";
import platform from "./platform";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

let canvasWidth = 300;
let canvasHeight = 400;
let character = new player(canvasWidth * 0.5, canvasHeight * 0.87, 50, 50);
let floor = 400;

// Create platforms with alternating types at random x positions
const platformTypes = ["Normal", "Moving", "Breaking"];
let platforms = [];
for (let i = 0; i < 80; i++) {
  const type = platformTypes[i % 3];
  const randomX = Math.floor(Math.random() * (canvasWidth - 50))  ;
  const y = canvasHeight - i * 60 - 100;
  platforms.push(new platform(type, randomX, y, 50, 10));
}

function draw() {
  background(170, 170, 255);

  character.draw();
  push();
  stroke("magenta");
  strokeWeight(4);
  line(0, floor, floor, canvasHeight);
  pop();
  for (let i in platforms) {
    platforms[i].draw();
  }
}
//console.log(platforms);
//character.isColliding(character,platforms[0]); 
function keyPressed() {
if (!character.isColliding(character,platforms)){
  for (let i in platforms){
      //character.isFalling();
      platforms[i].y += 20;
      floor += 1;
      }
  }
if (key === 'a') {
    character.x -= 10;
  }
if (key === 'd') {
    character.x += 10;
  }
}
const platformtypes = ["Normal", "Moving", "Breaking"];
//jumping

