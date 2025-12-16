import player from "./player.js";
import platform from "./platform.js";

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
//for the game state management for the menu
let gameState = "menu"; // 'menu' | 'playing' | 'gameover' | 'win'

//Creates preview
const platformTypes = ["Normal", "Moving", "Breaking"];
let platforms = [];
for (let i = 0; i < 80; i++) {
  const type = platformTypes[i % 3];
  const randomX = Math.floor(Math.random() * (canvasWidth - 50));
  const y = canvasHeight - i * 80 - 100;
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

  //draw the menu screen
  if (gameState !== "playing") {
    push();
    fill(0, 150);
    rect(0, 0, canvasWidth, canvasHeight);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    if (gameState === "menu") {
      text("Main Menu", canvasWidth / 2, 80);
    } else if (gameState === "gameover") {
      text("Game Over", canvasWidth / 2, 80);
    } else if (gameState === "win") {
      text("Good Job, You Won!", canvasWidth / 2, 80);
    }
    //draw the play button
    const btnW = 140;
    const btnH = 44;
    const bx = canvasWidth / 2 - btnW / 2;
    const by = canvasHeight / 2 - btnH / 2;
    fill(100, 200, 100);
    rect(bx, by, btnW, btnH, 6);
    fill(0);
    textSize(20);
    text("Play", canvasWidth / 2, canvasHeight / 2);
    pop();
    return;
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
        character.y -= 75;
        hasJumped = true;
        // award score for the first jump
        score += 75;
      }
      isJumping = true;
      jumpVelocity = -jumpPower;
    } else if (character.isColliding(character, platforms)) {
      //Start jump when landing on platform
      isJumping = true;
      jumpVelocity = -jumpPower;
    }
  }
  // death condition: player falls below floor
  if (floor < character.y) {
    gameState = "gameover";
  }

  // win condition
  if (score >= 6500) {
    gameState = "win";
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
//function currently only for handling the mouse for the menu screen
function mousePressed() {
  //only handle clicks on menu/play screens
  if (gameState === "playing") return;
  const btnW = 140;
  const btnH = 44;
  const bx = canvasWidth / 2 - btnW / 2;
  const by = canvasHeight / 2 - btnH / 2;
  if (
    mouseX >= bx &&
    mouseX <= bx + btnW &&
    mouseY >= by &&
    mouseY <= by + btnH
  ) {
    resetGame();
    gameState = "playing";
  }
}

function resetGame() {
  //reset the player
  character.x = canvasWidth * 0.5;
  character.y = canvasHeight * 0.87;
  floor = 400;
  hasJumped = false;
  isJumping = false;
  jumpVelocity = 0;
  score = 0;
  //regenerate the platforms
  platforms = [];
  for (let i = 0; i < 80; i++) {
    const type = platformTypes[i % 3];
    const randomX = Math.floor(Math.random() * (canvasWidth - 50));
    const y = canvasHeight - i * 80 - 100;
    platforms.push(new platform(type, randomX, y, 50, 10));
  }
}
window.setup = setup;

window.draw = draw;

window.addEventListener("click", function (event) {
    mousePressed();
});

window.addEventListener("keydown", function (event) {
    keyPressed();
});