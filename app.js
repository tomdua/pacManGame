var context=canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var interval;
var user = {userName: "p", password: "p"};
var users= new Array();
var keysDown;
users.push(user);
var gameSettings;
var pacmanDirection;
var leftBalls;
var Left;
var Right;
var Up;
var Down;
var monsters;
var apple;
var monsterInterval;
var monsterNum;
var movingBonus;
var pacLives=0;
var backgroundAudio= new Audio("sound/PacMan.mp3");
var gameTime;
var bonusEaten=false;
var appleEaten;
var appleShow;
var seconds ;
var stopTime;
var board_width = 20;
var board_height = 10;


class monster{
	constructor(x,y,url){
		this.x= x;
		this.y=y;
		this.img = new Image();
		this.img.src = url;
	}
}



function Start() {
	pacLives= $('#gameData img').length;
	for(var i=0;i<5-pacLives;i++)
		$("#gameData").append('<img src="img/heart.png" height="20px" width="20px">');
	document.getElementById("gameData").style.display='block';
	document.getElementById("showSetting").style.display='block';
	//document.getElementById("showSetting").style.width='30%';
	document.getElementById("nav").style.display='none';

	board = new Array();
	initSettings();
	monsters = [];
	monsters.push(new monster(0,0,"img/mon1.png"));
	monsters.push(new monster(19,0,"img/mon2.png"));
	monsters.push(new monster(19,9,"img/mon3.png"));
	monsters.push(new monster(0,9,"img/mon4.png"));
	movingBonus=[9,4,"img/mon5.png"];
	apple = [10,4,"img/apple.png"];
	backgroundAudio.play();
	gameTime= gameSettings["time"];
	startTime();
	score = 0;
	pacLives=5;
	appleEaten=false;
	appleShow=false;
	pac_color = "yellow";
	pacmanDirection =1;
	var cnt = 200;
	var food_remain = gameSettings["balls"];
	monsterNum=gameSettings["monsters"];
	if(monsterNum>1)
		document.getElementById("redMonster").style.display='block';
	else document.getElementById("redMonster").style.display='none';

	var points5 = Math.floor(food_remain * 0.6);
	var points15 = Math.floor(food_remain* 0.3);
	var points25 = Math.floor(food_remain * 0.1);
	leftBalls=points15+points25+points5;
	var pacman_remain = 1;
	for (var i = 0; i < board_width; i++) {
		board[i] = new Array();
		for (var j = 0; j < board_height; j++) {
			if (Wall(i,j))
				board[i][j] = 4;
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * points5) / cnt) {
					points5--;
					board[i][j] = 1.1;
				} else if ((randomNum < (1.0 * (pacman_remain + points5)) / cnt) && !((i === 0 && j === 0)
					|| (i === 19 && j === 9) || (i === 19 && j === 0) || (i === 0 && j === 9))) {
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
//init food on board
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
	keysDown = { };
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
	if(IsValid(shape.i,shape.j)){
	interval = setInterval(UpdatePosition, 150);
	monsterInterval =setInterval(UpdatePositionMonster,  400);
}
else Start();

}

function Wall(i,j){
	return (i ==8 && j == 3)||	(i ==9  && j == 3)||(i == 10 && j == 3) || (i == 11 && j == 3)||
		(i ==8 && j == 7)||	(i ==9  && j == 7)||(i == 10 && j == 7) || (i == 11 && j == 7)
		||(i ==8  && j == 6 ) || (i == 8 && j == 4)||(i ==11  && j == 6 ) || (i == 11 && j == 4)
		||(i == 12 && j == 4)||(i == 7 && j == 4)||(i == 12 && j == 6)||(i == 7 && j == 6)||
		(i == 3 && j == 3)||(i == 3 && j == 4)||(i == 2 && j == 4)||
		(i ==16 && j == 3)||(i == 16 && j == 4)||(i == 17 && j == 4)
		||(i == 3 && j == 6)||(i == 3 && j == 7)||(i == 2 && j == 6)||
		(i ==16 && j == 7)||(i == 16 && j == 6)||(i == 17 && j == 6)||
		(i ==20 && j == 5)||(i == 20 && j == 6)||(i == 20 && j == 4)||
		(i ==0 && j == 5)||(i == 0 && j == 6)||(i == 0 && j == 4)||
		(i ==5 && j == 9)||(i ==4 && j == 9)||(i == 5 && j == 8)||(i == 6 && j == 9)||
		(i ==4 && j == 0)||(i ==6 && j == 0)||(i == 5 && j == 1)||(i == 5 && j == 0)||
		(i==14)&& (j==1)||(i==14)&& (j==0)|| (i==14)&& (j==2)|| (i==15)&& (j==0)||
		(i==14)&& (j==7)||(i==14)&& (j==9)|| (i==14)&& (j==8)|| (i==15)&& (j==9)||
		(i==10)&& (j==0)||(i==10)&& (j==1)||(i==11)&& (j==1)||(i==9)&& (j==1) ||(i==10)&& (j==9)||
		(i==9)&& (j==9)||(i==5)&& (j==5)||(i==5)&& (j==6)||(i==5)&& (j==4)||
		(i==18 && j==1)||(i==18 && j==2)||(i==17 && j==1)||(i==19 && j==5)
	};
	
	
function DefaultLocations(){
	monsters[0].x=0;
	monsters[0].y=0;
	monsters[1].x=19;
	monsters[1].y=0;
	monsters[2].x=19;
	monsters[2].y=9;
	monsters[3].x=0;
	monsters[3].y=9;
	board[shape.i][shape.j] = 0;
	var emptyCell = findRandomEmptyCell(board);
	while((emptyCell[0] === 0 && emptyCell[1] === 0) || (emptyCell[0] === 19 && emptyCell[1] === 0) || (emptyCell[0] === 19 && emptyCell[1] === 9) || (emptyCell[0] === 0 && emptyCell[1] === 9))
		emptyCell = findRandomEmptyCell(board);
	shape.i=emptyCell[0];
	shape.j=emptyCell[1];

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (board_width-1) + 1);
	var j = Math.floor(Math.random() * (board_height-1) + 1);
	while (board[i][j] != 0 ) {
		i = Math.floor(Math.random() * (board_width-1) + 1);
		j = Math.floor(Math.random() * (board_height-1) + 1);
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

function initSettings() {
	$('input[name=5PtKeyColor]').val(gameSettings["fiveBall"]);
	$('input[name=15PtKeyColor]').val(gameSettings["fifteenBall"]);
	$('input[name=25PtKeyColor]').val(gameSettings["twentyFBall"]);
	$('span[name=upKey]').text(gameSettings["up"]);
	$('span[name=downKey]').text(gameSettings["down"]);
	$('span[name=leftKey]').text(gameSettings["left"]);
	$('span[name=rightKey]').text(gameSettings["right"]);
	$('span[name=ballsNum]').text(gameSettings["balls"]);
	$('span[name=monNum]').text(gameSettings["monsters"]);
}



function Draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	lblScore.value = score;

	for (var i = 0; i < board_width; i++) {
		for (var j = 0; j < board_height; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			//drow pacman
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 20, ((1.65 + 0.5 * pacmanDirection) % 2) * Math.PI, ((1.35 + 0.5 * pacmanDirection) % 2) * Math.PI);
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
				context.strokeStyle = 'tomato';
				context.strokeRect(center.x - 30, center.y - 30, 60, 60);
				context.fill();

			}// draw apple
			if(apple[0]=== i && apple[1]===j && board[i][j]!=4 && board[i][j]!=2 &&!appleEaten) {
				var appleImg = new Image();
				appleImg.src = apple[2];
				context.drawImage(appleImg, i * 60, j * 60, 50, 50);

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


}


function UpdateBonusPosition(){
	var maxDis = 0, mDist, maxX, maxY;
	if (IsValid(movingBonus[0] + 1, movingBonus[1])) {
		mDist = CheckDistance(movingBonus[0] + 1, movingBonus[1]);
		if (mDist > maxDis) {
			maxDis = mDist;
			maxX = movingBonus[0] + 1;
			maxY = movingBonus[1];
		}
	}//left
	if (IsValid(movingBonus[0] - 1, movingBonus[1])) {
		mDist = CheckDistance(movingBonus[0] - 1, movingBonus[1]);
		if (mDist > maxDis) {
			maxDis = mDist;
			maxX = movingBonus[0] - 1;
			maxY = movingBonus[1];
		}
	}//down
	if (IsValid(movingBonus[0], movingBonus[1] + 1)) {
		mDist = CheckDistance(movingBonus[0], movingBonus[1]+1);
		if (mDist > maxDis) {
			maxDis = mDist;
			maxX = movingBonus[0];
			maxY = movingBonus[1] + 1;
		}
	}//up
	if (IsValid(movingBonus[0], movingBonus[1] - 1)) {
		mDist = CheckDistance(movingBonus[0], movingBonus[1]-1);
		if (mDist > maxDis) {
			maxDis = mDist;
			maxX = movingBonus[0];
			maxY = movingBonus[1] - 1;
		}
	}

	movingBonus[0] = maxX;
	movingBonus[1] = maxY;
	maxDis = 0;
	}
function UpdatePositionMonster() {
	var monster, minDistance = Number.POSITIVE_INFINITY, mDist, minX, minY;
	UpdateBonusPosition();
	//move Monsters
	for (var i = 0; i < monsterNum; i++) {
		monster = monsters[i];
	
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
			monster.x = minX;
			monster.y = minY;
		minDistance = Number.POSITIVE_INFINITY;
	}
}

function CheckDistance(x,y){
	var ans= Math.sqrt(Math.pow(x-shape.i,2)+Math.pow(y-shape.j,2));
	return ans;
}

function IsValid(x,y){
	return (x<board_width && x>=0 && y<board_height && y>=0 && board[x][y]!==4);
}




function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	let x = GetKeyPressed();
	if (x == 1) {//ArrowUp
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			pacmanDirection=0;
		}
	}
	if (x == 2) { //ArrowDown
		if (shape.j < board_height-1 && board[shape.i][shape.j + 1] != 4) {
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
		if (shape.i < board_width-1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pacmanDirection=1;

		}
	}
	//balls color
	if (board[shape.i][shape.j] === 1.1) {
		score=score+5;
		leftBalls--;
	}
	if (board[shape.i][shape.j] === 1.2) {
		score=score+15;
		leftBalls--;
	}
	if (board[shape.i][shape.j] === 1.3) {
		score=score+25;
		leftBalls--;

	}
	//pacman got moving bonus
	if(shape.i === movingBonus[0] && shape.j === movingBonus[1])
	{
		score+=50;
		bonusEaten=true;
	}
	//apple is showing after 10s
	 if(seconds%7===0)
	 {
		 apple[0]=Math.floor(Math.random() * (19));
		 apple[1]=Math.floor(Math.random() * (9));
	 }
	//pacman got apple bonus
	if(shape.i === apple[0] && shape.j === apple[1] && appleEaten==false)
	{
		score= score+100;
		pacLives = pacLives+1;
		$("#gameData").append('<img src="img/heart.png" height="20" width="20">');
		appleEaten=true;

	}
	board[shape.i][shape.j] = 2;
	for(var m =0; m < monsterNum; m++) {
		if (board[monsters[m].x][monsters[m].y] === 2) {
			//stronger monster
			if(m === 1){
				pacLives=pacLives-2;
				score = score - 20;
				$('#gameData img:last-child').remove();
				$('#gameData img:last-child').remove();
			}else{
				pacLives--;
				$('#gameData img:last-child').remove();
				score = score - 10;
			}
			if (pacLives > 0) {
				DefaultLocations();
				break;
			}
		}
	}

	if (pacLives <= 0) {
		clearTimeout(stopTime);
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		backgroundAudio.pause();
		window.alert("Loser!");
		document.getElementById("gameData").style.display='none';

	}
	else if(leftBalls === 0){
		clearTimeout(stopTime);
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		backgroundAudio.pause();
		window.alert("Winner!!!");
		document.getElementById("gameData").style.display='none';
	}
	else {
		Draw();
	}
}


backgroundAudio.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);




function startTime(){
	seconds = gameTime, $seconds = document.querySelector('#lblTime');
	(function countdown() {
		$seconds.textContent = seconds + 's'
		if(seconds --> 0) stopTime=setTimeout(countdown, 1000)
		if(seconds==(-1)){
			if(score<100){
				window.alert("You can do better than " + score + " points!");
				document.getElementById("gameData").style.display='none';
				window.clearInterval(interval);
				window.clearInterval(monsterInterval);
				backgroundAudio.pause();
				clearTimeout(stopTime);

			}
			else{
				window.alert("Winner!!!");
				document.getElementById("gameData").style.display='none';
				window.clearInterval(interval);
				window.clearInterval(monsterInterval);
				backgroundAudio.pause();
				clearTimeout(stopTime);
			}

		}
	})();
}



function keyCodeUp(event) {
	var x = event.which;
	Up=x-32;
}

function keyCodeDown(event) {
	var x = event.which;
	Down=x-32;
}

function keyCodeRight(event) {
	var x = event.which;
	Right=x-32;
}

function keyCodeLeft(event) {
	var x = event.which;
	Left=x-32;
}


function show(shown){
	var menus= document.getElementsByClassName("context");
	//var target = document.getElementById(shown);  
	for(var i=0;i<menus.length;i++)
		menus[i].style.display = "none";
	
	document.getElementById(shown).style.display='block';
	if(shown!='game'){
		document.getElementById("gameData").style.display='none';
		clearTimeout(stopTime);
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		backgroundAudio.pause();
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



function startNewGame() {
	if(confirm('Do you want to start a new game?')){
		clearTimeout(stopTime);
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		backgroundAudio.pause();
		document.getElementById("gameData").style.display='none';
		document.getElementById("showSetting").style.display='none';
		document.getElementById("nav").style.display='block';

		show('setting');
	}
}