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
            range: [50, 90]
        },
        timeGame: {
            required: true,
            min: 60
        },
        monstersNum: {
            required: true,
            range: [1, 4]
        },

    },
    messages: {
        rightKey: {
            required: "You must enter a key",
            minlength: "Right key must be one character",
            maxlength: "Right key must be one character"
        },
        leftKey: {
            required: "You must enter a key",
            minlength: "Left key must be one character",
            maxlength: "Left key must be one character"
        },
        upKey: {
            required: "You must enter a key",
            minlength: "Up key must be one character",
            maxlength: "Up key must be one character"
        },
        downKey: {
            required: "You must enter a key",
            minlength: "Down key must be one character",
            maxlength: "Down key must be one character"
        },

        ballsNum: {
            required: "You must enter a number",
            range: "Balls number must be between 50 and 90"
        },
        timeGame: {
            required: "You must enter a number",
            min: "Time game must be minimum 60 seconds"
        },
        monstersNum: {
            required: "You must enter a number",
            range: "Monsters number must be between 1 and 4"
        }
    },
    submitHandler: function (form) {
        var ball5 = document.getElementById("5BallColor");
        var ball15 = document.getElementById("15BallColor");
        var ball25 = document.getElementById("25BallColor");
        if (ball5.value == ball15.value ||
            ball5.value == ball25.value ||
            ball15.value == ball25.value) {
            alert("You need to choose different colors for different balls points type!");
        }
        else {
            updateSttings();
        }
        return false;
    }
});

function updateSttings() {
    var rKey = document.getElementById("rightKey");
    var lKey = document.getElementById("leftKey");
    var uKey = document.getElementById("upKey");
    var dKey = document.getElementById("downKey");
    var ballsNumber = document.getElementById("ballsNum")
    var tGame = document.getElementById("timeGame");
    var monsterNumber = document.getElementById("monstersNum");
    gameSettings = {
        rightKey: rKey.value, leftKey: lKey.value, upKey: uKey.value, downKey: dKey.value,
        ballsNumber: ballsNumber.value, timeGame: tGame.value, monsterNumber: monsterNumber.value
    };
    return show('game', 'welcome', 'register', 'setting');
}

function randomSettings() {

    $('input[name=rightKey]').val("d");

    $('input[name=leftKey]').val("a");

    $('input[name=upKey]').val("w");

    $('input[name=downKey]').val("s");
    let randomBS= getRndInteger(50, 90);
    $('input[name=ballsNum]').val(randomBS);
    let randomNM = getRndInteger(1, 4);
    $('input[name=monstersNum]').val(randomNM);
    let randomT = Math.floor(Math.random() * 1000) + 60;
    $('input[name=timeGame]').val(randomT);
    let random5 = getRandomColor();
    $('input[name=5BallColor]').val(random5);
    let random15 = getRandomColor();
    $('input[name=15BallColor]').val(random15);
    let random25 = getRandomColor();
    $('input[name=25BallColor]').val(random25);

    
    
    gameSettings["ball5"] = random5;
    gameSettings["ball15"] = random15;
    gameSettings["ball25"] = random25;
    gameSettings["rightKey"] = '68';
    gameSettings["leftKey"] = '65';
    gameSettings["upKey"] = '87';
    gameSettings["downKey"] = '83';
    gameSettings["ballsNumber"] = randomBS;
    gameSettings["monsterNumber"] = randomNM;
    gameSettings["timeGame"] = randomT;

    


    //return show('game', 'welcome', 'register', 'setting');
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}