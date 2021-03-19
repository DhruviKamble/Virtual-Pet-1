//Create variables here
var dog, dogImg;
var happyDog, happyDogImg;
var database;
var foodS;

function preload() {
	//load images here
  happyDogImg = loadImage("images/happyDog.png");
  dogImg = loadImage("images/dog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(100, 400);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  //look at the "food" in database
  var foodRef = database.ref("food");

  //look at value
  //=> calling & defining function (no name) binding
  foodRef.on("value", (data) => {
    foodS = data.val();
    //val is a built-in function
  });
}


function draw() {
  background(142, 8, 109);

  // !== not equal to
  if(foodS !== undefined) {
    fill("white");
    textSize(15);
    text("Remaining Food: " + foodS, 10, 20);
  }
  

  drawSprites();
  //add styles here
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    dog.addImage(happyDogImg);
    updateStock(foodS);
  }
}

function updateStock(fs) {
  if(fs <= 0) {
    fs = 0;
  } else {
    fs = fs-1;
  }

  database.ref('/').update({
    "food": fs
  });
}