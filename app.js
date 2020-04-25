
var context=canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var user = {userName: "p", password: "p"};
var users= new Array();
users.push(user);
var gameSettings; 
var pacmanDirection;
var leftBalls;
var Left;
var Right;
var Up;
var Down;
var monsters;
var monsterInterval;
var monsterNum;
var movingBonus;
var pacLives;
var backgroundAudio= new Audio("sound/PacMan.mp3");
var gameTime;
var bonusEaten=false;
var seconds ;


backgroundAudio.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);

  class monster{
	constructor(x,y,url){
		this.x= x;
		this.y=y;
		this.img = new Image();
		this.img.src = url;
	}
}


function startTime(){
	seconds = gameTime, $seconds = document.querySelector('#lblTime');
	(function countdown() {
		$seconds.textContent = seconds + 's'
		if(seconds --> 0) setTimeout(countdown, 1000)
		if(seconds==(-1)){
		window.alert("Game Over");
		document.getElementById("gameData").style.display='none';
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		backgroundAudio.pause();

	}
	})();
}


function Start() {
	document.getElementById("gameData").style.display='block';

	board = new Array();
	collor();
	monsters = [];
	monsters.push(new monster(0,0,"img/mon1.png"));
	monsters.push(new monster(0,9,"img/mon2.png"));
	monsters.push(new monster(9,1,"img/mon3.png"));
	monsters.push(new monster(9,9,"img/mon4.png"));
	movingBonus=[0,0,"img/mon5.png"];
	//backgroundAudio.play();
	gameTime= gameSettings["time"];
	startTime();
	score = 0;
	pacLives=5;
	pac_color = "yellow";
	pacmanDirection =1;
	var cnt = 100;
	var food_remain = gameSettings["balls"];
	monsterNum=gameSettings["monsters"];
	var points5 = Math.floor(food_remain * 0.6);
	var points15 = Math.floor(food_remain* 0.3);
	var points25 = Math.floor(food_remain * 0.1);
	
	var pacman_remain = 1;
	//start_time = new Date(gameTime).getTime();

		for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		for (var j = 0; j < 10; j++) {
		if (
			(i == 3 && j == 3) ||
			(i == 3 && j == 4) ||
			(i == 3 && j == 5) ||
			(i == 6 && j == 1) ||
			(i == 6 && j == 2)) 
				board[i][j] = 4;
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * points5) / cnt) {
					points5--;
					board[i][j] = 1.1;
				} else if ((randomNum < (1.0 * (pacman_remain + points5)) / cnt) && !((i === 0 && j === 0) 
				|| (i === 9 && j === 9) || (i === 9 && j === 0) || (i === 0 && j === 9))) {
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

	while (points5 > 0) { 
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.1;
		points5--;
	}
	while (points15 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.2;
		points15--;
	}
	while (points25 > 0) { 
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.3;
		points25--;
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
	monsterInterval =setInterval(UpdatePositionMonster,  400);
	
}

function DefaultLocations(){
	monsters[0].x=0;
	monsters[0].y=0;
	monsters[1].x=0;
	monsters[1].y=9;
	monsters[2].x=9;
	monsters[2].y=0;
	monsters[3].x=9;
	monsters[3].y=9;
	board[shape.i][shape.j]=0;
	var emptyCell = findRandomEmptyCell(board);
	while((emptyCell[0] === 0 && emptyCell[1] === 0) || (emptyCell[0] === 9 && emptyCell[1] === 9) || (emptyCell[0] === 9 && emptyCell[1] === 0) || (emptyCell[0] === 0 && emptyCell[1] === 9))
		emptyCell = findRandomEmptyCell(board);
	shape.i=emptyCell[0];
	shape.j=emptyCell[1];
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
	if(l.value==="Arrow Left")
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

function collor() {
	$('input[name=5PtKeyColor]').val(gameSettings["fiveBall"]);
	$('input[name=15PtKeyColor]').val(gameSettings["fifteenBall"]);
	$('input[name=25PtKeyColor]').val(gameSettings["twentyFBall"]);
}


function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	//lblTime.value = time_elapsed;

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
			}else if (board[i][j] == 1.3) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
			 	context.fillStyle = gameSettings["twentyFBall"]; //color ball
			 	context.fill();
			 } else if (board[i][j] == 1.2) {
			 	context.beginPath();
			 	context.arc(center.x, center.y, 11, 0, 2 * Math.PI); // circle
			 	context.fillStyle = gameSettings["fifteenBall"];
			 	context.fill();
			} else if (board[i][j] == 1.1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = gameSettings["fiveBall"];
				context.fill();
				//draw walls
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			//draw moving ghost
			if(movingBonus[0]=== i && movingBonus[1]===j && !bonusEaten) {
				var BonusImg = new Image();
				BonusImg.src = movingBonus[2];
				context.drawImage(BonusImg, i * 60, j * 60, 45, 45);
			}
            //draw monsters
			for(var m =0; m < monsterNum; m++){
				if(monsters[m].x === i && monsters[m].y === j)
					context.drawImage(monsters[m].img,i*60,j*60,60,60);
			}
			}
		}
		for(var m =0; m < monsterNum; m++) {
            if (board[monsters[m].x][monsters[m].y] === 2) {
                pacLives--;
                // if(pacLife>=0)
                $('#gameData img:last-child').remove();
                score = score - 10;
                if (pacLives > 0) {
                    DefaultLocations();
                     break;
                 } //else if (checkEndGame()) {
                //     break;
                // }
            }
        }

}



function UpdatePositionMonster() {
	var monster, minDistance = Number.POSITIVE_INFINITY, mDist, minX, minY;
	var randMovement, optionalMoves, moveIndex;
	//move moving character
	optionalMoves=getPossibleMoves(movingBonus[0],movingBonus[1]);
	if(optionalMoves.length !==0){
		moveIndex= Math.floor(Math.random() * Math.floor(optionalMoves.length));
		movingBonus[0]=optionalMoves[moveIndex][0];
		movingBonus[1]=optionalMoves[moveIndex][1];
	}
	//move Monsters
	for (var i = 0; i < monsterNum; i++) {
		randMovement = Math.random();
		monster = monsters[i];
		if (randMovement > 0.2) {
		//right
			if (IsValid(monster.x + 1, monster.y)) {
				mDist = CheckDistance(monster.x + 1, monster.y);
				if (mDist < minDistance) {
					minDistance = mDist;
					minX = monster.x + 1;
					minY = monster.y;
				}
			}//left
			if (IsValid(monster.x - 1, monster.y)) {
				mDist = CheckDistance(monster.x - 1, monster.y);
				if (mDist < minDistance) {
					minDistance = mDist;
					minX = monster.x - 1;
					minY = monster.y;
				}
			}//down
			if (IsValid(monster.x, monster.y + 1)) {
				mDist = CheckDistance(monster.x, monster.y + 1);
				if (mDist < minDistance) {
					minDistance = mDist;
					minX = monster.x;
					minY = monster.y + 1;
				}
			}//up
			if (IsValid(monster.x, monster.y - 1)) {
				mDist = CheckDistance(monster.x, monster.y - 1);
				if (mDist < minDistance) {
					minDistance = mDist;
					minX = monster.x;
					minY = monster.y - 1;
				}
			}
		 }
		else {
			optionalMoves = getPossibleMoves(monster.x, monster.y);
			if(optionalMoves.length>0) {
				moveIndex = Math.floor(Math.random() * Math.floor(optionalMoves.length));
					minX=optionalMoves[moveIndex][0];
					minY=optionalMoves[moveIndex][1];
				}
			}
		if ((i === 0) ||
			(i === 1 && (minX !== monsters[0].x || minY !== monsters[0].y)) ||
			(i === 2 && (minX !== monsters[0].x || minY !== monsters[0].y) && (minX !== monsters[1].x || minY !== monsters[1].y))
			|| (minX !== movingBonus[0] || minY!== movingBonus[1]) ) {
			monster.x = minX;
			monster.y = minY;
		}
		//    monster caught pacman
		minDistance = Number.POSITIVE_INFINITY;
	}
}

 function CheckDistance(x,y){
	var ans= Math.sqrt(Math.pow(x-shape.i,2)+Math.pow(y-shape.j,2));
	return ans;
}

function IsValid(x,y){
	return (x<10 && x>=0 && y<10 && y>=0 && board[x][y]!==4);
}

function getPossibleMoves(x,y){
	var possibleMoves = [];
	if (IsValid(x,y - 1)){
		possibleMoves.push([x,y-1]);
	}
	if (IsValid(x,y + 1)){
		possibleMoves.push([x,y+1]);
	}

	if (IsValid(x+1,y)){
		possibleMoves.push([x+1,y]);
	}

	if (IsValid(x-1,y)){
		possibleMoves.push([x-1,y]);
	}
	return possibleMoves;
}



function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {//ArrowUp
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			pacmanDirection=0;
		}
	}
	if (x == 2) { //ArrowDown
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			pacmanDirection=2;
		}
	}
	if (x == 3) {//ArrowLeft
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			pacmanDirection=3;

		}
	}
	if (x == 4) {//ArrowRight
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pacmanDirection=1;

		}
	}
	//balls color
	if (board[shape.i][shape.j] == 1.1) {
		score=score+5;
	}
	if (board[shape.i][shape.j] == 1.2) {
		score=score+15;
	}
	if (board[shape.i][shape.j] == 1.3) {
		score=score+25;
	}
	//pacman ate moving character
	if(shape.i === movingBonus[0] && shape.j === movingBonus[1])
	{
		score+=50;
		bonusEaten=true;
	}
	board[shape.i][shape.j] = 2;



	//var currentTime = new Date().g
//	time_elapsed = (currentTime - start_time) / 1000;
	// if (score >= 50 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }
	// if (score == 100) {
	// 	window.clearInterval(interval);
	// 	window.alert("Game completed");
	// } 
	if (pacLives === 0) {
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		backgroundAudio.pause();
		window.alert("Loser!!");
		document.getElementById("gameData").style.display='none';

	}
	// else if(time_elapsed>= gameTime ) {
	// 	window.clearInterval(interval);
	// 	window.clearInterval(monsterInterval);
	// 	backgroundAudio.pause();
	// 	window.alert("Loser!!");
	// 	// if (score < 150)
	// 	// 	Alert.render("You can do better than " + score + " points!");
	// 	// else
	// 	// {
	// 	// 	Alert.render("<img src='Images/winner.gif' width='500' height='400'>");
	// 	// }
	// 	// return true;
	// }
	// else if(foodLeftToEat === 0){
	// 	window.clearInterval(interval);
	// 	window.clearInterval(monsterInterval);
	// 	backgroundAudio.pause();
	// 	// Alert.render("<img src='Images/winner.gif' width='500' height='400'>");
	// 	// return true;
	// }
	else {
		Draw();
	}
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