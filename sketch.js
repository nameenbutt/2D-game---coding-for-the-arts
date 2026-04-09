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


function setup() {
  createCanvas(400,400);
  background(225);
  rectMode(CENTER);
}

function draw() {
}



