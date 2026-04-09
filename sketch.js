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



