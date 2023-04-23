var boyImg, boy;
var roadImg, road;

var fruitGroup, apple, bannana, pear;

var rock
var score =0
var gameState
var gameOver
var PLAY
var END
var road1
var keydown


function preload(){
    roadImg = loadImage("road1.jpeg");
    boyImg = loadImage("boy running.jpeg");
   
    apple = loadImage("apple.jpeg");
    pear = loadImage("pear.jpeg");
    bannana=loadImage("bannana.jpeg");

}

function setup(){
    createCanvas(1000,2000);

    boy = createSprite(50,100,20,50);

    boy.addImage(boyImg);
    boy.scale=0.08;
    
    road=createSprite(200,100,400,20);
    road.addImage( roadImg)
    road.x = road.width /2;
    road.velocityX= -(6 +3*score/100);
   
    gameOver = createSprite(200,190,400,10);
    gameOver.addImage(boyImg);

    gameOver.scale = 0.8;
    //restart.scale = 0.8;

    gameOver.visible = false;
    //restart.visible = false;

    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

    fruitGroup = new Group();
    rockGroup= new Group();
    
    score=0;
    
}
function draw() {
    background(225);
    text("Score:" + score,500,50);

    if (gameState==PLAY){
        score = score+ Math.round(getFrameRate()/60);
        road.velocityX = -(6 +3*score/100);

        

            boy.collide(invisibleGround);
            spawnFruit();
            spawnRock();

    if (rockGroup.isTouching(boy)) {
        gameState = END;
    }
        
  }
else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0 
    boy.velocityY = 0
    fruitGroup.setVelocityEach(0);
    rockGroup.setVelocityEach(0);

    
    fruitGroup.setLifeTimeEach(-1);
    rockGroup.setLifeTimeEach(-1);

    if(mousePressedOver(restart)){
        reset();
    }
}

    drawSprites();
}

function spawnFruit(){
    if (frameCount % 60 ===0){
        var fruit = createSprite(600,165,10,40);
            
        fruit.velocityX = -(6 + 3*score/100);
        var rand = Math.round(random(1,6));
        switch(rand) {
        case 1: fruit.addImage(apple);
            break;
        case 2: fruit.addImage(bannana);
            break;
        case 3: fruit.addImage(pear);
            break;
        default: break;
        }

        fruit.scale = 0.5;
        fruit.lifetime= 300;

        fruitGroup.add(fruit);
    }
  } 
  function spawnRock(){
    if (frameCount % 60 ===0){
        var rock = createSprite(600,165,10,40);
            
        rock.velocityX = -(6 + 3*score/100);
        
        rock.scale = 0.5;
        rock.lifetime= 300;

        rockGroup.add(rock);
    }
  } 




  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    fruitGroup.destroyEach();
    rockGroup.destroyEach();

    boy.changeAnimation("boy running.jpeg",boy_running);

    score = 0;
   
    }
  