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
//to track the first jump so the player position can move
let hasJumped = false;
let isJumping = false;
let jumpVelocity = 0;
const jumpPower = 15;
const gravity = 0.6;
let keysPressed = {};

//Create platforms with alternating types at random x positions
const platformTypes = ["Normal", "Moving", "Breaking"];
let platforms = [];
for (let i = 0; i < 80; i++) {
  const type = platformTypes[i % 3];
  const randomX = Math.floor(Math.random() * (canvasWidth - 50));
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

  //smooth left and right movement
  if (keysPressed.a) {
    character.x -= 3;
  }
  if (keysPressed.d) {
    character.x += 3;
  }

  //Handle jumping
  if (isJumping) {
    jumpVelocity += gravity;
    for (let i in platforms) {
      platforms[i].y -= jumpVelocity;
    }

    //Checks if player came from above the platform
    if (character.isLandingOnTop(character, platforms, jumpVelocity)) {
      isJumping = false;
      jumpVelocity = 0;
    }
  }

  //Auto jump
  if (!isJumping) {
    if (!character.isColliding(character, platforms)) {
      //makes player move 25 units on only the first jump
      if (!hasJumped) {
        character.y -= 25;
        hasJumped = true;
      }
      isJumping = true;
      jumpVelocity = -jumpPower;
    } else if (character.isColliding(character, platforms)) {
      //Start jump when landing on platform
      isJumping = true;
      jumpVelocity = -jumpPower;
    }
  }
}
//console.log(platforms);
//character.isColliding(character,platforms[0]);
function keyPressed() {
  keysPressed[key] = true;
}

function keyReleased() {
  keysPressed[key] = false;
}
const platformtypes = ["Normal", "Moving", "Breaking"];
//jumping
