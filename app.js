
  //monster class
  class monster{
	constructor(x,y,url){
		this.x= x;
		this.y=y;
		this.img = new Image();
		this.img.src = url;
	}
}


var context;//=canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var user = {userName: "p", password: "p"};// firstName:"Default", lastName:"User"
var users= new Array();
users.push(user);
var gameSettings; //= {rightKey,leftKey,upKey,downKey,ballsNumber,timeGame,monsterNumber};
var pacmanDirection;
var Left;
var Right;
var Up;
var Down;
var monsterArr;
var previousMonsterArr;


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	GetSettings();
	score = 0;
	pac_color = "yellow";
	pacmanDirection =1;
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	monsterArr=[];
	initiateMonsters();

	//previousMonsterArr=[];
	// for(var i=0; i<monsterNum; i++) {
	// 	monsterArr.push(new Object);
	// 	previousMonsterArr.push(0);

	// 	// monstersShape[i].i = 0;
    //     //     monstersShape[i].j = 0;
	// }
	
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (newWall(i,j)){
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener("keydown",function(e) {
			if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
            }
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener("keyup",function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}


function initiateMonsters(){
	monsterArr.push(new monster(0,0,"img/login.png"));
	monsterArr.push(new monster(0,9,"img/login.png"));
	monsterArr.push(new monster(19,0,"img/login.png"));
}



function restoreMonstersAndPacToBase(){
	monsters[0].x=0;
	monsters[0].y=0;
	monsters[1].x=0;
	monsters[1].y=9;
	monsters[2].x=19;
	monsters[2].y=0;
}







function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	let r = document.getElementById("rightKey");
	let l = document.getElementById("leftKey");
	let u = document.getElementById("upKey");
	let d = document.getElementById("downKey");
	if(r.value==="Arrow Right")
		Right='39';
	if(l.value==="Arrow Ledt")
		Left='37';	
	if(u.value==="Arrow Up")
		Up='38';
	if(d.value==="Arrow Down")
		Down='40';
	
	if (keysDown[Up]) {
		return 1;
	}
	if (keysDown[Down]) {
		return 2;
	}
	if (keysDown[Left]) {
		return 3;
	}
	if (keysDown[Right]) {
		return 4;
	}
}

function Draw() {
	//canvas.fillRect(0,0,canvas.width,canvas.height);
	canvas.width = canvas.width; //clean board
	//var monNum = 2;//gameSettings["monstersNumber"];
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			//drow pacman
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 20, ((1.65 + 0.5 * pacmanDirection) % 2) * Math.PI, ((1.35 + 0.5 * pacmanDirection) % 2) * Math.PI);
//				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				//drow eye
				if (pacmanDirection == 0)//up
				context.arc(center.x - 10, center.y - 10, 3, 0, 2 * Math.PI); // circle
			 	else if (pacmanDirection == 1)//right
			 	context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
				else if (pacmanDirection == 2)//down
				context.arc(center.x - 15, center.y + 5, 3, 0, 2 * Math.PI); // circle
				else if (pacmanDirection == 3)//left
				context.arc(center.x - 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			//draw foods
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
				////////////////////////////tomicolorFoods
			// 	context.beginPath();
			// 	context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
			// 	context.fillStyle = $('input[name=25BallColor]').val(); //color ball
			// 	context.fill();
			// } else if (board[i][j] == 3) {
			// 	context.beginPath();
			// 	context.arc(center.x, center.y, 11, 0, 2 * Math.PI); // circle
			// 	context.fillStyle = $('input[name=15BallColor]').val();
			// 	context.fill();
			// } else if (board[i][j] == 7) {
			// 	context.beginPath();
			// 	context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			// 	context.fillStyle = $('input[name=5BallColor]').val();
			// 	context.fill();
				//draw walls
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}


function newWall(i,j){
	return (i == 0 && j == 1) && (i == 2 && j == 1) && (i == 1 && j == 2) || (i == 5 && j == 1) || (i == 6 && j == 1)
		|| (i == 6 && j == 2) || (i == 9 && j == 0) || (i == 6 && j == 0) || (i == 10 && j == 0) || (i == 10 && j == 1)
		|| (i == 5 && j == 8) || (i == 10 && j == 9) || (i == 11 && j == 9)|| (i == 11 && j == 4)
		|| (i == 5 && j == 1) || (i == 2 && j == 5) || (i == 3 && j == 5) || (i == 4 && j === 5) || (i == 9 && j == 5)
		|| (i == 8 && j == 6) || (i == 9 && j == 6) || (i == 10 && j == 6) || (i == 11 && j === 6) || (i == 5 && j == 7)
		|| (i == 13 && j == 1) || (i == 13 && j == 2) || (i == 14 && j == 1) || (i == 15 && j === 1) || (i == 18 && j == 2)
		|| (i == 14 && j == 7) || (i == 2 && j == 8) || (i == 3 && j == 8) || (i == 4 && j === 8) || (i == 14 && j == 8)
		|| (i == 15 && j == 8) || (i == 16 && j == 8) || (i == 17 && j == 8) || (i == 9 && j === 9) || (i == 10 && j == 8)
		|| (i == 15 && j == 5) || (i == 16 && j == 5) || (i == 17 && j == 5) || (i == 18 && j === 5) || (i == 11 && j == 0)
		|| (i == 18 && j == 3) || (i == 8 && j == 4) || (i == 9 && j == 4) || (i == 10 && j === 4)

}



function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			pacmanDirection=0;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			pacmanDirection=2;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			pacmanDirection=3;

		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pacmanDirection=1;

		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function aboutFunction() {
	document.getElementById("about").showModal();
	var dialogModal = document.getElementById("about");
        window.onclick = function(event) {
            if (event.target == dialogModal) {                
                dialogModal.close();
            }
        }
}


function closeAboutFunction() {        
	document.getElementById("about").close();
}

function GetSettings()
{
	var color25 = document.getElementById('25BallColor');
	var color15 = document.getElementById('15BallColor');
	var color5 = document.getElementById('5BallColor');
	var monsterNum = document.getElementById('monstersNum');
	var gameTime = document.getElementById('timeGame');
	var ballsNum = document.getElementById('ballsNum');

	color25 = color25.value;
	color15 = color15.value;
	color5 = color5.value;

	gameTime = Number(gameTime.value);
	monsterNum = Number(monsterNum.value);
	food_remain = Number(ballsNum.value);
}

function keyCodeUp(event) {
	var x = event.which;
	Up=x-32;//parseInt(event.keyCode);
  }
  
  function keyCodeDown(event) {
	var x = event.which;
	Down=x-32;//parseInt(event.keyCode);
  }

  function keyCodeRight(event) {
	var x = event.which;
	Right=x-32;//parseInt(event.keyCode);
  }
  
  function keyCodeLeft(event) {
	var x = event.which;
	Left=x-32;//parseInt(event.keyCode);
  }


  function show(shown, hidden1, hidden2, hidden3, hidden4){
	document.getElementById(shown).style.display='block';
	document.getElementById(hidden1).style.display='none';
	document.getElementById(hidden2).style.display='none';
	document.getElementById(hidden3).style.display='none';
	document.getElementById(hidden4).style.display='none';
	return false;
  }
