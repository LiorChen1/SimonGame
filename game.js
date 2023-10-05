var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameHasStatred = false;

var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gameHasStatred = true;
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    flashButton(randomChosenColour);
    playAudio(randomChosenColour)
};

function flashButton(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playAudio(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        return false;
    }
    if (userClickedPattern.length === gamePattern.length) {
        console.log("Success! Proceeding to the next level.");
        setTimeout(function() {
            nextSequence();
        }, 1000);
        userClickedPattern = [];
    }
    return true;
};

$(document).keypress(function(){
    if (!gameHasStatred) {
        gameHasStatred = true;
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
});

$(".btn").click(function(){
    if (gameHasStatred) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playAudio(userChosenColour);
        if (!checkAnswer(userClickedPattern.length - 1)) {
            $("h1").text("Game Over, Press Any Key to Restart");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    }
});

function startOver(){
    level = 0;
    gameHasStatred = false;
    gamePattern = [];
    userClickedPattern = [];
}