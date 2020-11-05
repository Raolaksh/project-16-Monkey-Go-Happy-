var PLAY = 1;
var gameState = PLAY;
var END  = 0;

var monkey, monkey_running;
var banana, obstacle, ground, invisible;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score,survival_time;

function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(625,430);
  
//   Creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  invisible = createSprite(400,352,900,10);
  invisible.x = invisible.width / 2;
  invisible.visible = false;
  
  ground = createSprite(400,350,900,10);
  ground.shapeColor = "brown";
  ground.x = ground.width/3;
  ground.velocityX = -4;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survival_time = 0;
  score = 0;
}

function draw() {
  background("turquoise");

  if (gameState === PLAY) {

    //reset the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    if (invisible.x < 0) {
      invisible.x = invisible.width / 2;
    }
  

    if (keyDown("space") && monkey.isTouching(ground)) {
      monkey.velocityY = -18;
    }
    
    if (monkey.isTouching(FoodGroup)) {
       FoodGroup.destroyEach();
       score = score +2
  }
   
    
   spawnfood();
   spawnObstacles();


    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }

} 
   else if (gameState === END) {

    ground.velocityX = 0;
    invisible.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    

  }


  //gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(invisible);

  stroke("blue")
  textSize(20);
  fill("lightblue");
  textStyle(BOLDITALIC);
  survival_time = Math.ceil(frameCount/frameRate());
  text("Survival_Time: "+survival_time,420,50)
  
  stroke("green")
  textSize(20);
  fill("lightgreen");
  textStyle(BOLDITALIC);
  text("Score: "+score,30,50)

  drawSprites();
}

function spawnfood(){
  
  if(World.frameCount % 120 === 0){
    
    banana = createSprite(600,250,20,20);
    banana.y = random(100,200);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 150;  
    banana.velocityX = -4;
    monkey.depth = banana.depth +1;
    
//     adding banana to food group
    FoodGroup.add(banana);
  }
  
}
    
function spawnObstacles(){
  
  if (World.frameCount % 300 === 0){
    
    obstacle = createSprite(800,317,20,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 200;
    obstacle.velocityX = -4;
    
    obstacleGroup.add(obstacle);
  }
}

