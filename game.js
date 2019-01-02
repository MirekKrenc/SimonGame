//array for colour sequence
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var correct = true;
var numberOfClicks = 0;
var keyPressed = false;
var gameOver = false;

//function for random colour sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //add colour to the sequence pattern
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("h1").text("Level " + level);
  //reset settings
  userClickedPattern = [];
  numberOfClicks = 0;
}

//function keeps user inputs (clicks)
$(".btn").click(function() {
  var id = $(this).attr("id");
  userClickedPattern.push(id);
  playSound(id);
  animatePress(id);
  //check if the user pass
  console.log("GAME=" + gamePattern);
  console.log("USER=" + userClickedPattern);
  numberOfClicks++; //increase numbor of clicks
  for (var i = 0; i < numberOfClicks; i++) {
    correct = true;
    if (gamePattern[i] != userClickedPattern[i]) {
      correct = false;
      userClickedPattern = [];
    }

  }
  if (correct === true) {
    if (numberOfClicks === level) {
      console.log("next sequence z btn click");
      setTimeout(function() {
        nextSequence();
        console.log("Timeout");
      }, 500);
      //setTimeout(nextSequence(),5000);

    }
  } else {
    playSound("wrong");
    $("h1").text("Game over. Press a key or button to START");
    keyPressed = false;
    gameOver=true;
    onStart();
  }

  if (gameOver === true)
  {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    playSound("wrong");
  }
});

//play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animate button after pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

function onStart() {

  level = 0;
  $(document).keypress(function(event) {
    if (keyPressed === false) {
      keyPressed = true;
      gamePattern = [];
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 500);
      $("h1").text("Level 1");
      numberOfClicks = 0;
      gameOver = false;
    }
  });
}

function startButon()
{
  if (keyPressed === false) {
    keyPressed = true;
    gamePattern = [];
    userClickedPattern = [];
    document.querySelector(".input-start").classList.add("pressed");
    //timeout for button
    setTimeout(function(){
      document.querySelector(".input-start").classList.remove("pressed");
      document.querySelector(".input-start").blur();
    },50);
    //delay for start game
    setTimeout(function() {
      nextSequence();
    }, 500);
    $("h1").text("Level 1");
    numberOfClicks = 0;
    gameOver = false;


  }
}

onStart();
