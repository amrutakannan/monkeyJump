
var monkey , monkey_running,standingMonkey;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground, groundImage;
var invisibleGround;
var PLAY=true;
var END=false;
var gameState=PLAY;
var score=0;
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground2.png");
  standingMonkey=loadImage("sprite_1.png");
}
  



function setup() {
  createCanvas(400,400);

  
  ground=createSprite(200,320,200,10);
  ground.addImage("ground",groundImage);  
  ground.x=ground.width/2;
  ground.y=320;
  ground.velocityX=-4;
  
  invisibleGround=createSprite(200,340,200,10);
  invisibleGround.addImage("invisibleground",groundImage);  
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.y=340;
  invisibleGround.velocityX=-4;  
  invisibleGround.visible=false;
  
  monkey=createSprite(100,300,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background(222);
  //console.log(monkey.y);
  if(gameState === PLAY)
  {
  if(ground.x<0)
      ground.x=ground.width/2;
  if(invisibleGround.x<0)
      invisibleGround.x=invisibleGround.width/2;  
  if(keyDown("space") && monkey.y >=300)
  {
    monkey.velocityY=-15;
  }
  monkey.velocityY=monkey.velocityY+0.5;
  
  
  spawnBananas();
  spawnObstacles();

  FoodGroup.collide(monkey,eatBanana);
  obstacleGroup.collide(monkey,endMonkey);
  score=score+Math.round(frameRate()/30);
    scoreBoard();
  }
  if (gameState === END)
  {
    FoodGroup.setVelocityEach(0,0);
    obstacleGroup.setVelocityEach(0,0);
    FoodGroup.setLifetimeEach(-1);  
    obstacleGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    invisibleGround.velocityX=0;
   monkey.addImage("monkey",standingMonkey);
   // console.log("gamestate END");
    scoreBoard(score,survivalTime);
  }
  monkey.collide(invisibleGround);
  drawSprites();  
  
  //text("Score: "+score,300,50);
  
}

function endMonkey(thisObstacle,monk)
{
  console.log("end Monkey");
  thisObstacle.collide(invisibleGround);
  
  
  gameState=END;
}

function eatBanana(a, b)
{
  text("+100",a.x,a.y);
  a.destroy();
  score=score+100; 
}

function spawnBananas()
{
  var rand;
  rand=Math.round(random(50,250));
  if(frameCount%80 === 0)
  {
    banana=createSprite(400,rand,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    banana.lifetime=Math.round(400/3);
    FoodGroup.add(banana);
  }
}

function spawnObstacles()
{
  if(frameCount%300 === 0)
  {
    obstacle=createSprite(400,320,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

function scoreBoard(scr,st)
{
  survivalTime=Math.ceil(frameCount/frameRate());
  if(scr)
    score=scr;
  if(st)
    survivalTime=st;
  stroke("white");
  fill("white");
  textSize(20);
  text("Score: "+score,260,50);
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time: "+survivalTime,100,50);
  
  
}






