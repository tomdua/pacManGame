var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var user = { userName: "p", password: "p" };// firstName:"Default", lastName:"User"
var users = new Array();
users.push(user);
var gameSettings; //= {rightKey,leftKey,upKey,downKey,ballsNumber,timeGame,monsterNumber};



function show(shown, hidden1, hidden2, hidden3, hidden4) {
	document.getElementById(shown).style.display = 'block';
	document.getElementById(hidden1).style.display = 'none';
	document.getElementById(hidden2).style.display = 'none';
	document.getElementById(hidden3).style.display = 'none';
	document.getElementById(hidden4).style.display = 'none';
	return false;
}


/*$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});*/

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = $('input[name=ballsNum]').val();
	var pacman_remain = 1;
	start_time = new Date();
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
					var ballsN = $('input[name=ballsNum]').val();
					var b25= ballsN*0.2;
					var b15= ballsN-(ballsN*0.7);
					var b5= ballsN-(ballsN*0.4);
					
					for(var x=0;x<b25;x++){
						board[i][j] =1;//25
					}
					for(let x=0;x<b15;x++){
						board[i][j] = 3;//15
					}
					for(let x=0;x<b5;x++){
						board[i][j] = 7;//05
					}
					

					/*if (ballsN >= ballsN*0.1)//25points
						board[i][j] = 1;
					else if (ballsN >=ballsN 0.7)//15 points
						board[i][j] = 3;
					else
						board[i][j] = 7;

*/
				}
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
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
	while (food_remain*0.1 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	while (food_remain*0.3 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
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
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
				
			}
			else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = $('input[name=25BallColor]').val(); //color ball
				context.fill();
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x, center.y, 11, 0, 2 * Math.PI); // circle
				context.fillStyle = $('input[name=15BallColor]').val();
				context.fill();
			} else if (board[i][j] == 7) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = $('input[name=5BallColor]').val();
				context.fill();

			}
		}
	}
}


function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
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
	window.onclick = function (event) {
		if (event.target == dialogModal) {
			dialogModal.close();
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
/*
board = [
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
		[4,1,1,1,4,1,1,1,1,1,4,1,1,1,4,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,4],
		[4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,4,4,4,4,1,4,1,4,1,4,4,4,4,1,4],
		[4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,1,1,1,1,4,1,4,1,4,1,1,1,1,1,1,4],
		[4,1,4,1,4,1,4,1,4,1,1,1,4,1,4,4,4,4,4,1,4,1,4,1,4,1,4,4,4,1,4,4],
		[4,1,4,1,1,1,1,1,4,1,4,1,1,1,1,1,1,1,4,1,1,1,4,1,4,1,1,1,1,1,1,4],
		[4,1,4,1,4,1,4,4,4,1,4,4,4,4,4,4,4,1,4,4,4,1,4,1,4,1,4,1,4,4,1,4],
		[4,1,4,1,4,1,4,1,1,1,1,1,1,1,1,1,4,1,1,1,4,1,1,1,4,1,4,1,4,4,1,4],
		[4,1,4,1,4,1,4,1,4,1,4,4,4,1,4,1,4,4,4,1,4,1,4,1,1,1,1,1,4,1,1,4],
		[4,1,4,1,1,1,4,1,4,1,4,1,1,1,4,1,1,1,4,1,4,1,4,1,4,4,4,1,4,1,4,4],
		[4,1,1,1,4,1,1,1,4,1,4,1,4,4,4,1,4,1,4,1,4,1,4,1,1,1,4,1,4,1,1,4],
		[4,4,4,1,4,1,4,4,4,1,4,1,1,1,4,1,4,1,4,1,1,1,4,1,4,1,4,1,4,4,1,4],
		[4,1,1,1,4,1,4,1,1,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,1,4],
		[4,1,4,1,4,1,4,1,4,1,1,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,4],
		[4,1,4,1,4,1,4,1,4,4,4,1,4,1,4,1,1,1,1,1,4,1,1,1,1,1,4,1,4,1,1,4],
		[4,1,4,1,1,1,1,1,1,1,4,1,4,1,4,4,4,1,4,4,4,4,1,4,4,4,4,1,4,4,1,4],
		[4,1,4,4,4,4,4,4,4,1,4,1,4,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,4,1,1,4],
		[4,1,1,1,1,1,1,1,4,1,4,1,4,4,4,4,1,4,1,4,4,4,4,4,1,4,1,4,4,1,4,4],
		[4,1,4,4,4,1,4,1,4,1,4,1,1,1,1,4,1,4,1,4,1,1,1,1,1,4,1,1,1,1,1,4],
		[4,1,1,1,1,1,4,1,4,1,4,1,4,4,1,4,1,4,1,4,1,4,1,4,1,4,4,4,1,4,1,4],
		[4,1,4,4,4,1,4,1,1,1,4,1,1,4,1,4,1,4,1,4,1,4,1,4,1,1,1,4,1,4,1,4],
		[4,1,4,1,1,1,4,1,4,1,4,4,1,4,1,4,1,4,1,4,1,4,1,4,4,4,1,4,1,4,1,4],
		[4,1,0,1,4,1,1,1,4,1,1,1,1,4,1,1,1,4,1,1,1,4,1,1,1,1,1,4,1,1,1,4],
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	];
	*/

function closeAboutFunction() {
	document.getElementById("about").close();
}
