var ship,shipImg;
var planet,planetImg;
var space, spaceImg;
var alien1Img,alien2Img,alien1,alien2,alien;
var aliensGroup;
var PLAY =1;
var END = 0;
var gameState = PLAY;
var planetG;
var score = 0;
var star,starImg,starG;
var gameOverImg,gameOver;
var jumpSound,collidedSound;
function preload(){
 shipImg = loadImage("ship.png")
 planetImg = loadImage("space1.png")
spaceImg = loadImage("galaxy.png") 
 alien1Img = loadImage("alien1.png")   
 alien2Img = loadImage("a2.png")
 starImg = loadImage("star.png")  
 gameOverImg = loadImage("GameOver.png") 
 jumpSound = loadSound("jump.wav")
 collidedSound = loadSound("collided.wav")
}


function setup() {
 createCanvas(500,500);
 
 space = createSprite(500,500);
 space.addImage("bg",spaceImg);
 space.velocityY = 1;
 
 gameOver = createSprite(220,250,50,10);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;
 gameOver.visible = false;
 ship  = createSprite(250,400,30,20)
 ship.addImage("background",shipImg)
ship.scale = 0.2;
 
aliensGroup = new Group();
planetG = new Group();
starG = new Group();
}

function draw(){ 
 if(gameState===PLAY){
if(space.y>300){
    space.y =200;
}
 }
space.velocityY = 1;
 ship.x = World.mouseX;
 edges= createEdgeSprites();
 ship.collide(edges);



SpawnStar();
SpawnPlanet();
spawnObstacles();
if(planetG.isTouching(ship)){
planetG.destroyEach();
score = score+100;
jumpSound.play()

}
else if (starG.isTouching(ship)) {
    starG.destroyEach();
    score = score+100;
    jumpSound.play()
 }else{
    if(aliensGroup.isTouching(ship)) {
      gameState=END;
      collidedSound.play()
    }
}


drawSprites();
if(gameState===END){
  gameOver.visible = true;
  space.velocityY = 0;
  aliensGroup.setVelocityYEach(0);
  aliensGroup.setLifetimeEach(0);
  planetG.setVelocityYEach(0);
  planetG.setLifetimeEach(0);
  starG.setVelocityYEach(0);
  starG.setLifetimeEach(0);
ship.destroy();
  

}


textSize(20);
  fill("red");
  text("SCORE: "+score,20,40);


}
function SpawnStar() {
    if (World.frameCount % 150 == 0) {
    var star = createSprite(Math.round(random(50, 450),70,10, 10));
    star.addImage(planetImg);
    star.scale=0.1;
    star.velocityY = (3+ score/170);
    star.lifetime = 500;
    starG.add(star);
    }
  }
  
  function SpawnPlanet() {
    if (World.frameCount % 170 == 0) {
    var planet= createSprite(Math.round(random(100, 380),90,10, 10));
    planet.addImage(starImg);
    planet.scale=0.1;
    planet.velocityY = (3+ score/200);
    planet.lifetime = 500;
    planetG.add(planet);
    }
  }
   
  function spawnObstacles() {
    if(frameCount % 150 === 0) {
      var alien  = createSprite(Math.round(random(150, 350),60,20,30));
     alien.setCollider('circle',0,0,30)
    
    
      alien.velocityY = (6 + score/300);
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: alien.addImage(alien1Img);
                break;
        case 2: alien.addImage(alien2Img);
                break;
        default: break;
      
      }
      alien.scale = 0.125;
      alien.lifetime = 500;
      //add each obstacle to the group
      aliensGroup.add(alien);
    ship.depth = alien.depth
    ship.depth = ship.depth +1
    
    }
  }