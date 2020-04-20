$("#settingsForm").validate({
    rules: {
    rightKey: {
        required: true,
        minlength: 1,
        maxlength: 1
    },
    leftKey: {
        required: true,
        minlength: 1,
        maxlength: 1
    },
    upKey: {
        required: true,
        minlength: 1,
        maxlength: 1
    },
    downKey: {
        required: true,
        minlength: 1,
        maxlength: 1
    },
    ballsNum: {
        required: true,
        range: [50,90]
    },
    timeGame: {
        required: true,
        min: 60
    },
    monstersNum: {
        required: true,
        range: [1,4]
    },

},
messages: {
    rightKey: {
        required: "You must enter a key",
        minlength:"Right key must be one character",
        maxlength: "Right key must be one character"
     },
     leftKey: {
        required: "You must enter a key",
        minlength:"Left key must be one character",
        maxlength: "Left key must be one character"
    },
    upKey: {
        required: "You must enter a key",
        minlength:"Up key must be one character",
        maxlength: "Up key must be one character"
    },
    downKey: {
        required: "You must enter a key",
        minlength:"Down key must be one character",
        maxlength: "Down key must be one character"
    },
    
    ballsNum: {
        required: "You must enter a number",
        range: "Balls number must be between 60 and 90"
    },
    timeGame:{
        required: "You must enter a number",
        min: "Time game must be minimum 60 seconds"
    },
    monstersNum:{
        required: "You must enter a number",
        range: "Monsters number must be between 60 and 90"
    }
},   
submitHandler: function(form) {
    var firstBall = document.getElementById("5BallColor");
    var secondtBall = document.getElementById("15BallColor");
    var thirdBall = document.getElementById("25BallColor");
      if (firstBall.value == secondtBall.value ||
        firstBall.value == thirdBall.value ||
        secondtBall.value == thirdBall.value) {
        alert("You need to choose different colors for different balls points type!");
    }
    else {
        updateSttings();
    }
    return false;
}
});

function updateSttings() {
   
}

function randomSettings() {     
    
}