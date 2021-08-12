var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var invisibleground;


function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
monkeyCollided=loadImage("sprite_9.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backgroundImage=loadImage("backGround.png");
  
}



function setup() {
 createCanvas(600,250); 
  
  monkey=createSprite(80,185);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1
  
invisibleground=createSprite(200,220,800,7);
invisibleground.x=invisibleground.width/2;
  invisibleground.velocityX=-5;
  console.log(invisibleground.x);
invisibleground.visible=false;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
   score = 0;
}


function draw() {
background(backgroundImage);
fill("red")
textSize(25)
  text("Survival Score:"+ score, 300,50);
 
  
  if(gameState==PLAY){
    if(keyDown("space")&&monkey.y>=100){
      monkey.velocityY=-12
    }
    monkey.velocityY=monkey.velocityY+0.7
    monkey.collide(invisibleground);
    
    if(monkey.isTouching(bananaGroup)){
      score=score+1
    }
    
    
     if (invisibleground.x < 0){
   invisibleground.x = invisibleground.width/2;
  }
     if(monkey.isTouching(obstacleGroup)){
      monkey.addAnimation(monkeyCollided);
    gameState=END;
     }
  }else if(gameState==END){
    invisibleground.velocityX=0;
    
    monkey.velocityY=0;
     obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);  
    
     fill("red")
     textSize(25)
    text("Press R Key To Restart",300,125)
    
    if(keyDown("r")){
      reset();
    }
  }
  
 
  
 spawnObstacles()
  spawnBanana()
  drawSprites()
  
}

function spawnObstacles(){
  if(frameCount%120==0){
    obstacle=createSprite(550,200);
    obstacle.addImage("enemy", obstacleImage )
    obstacle.scale=0.1;
    obstacle.velocityX=-3;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  } 
}

function spawnBanana(){
  if(frameCount%150==0){
    banana=createSprite(600,145);
     banana.y = Math.round(random(80,120));
     banana.addImage("points",  bananaImage )
    banana.scale=0.1;
    banana.velocityX=-3;
     banana.lifetime=200;
      banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
     bananaGroup.add( banana);
  } 
}


function reset(){
  gameState=PLAY
 obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score=0; 
  monkey.changeAnimation("running", monkey_running);
}







