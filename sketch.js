const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var player;
var gameState = 0;
var input;
var submit;
var contin;
var playerName;
var wall, wall1, wall2, wall3, wall4, wall5;
var player_load;
var wallGroup;
var goal;
var contin1;
function preload() {
  player_load = loadImage("character.png")
}

function setup() {
  createCanvas(1200,800);
  wallGroup = new Group();
  edges = createEdgeSprites();
  engine = Engine.create();
  world = engine.world;
  input = createInput('Type name here');
  submit = createButton('Enter');
  contin = createButton('Continue');
  contin1 = createButton('Continue');
  wall = createSprite(300, 350, 300, 30);
  wall1 = createSprite(600, 200, 30, 300);
  wall2 = createSprite(200, 600, 30, 270);
  wall3 = createSprite(750, 400, 30, 270);
  wall4 = createSprite(890, 600, 30, 270);
  wall5 = createSprite(600, 400, 400, 50);
  wall.shapeColor=random(255);
  wall1.shapeColor=random(255);
  wall2.shapeColor=random(255);
  wall3.shapeColor=random(255);
  wall4.shapeColor=random(255);
  wallGroup.add(wall);
  wallGroup.add(wall1);
  wallGroup.add(wall2);
  wallGroup.add(wall3);
  wallGroup.add(wall4);
  wallGroup.add(wall5);
  player = createSprite(30, 700, 1, 1);
  goal = createSprite(1100, 100, 40, 40);
  goal.shapeColor = "yellow";
  wall5.shapeColor = "blue";
  wall5.velocityX = 10;
  player.addImage(player_load);
}

function draw() {
  background('blue');  
  
  if(gameState == 0) {
    contin.hide();
    contin1.hide();
    textSize(20);
    fill('white');
    text('Please Enter Your Name', 460, 200)
    input.position(500, 400);
    submit.position(550, 500);
    submit.mousePressed(()=>{
       input.hide();
        submit.hide();   
        playerName = input.value();
        gameState = 1;
    });
  }
  if(gameState ==  1){
    contin.show();
    background('green');
    textSize(20);
    fill('white');
    text('Welcome ' + playerName, 500,200);
    textSize(15);
    text('How to play this game', 500, 300);
    textSize(10);
    text('1) Use the Arrow keys to move', 500, 400);
    text('2) Navigate through the levels without losing all your lives', 500, 430);
    text('3) Have fun! :)', 500, 460);
    contin.position(550, 500);
        contin.mousePressed(()=>{
            contin.hide();
            gameState = 2;
        });
}
  if(gameState == 2) {
    background('red');
    player.scale = 0.13;
    wall5.bounceOff(edges);
    player.collide(edges);
    player.collide(wallGroup);
    wall.bounceOff(edges);
    if(keyDown(UP_ARROW)) {
      player.y = player.y-5;
    }
    if(keyDown(DOWN_ARROW)) {
      player.y = player.y+5;
    }
    if(keyDown(LEFT_ARROW)) {
      player.x = player.x-5;
    }
    if(keyDown(RIGHT_ARROW)) {
      player.x = player.x+5;
    }
    // wall1.display();
    // player.display();
    if(player.isTouching(goal)) {
      gameState = 3;
    }
  drawSprites();
  fill("white");
  textSize(20);
  text("Reach the goal!", 20, 30);
  }
  if(gameState === 3) {
    contin1.position(550, 500);
    textSize(40);
    background("lightGreen");
    fill("white");
    text("Well Done! Click to move onto lvl 2", 300, 300);
    contin1.show();
    contin1.mousePressed(()=>{
      contin1.hide();
      gameState = 4;
  });
  }
  if(gameState === 4) {
    textSize(40);
    background("pink");
    fill("white");
    text("Quiz:", 300, 300);
  }
}