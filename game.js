import { Platform } from "platform";
import { Player } from "player";
import player from "./player";
import platform from "./platform";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
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
let score = 0;

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
  line(0, floor, canvasWidth, floor);
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

  //Draw the score on the top left
  push();
  fill(0);
  textSize(16);
  text("Score: " + Math.floor(score), 10, 20);
  pop();

  //Handle jumping
  if (isJumping) {
    jumpVelocity += gravity;
    for (let i in platforms) {
      platforms[i].y -= jumpVelocity;
      if (platforms[i].type == "Moving") {
        var randomL = getRandomIntInclusive(-1, 1);
        var randomR = getRandomIntInclusive(-12, 12);
        for (let z = 0; z < 1; z++) {
          platforms[i].x += randomL;
        }
      }
    }

    //Increase score while moving up and decrease while moving down
    if (jumpVelocity < 0) {
      score += -jumpVelocity;
    } else if (jumpVelocity > 0) {
      score -= jumpVelocity;
    }
    if (score < 0) score = 0;
    floor -= jumpVelocity;
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
        // award score for the first jump
        score += 25;
      }
      isJumping = true;
      jumpVelocity = -jumpPower;
    } else if (character.isColliding(character, platforms)) {
      //Start jump when landing on platform
      isJumping = true;
      jumpVelocity = -jumpPower;
    }
  }
  if (floor < character.y) {
    console.log("dead");
  }
}

//console.log(platforms);
//character.isColaliding(character,platforms[0]);
function keyPressed() {
  keysPressed[key] = true;
}

function keyReleased() {
  keysPressed[key] = false;
}
const platformtypes = ["Normal", "Moving", "Breaking"];
//jumping
