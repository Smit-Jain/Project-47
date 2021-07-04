var ground;
var lava, lavaImage;
var player, playerImage;
var edges;
//var brick, brickGroup,
var brickLava, brickLavaGroup;
var invisibleGround;
var gameState="start";
var start, startImage;
var score=0;

function preload(){
  lavaImage=loadImage("Lava.jpg");
  playerImage=loadImage("Player.png");
  startImage=loadImage("StartButton.png");
}

function setup() {
  createCanvas(400,600);

  //ground=createSprite(200,300,400,1200);
  //ground.velocityY=2;
  //ground.shapeColor="black";

  lava=createSprite(200,600,400,50);
  lava.addImage(lavaImage);
  lava.scale=0.7;

  player=createSprite(200,190,50,50);
  player.addImage(playerImage);
  player.scale=0.2;

  invisibleGround=createSprite(200,200,400,5);
  invisibleGround.shapeColor="black";

  start=createSprite(200,300,100,50);
  start.addImage(startImage);
  start.scale=0.5;

  //brickGroup=new Group();
  brickLavaGroup=new Group();

  edges=createEdgeSprites();
}

function draw() {
  background(0);

  if(gameState==="start"){
    textSize(20);
    fill("white");
    text("Click to Start the Game",100,230);
    textSize(15)
    text("- Don't Touch the Lava",120,400);
    text("- Don't touch the lava coming from the top",15,430);
    text("- The invisible ground below the player will be disappeared",0,460)
    text("when you start the game",120,480)
    text("- Press SPACE to jump",120,520);
    text("- Press LEFT ARROW to move left",70,550);
    text("- Press RIGHT ARROW to move right",70,580);

    //ground.destroy();

    if(mousePressedOver(start)){
      gameState="play";
    }

    player.visible=false;
    lava.visible=false;
  }
  else if(gameState==="play"){
    player.visible=true;
    lava.visible=true;
    start.visible=false;
    invisibleGround.destroy();

    text("Score : " + Math.round(score),300,30);
    score=score+0.03;
    console.log(score)

    /*if(ground.y>500){
      ground.y=300;
    }*/  
  
    if(keyDown("LEFT_ARROW")){
      player.x=player.x-3;
    }
    if(keyDown("RIGHT_ARROW")){
      player.x=player.x+3;
    }
    if(keyWentDown("space")){
      player.velocityY=-8;
    }
    player.velocityY=player.velocityY+0.8;

    /*if(player.isTouching(brickGroup)){
      player.velocityY=0;
    }*/
  
    if(player.isTouching(brickLavaGroup) || player.isTouching(lava)){
      gameState="end";
    }

    createBrick();
  }
  else{
    player.destroy();
    //brickGroup.destroyEach();
    brickLavaGroup.destroyEach();
    lava.destroy();
    //ground.destroy();
    textSize(40);
    fill("red");
    strokeWeight(4);
    stroke("yellow");
    text("Game Over!!",90,300);
  }

  player.collide(edges);
  player.collide(invisibleGround);

  drawSprites();
}

function createBrick(){
  if(frameCount%50===0){
    /*brick=createSprite(random(25,375),50,50,10);
    brick.shapeColor="brown";
    brick.velocityY=2;
    brick.lifetime=250;
    brickGroup.add(brick);*/
    brickLava=createSprite(random(25,375),40,100,10);
    //brickLava.x=brick.x;
    //brickLava.y=brick.y+4;
    brickLava.velocityY=2;
    brickLava.lifetime=275;
    brickLava.shapeColor="yellow";
    brickLavaGroup.add(brickLava);
  }
}