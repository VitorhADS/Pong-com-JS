//ball variables
let xBall = 300;
let yBall = 200;
let diameter = 13;
let radius = diameter / 2;

//racket variables
let xRacketLeft = 5;
let yRacketLeft = 150;
let racketLength = 10;
let racketHeight = 90;
let xRacketRight = 585;
let yRacketRight = 150;

//ball speed
let speedXBall = 6;
let speedYBall = 6;

let collide = false;

//placar do jogo
let leftPlayerPoints = 0;
let rightPlayerPoints = 0;

//game sounds
let trail;
let touchTheRacket;
let points;

function preload(){
  trail = loadSound("trilha.mp3");
  touchTheRacket = loadSound("raquetada.mp3");
  points = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trail.loop();
}

function draw() {
  background(0);
  showBall();
  moveBall();
  checkEdgeCollision();
  showRacket(xRacketLeft, yRacketLeft);
  showRacket(xRacketRight, yRacketRight);
  moveLeftRacket();
  moveRightRacket();
  checkRacketCollision();
  scoreBoard();
  score();
  bolinhaNaoFicaPresa();
}

function showBall(){
  circle(xBall, yBall, diameter);
}

function moveBall(){
  xBall += speedXBall;
  yBall += speedYBall;
}

function checkEdgeCollision(){
    if (xBall + radius > width || xBall - radius < 0){
    speedXBall *= -1;
  }

  if (yBall + radius > height || yBall - radius < 0){
    speedYBall *= -1;
  }
}

function checkRacketCollision(){
  //if (xBall - radius < xRacketLeft + racketLength && yBall - radius < yRacketLeft + racketHeight && yBall + radius > yRacketLeft){
//    speedXBall *= -1;
//  }
  
//  if (xBall + radius > xRacketRight && yBall - radius < yRacketRight + racketHeight && yBall + radius > yRacketRight){
//    speedXBall *= -1;
//  }
  
  collide = collideRectCircle(xRacketLeft, yRacketLeft, racketLength, racketHeight, xBall, yBall, radius);
  if (collide){
    speedXBall *= -1;
    touchTheRacket.play();
  }
  
  collide = collideRectCircle(xRacketRight, yRacketRight, racketLength, racketHeight, xBall, yBall, radius);
  if (collide){
    speedXBall *= -1;
    touchTheRacket.play();
  }
}

function showRacket(x, y){
  rect(x, y, racketLength, racketHeight);
}

function moveLeftRacket(){
  if (keyIsDown(87)){
    yRacketLeft -= 10;
  }
  if (keyIsDown(83)){
    yRacketLeft += 10;
  }
}

function moveRightRacket(){
  if (keyIsDown(UP_ARROW)){
    yRacketRight -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRacketRight += 10;
  }
}

function scoreBoard(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(leftPlayerPoints, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(rightPlayerPoints, 470, 26);
}

function score(){
  if (xBall > 590){
    leftPlayerPoints += 1;
    points.play();
  }
  if (xBall < 10){
    rightPlayerPoints += 1;
    points.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBall + radius < 0){
    console.log('bolinha ficou presa');
    xBall = 300;
    }
}
