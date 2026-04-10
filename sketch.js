let gameState = "start";

let player = {
  x: 60,
  y: 320,
  size: 30,
  speed: 3,
  lives: 3
};

let monster = {
  x: 500,
  y: 80,
  size: 40,
  speed: 1.5,
  active: false
};

let clues = [
  { x: 120, y: 100, collected: false },
  { x: 250, y: 220, collected: false },
  { x: 420, y: 120, collected: false },
  { x: 530, y: 250, collected: false }
];

let portal = {
  x: 550,
  y: 320,
  size: 55,
  active: false
};

let score = 0;
let stage = 1;
let message = "Find the missing signals...";

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(15, 15, 35);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "play") {
    playGame();
  } else if (gameState === "win") {
    drawWinScreen();
  } else if (gameState === "lose") {
    drawLoseScreen();
  }
}

function drawStartScreen() {
  background(10, 10, 30);

  fill(255, 0, 50);
  textAlign(CENTER, CENTER);
  textSize(42);
  text("LOST SIGNAL", width / 2, height / 2 - 80);

  fill(255);
  textSize(20);
  text("A strange shadow has entered the town.", width / 2, height / 2 - 20);
  text("Collect all 4 clues to unlock the portal.", width / 2, height / 2 + 15);
  text("Avoid the shadow and survive.", width / 2, height / 2 + 50);

  fill(255, 220, 100);
  textSize(18);
  text("Press SPACE to begin", width / 2, height / 2 + 110);
}

function playGame() {
  drawBackgroundScene();
  drawStageText();

  movePlayer();
  drawPlayer();

  drawClues();
  checkClueCollection();

  updateStage();

  if (monster.active) {
    moveMonster();
    drawMonster();
    checkMonsterCollision();
  }

  if (portal.active) {
    drawPortal();
    checkPortalReached();
  }

  drawHUD();
}

function drawStageText() {
  fill(255);
  textAlign(CENTER, TOP);
  textSize(18);
  text(message, width / 2, 15);
}

function drawHUD() {
  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  text("Clues: " + score + "/4", 15, 15);
  text("Lives: " + player.lives, 15, 40);
  text("Stage: " + stage, 15, 65);
}

function updateStage() {
  if (score < 2) {
    stage = 1;
    message = "Stage 1: Search the quiet town";
    monster.active = false;
    portal.active = false;
  } else if (score < 4) {
    stage = 2;
    message = "Stage 2: Something is getting closer...";
    monster.active = false;
    portal.active = false;
  } else {
    stage = 3;
    message = "Stage 3: RUN! Reach the portal!";
    monster.active = true;
    portal.active = true;
  }
}

function drawBackgroundScene() {
  background(20, 20, 45);

  // sky glow
  noStroke();
  fill(80, 20, 120, 60);
  ellipse(650, 70, 180, 120);

  // ground
  fill(25, 70, 35);
  rect(0, 360, width, 140);

  // road
  fill(40);
  rect(0, 330, width, 40);

  // houses
  fill(50);
  rect(70, 230, 90, 100);
  rect(240, 210, 100, 120);
  rect(420, 240, 110, 90);
  rect(620, 220, 95, 110);

  // roofs
  fill(35);
  triangle(70, 230, 115, 190, 160, 230);
  triangle(240, 210, 290, 170, 340, 210);
  triangle(420, 240, 475, 200, 530, 240);
  triangle(620, 220, 667, 180, 715, 220);

  // windows
  fill(255, 255, 120);
  rect(90, 255, 15, 15);
  rect(120, 255, 15, 15);
  rect(265, 240, 15, 15);
  rect(295, 240, 15, 15);
  rect(450, 260, 15, 15);
  rect(480, 260, 15, 15);
  rect(645, 245, 15, 15);
  rect(675, 245, 15, 15);

  // trees
  fill(60, 35, 20);
  rect(180, 270, 15, 60);
  rect(570, 270, 15, 60);
  fill(20, 80, 30);
  ellipse(188, 250, 50, 50);
  ellipse(578, 250, 50, 50);

  // lamp
  stroke(120);
  line(740, 180, 740, 330);
  noStroke();
  fill(255, 255, 160, 90);
  ellipse(740, 180, 50);
}

function drawPlayer() {
  fill(120, 200, 255);
  ellipse(player.x, player.y - 18, 20, 20);
  rect(player.x - 10, player.y - 8, 20, 30);
  line(player.x - 5, player.y + 22, player.x - 10, player.y + 35);
  line(player.x + 5, player.y + 22, player.x + 10, player.y + 35);
  line(player.x - 10, player.y + 5, player.x - 20, player.y + 15);
  line(player.x + 10, player.y + 5, player.x + 20, player.y + 15);
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;

  player.x = constrain(player.x, 20, width - 20);
  player.y = constrain(player.y, 80, height - 20);
}

function drawClues() {
  for (let clue of clues) {
    if (!clue.collected) {
      fill(255, 60, 60);
      ellipse(clue.x, clue.y, 16, 16);

      fill(255, 100);
      ellipse(clue.x, clue.y, 28, 28);
    }
  }
}

function checkClueCollection() {
  for (let clue of clues) {
    if (!clue.collected && dist(player.x, player.y, clue.x, clue.y) < 22) {
      clue.collected = true;
      score++;
    }
  }
}

function drawMonster() {
  fill(0);
  ellipse(monster.x, monster.y, monster.size, monster.size);
  rect(monster.x - 12, monster.y, 24, 45);

  fill(255, 0, 0);
  ellipse(monster.x - 7, monster.y - 5, 6, 6);
  ellipse(monster.x + 7, monster.y - 5, 6, 6);

  fill(0, 0, 0, 50);
  ellipse(monster.x, monster.y + 35, 50, 20);
}

function moveMonster() {
  if (player.x > monster.x) monster.x += monster.speed;
  if (player.x < monster.x) monster.x -= monster.speed;
  if (player.y > monster.y) monster.y += monster.speed;
  if (player.y < monster.y) monster.y -= monster.speed;
}

function checkMonsterCollision() {
  if (dist(player.x, player.y, monster.x, monster.y) < 32) {
    player.lives--;
    player.x = 60;
    player.y = 320;
    monster.x = 500;
    monster.y = 80;

    if (player.lives <= 0) {
      gameState = "lose";
    }
  }
}

function drawPortal() {
  noFill();
  stroke(255, 0, 100);
  strokeWeight(4);
  ellipse(portal.x, portal.y, portal.size + sin(frameCount * 0.15) * 12);
  ellipse(portal.x, portal.y, portal.size - 15 + sin(frameCount * 0.15) * 8);
  noStroke();
}

function checkPortalReached() {
  if (dist(player.x, player.y, portal.x, portal.y) < 35) {
    gameState = "win";
  }
}

function drawWinScreen() {
  background(10, 50, 25);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(34);
  text("YOU ESCAPED THE SHADOW", width / 2, height / 2 - 30);

  textSize(20);
  text("The signal is restored.", width / 2, height / 2 + 15);
  text("Press R to play again", width / 2, height / 2 + 55);
}

function drawLoseScreen() {
  background(50, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(34);
  text("THE SHADOW GOT YOU", width / 2, height / 2 - 30);

  textSize(20);
  text("The town is lost in darkness.", width / 2, height / 2 + 15);
  text("Press R to try again", width / 2, height / 2 + 55);
}

function keyPressed() {
  if (gameState === "start" && key === " ") {
    gameState = "play";
  }

  if (key === "r" || key === "R") {
    resetGame();
  }
}

function resetGame() {
  player.x = 60;
  player.y = 320;
  player.lives = 3;

  monster.x = 500;
  monster.y = 80;
  monster.active = false;

  portal.active = false;
  score = 0;
  stage = 1;
  message = "Find the missing signals...";

  for (let clue of clues) {
    clue.collected = false;
  }

  gameState = "start";
}


