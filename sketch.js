const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Render = Matter.Render;

var ground, particle = null, render;
var divisionHeight = 300;
var score = 0;
var turns = 0;
var Play = 1;
var End = 0;
var gameState = "Play";

var plinkos = [];
var divisions = [];

function setup() {
  createCanvas(600,750);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(0,740,1200,20)
 
  for(var k = 10; k <= width; k = k+100){
    divisions.push(new Division(k, height-divisionHeight/2, 10, divisionHeight))
  }

  for(var j = 10; j <= width; j = j+40){
    plinkos.push(new Plinko(j,75,10))
  }

  for(var j = 25; j <= width-25; j = j+40){
    plinkos.push(new Plinko(j,175,10))
  }

  for(var j = 10; j <= width; j = j+40){
    plinkos.push(new Plinko(j,275,10))
  }

  for(var j = 25; j <= width-25; j = j+40){
    plinkos.push(new Plinko(j,375,10))
  }

  render = Render.create({
    element: document.body,
    engine: engine, 
    options: {
      width: 600,
      height: 750,
      wireframes: false
    }
  });
  
  Engine.run(engine);
 // Render.run(render);
    
}

function draw() {
  background(0);  
  Engine.update(engine);

  //console.log(mouseY)

  textSize(25)
  fill('#221DBC')
  text("Score: "+ score,180,40 )

  textSize(25)
  fill('#221DBC')
  text("Turns: "+ turns,10,40 )

  fill("white")
  text("300", 30,700)
  fill("white")
  text("300", 130,700)
  fill("white")
  text("500", 230,700)
  fill("white")
  text("500", 330,700)
  fill("white")
  text("100", 430,700)
  fill("white")
  text("100", 530,700)

 ground.display();
 
  for(var k = 0; k<divisions.length; k++){
    divisions[k].display()
  }

  for(var j = 0; j<plinkos.length; j++){
     plinkos[j].display()
  }
   
  if(particle !== null){
      particle.display();

      if(particle.body.position.y>550){
        if(particle.body.position.x<210){
          score = score+300
        }
        if(particle.body.position.x>210 && particle.body.position.x<410){
          score = score+500
        }
        if(particle.body.position.x>410){
          score = score+100
        }
        particle = null;
        if(turns >=5){gameState = "End"}
      }
   }
  
  if(gameState === "End"){
    fill('#B80409')
    textSize(100)
    text("GAME OVER",-1,310)
  }
}

function mousePressed(){
   if(gameState === "Play"){
      turns++
      particle = new Particle(mouseX,10,10,10);
  }
}