let gamePattern=[];
let userClickedPattern=[];
let buttonColours=["red","blue","green","yellow"]
let level=0;
let toggle=false;

$(document).keypress(function(){
    if (!toggle) {
        $("#level-title").text("Level " + level);
        nextSequence();
        toggle = true;
      }
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function (){
            nextSequence();
          }, 1000);
        }
    }
    else {
        console.log("wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").click(function(){
    let userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    setInterval(()=>{
        $("#" + currentColor).removeClass("pressed");
    },100)
    $("#" + currentColor).addClass("pressed");
}

function startOver(){
    level=0;
    gamePattern=[];
    toggle=false;
}