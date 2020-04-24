$("#settingsForm").validate({
    rules: {
        rightKey: {
            required: true
        },
        leftKey: {
            required: true
        },
        upKey: {
            required: true
        },
        downKey: {
            required: true 
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
            required: "You must enter a key"
            },
        leftKey: {
            required: "You must enter a key"          
        },
        upKey: {
            required: "You must enter a key"          
        },
        downKey: {
            required: "You must enter a key"         
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
        let loggedUser=$("#enterName").text();
        if(loggedUser==='New User') {
            alert("You must log in before playing!");
            return;
        }
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
            Start();
            return show('game','welcome','register','login','setting');
        }
        return false;
    }
});

function updateSttings() {
    var rKeyIn = document.getElementById("rightKey");
    var lKeyIn = document.getElementById("leftKey");
    var uKeyIn = document.getElementById("upKey");
    var dKeyIn = document.getElementById("downKey");
    var bNumberIn = document.getElementById("ballsNum");
    var tGameIn = document.getElementById("timeGame");
    var monsterNumIN = document.getElementById("monstersNum");
    var color25In = document.getElementById('25BallColor');
    var color15In = document.getElementById('15BallColor');
    var color5In = document.getElementById('5BallColor');

    gameSettings = {
         right: rKeyIn.value, left: lKeyIn.value, up: uKeyIn.value, down: dKeyIn.value,
         balls: bNumberIn.value, time: tGameIn.value, monsters: monsterNumIN.value,
         fiveBall: color5In.value,fifteenBall: color15In.value, twentyFBall: color25In.value 
    };
    
}

function randomSettings() {
    $('input[name=rightKey]').val("Arrow Right");
    $('input[name=leftKey]').val("Arrow Left");
    $('input[name=upKey]').val("Arrow Up");
    $('input[name=downKey]').val("Arrow Down");
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
    updateSttings();
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


