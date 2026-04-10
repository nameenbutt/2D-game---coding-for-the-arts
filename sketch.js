let gameState = "start";

let player = {
  x: 50,
  y: 300,
  size: 30,
  speed: 3
};

let monster = {
  x: 500,
  y: 100,
  size: 40,
  speed: 1.2,
  active: false
};

let clues = [
  { x: 150, y: 100, collected: false },
  { x: 300, y: 250, collected: false },
  { x: 450, y: 150, collected: false }
];

let portal = {
  x: 550,
  y: 320,
  size: 50,
  active: false
};

let score = 0;


function draw() {
  background(20, 20, 40);

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
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("LOST SIGNAL", width / 2, height / 2 - 40);

  fill(255);
  textSize(18);
  text("Find the clues before the shadow finds you", width / 2, height / 2);
  text("Press SPACE to start", width / 2, height / 2 + 40);
}

function playGame() {
  drawBackgroundScene();
  movePlayer();
  drawPlayer();

  drawClues();
  checkClueCollection();

}

 if (score >= 3) {
    monster.active = true;
    portal.active = true;
  }

  if (monster.active) {
    moveMonster();
    drawMonster();
    checkMonsterCollision();
  }

  if (portal.active) {
    drawPortal();
    checkPortalReached();
  }

  fill(255);{
  textSize(16);
  textAlign(LEFT, TOP);
  text("Clues: " + score + "/3", 10, 10);
  }


function drawBackgroundScene() {
  // ground
  fill(30, 60, 30);
  rect(0, 300, width, 100);

  // houses
  fill(50);
  rect(80, 220, 60, 80);
  rect(220, 210, 70, 90);
  rect(380, 230, 65, 70);

  // windows
  fill(255, 255, 100);
  rect(95, 240, 10, 10);
  rect(115, 240, 10, 10);

  // streetlight
  stroke(100);
  line(520, 180, 520, 300);
  noStroke();
  fill(255, 255, 120, 120);
  ellipse(520, 180, 40);
}

function drawPlayer() {
  fill(100, 200, 255);
  ellipse(player.x, player.y - 15, 20); // head
  rect(player.x - 10, player.y - 5, 20, 30); // body
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;

  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

function drawClues() {
  for (let clue of clues) {
    if (!clue.collected) {
      fill(255, 0, 0);
      ellipse(clue.x, clue.y, 15, 15);
    }
  }
}

function checkClueCollection() {
  for (let clue of clues) {
    if (!clue.collected && dist(player.x, player.y, clue.x, clue.y) < 20) {
      clue.collected = true;
      score++;
    }
  }
}

function drawMonster() {
  fill(0);
  ellipse(monster.x, monster.y, monster.size);
  rect(monster.x - 10, monster.y, 20, 40);
  fill(255, 0, 0);
  ellipse(monster.x - 7, monster.y - 5, 5);
  ellipse(monster.x + 7, monster.y - 5, 5);
}

function moveMonster() {
  if (player.x > monster.x) monster.x += monster.speed;
  if (player.x < monster.x) monster.x -= monster.speed;
  if (player.y > monster.y) monster.y += monster.speed;
  if (player.y < monster.y) monster.y -= monster.speed;
}

function checkMonsterCollision() {
  if (dist(player.x, player.y, monster.x, monster.y) < 30) {
    gameState = "lose";
  }
}

function drawPortal() {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(3);
  ellipse(portal.x, portal.y, portal.size + sin(frameCount * 0.1) * 10);
  noStroke();
}

function checkPortalReached() {
  if (dist(player.x, player.y, portal.x, portal.y) < 30) {
    gameState = "win";
  }
}

function drawWinScreen() {
  background(10, 40, 20);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("YOU ESCAPED", width / 2, height / 2 - 20);
  textSize(18);
  text("Press R to restart", width / 2, height / 2 + 20);
}

function drawLoseScreen() {
  background(40, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("THE SHADOW GOT YOU", width / 2, height / 2 - 20);
  textSize(18);
  text("Press R to restart", width / 2, height / 2 + 20);
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
  player.x = 50;
  player.y = 300;

  monster.x = 500;
  monster.y = 100;
  monster.active = false;

  score = 0;
  portal.active = false;

  for (let clue of clues) {
    clue.collected = false;
  }

  gameState = "start";
}




