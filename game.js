var score = -1; //after running updateScore, it starts at 0
var numOfLines = 21;
var lineLength = 37;
updateScore();
var O = [Math.floor(numOfLines/2), Math.floor(lineLength/2)]; //represents snake's head
var snake = []; //array of coordinates to represent the snake
snake[0] = [O[0], O[1]];
var portal1 = [];
var partal2 = [];
generatePortal();
generateX();
/**
* generates "apple" for snake to eat
* takes care of possibility of 'X' being generated where the snake exists
*/
function generateX() {
    var x = Math.floor(Math.random() * lineLength);
    var y = Math.floor(Math.random() * numOfLines);
    var generate = true;
    for (i = 0; i < snake.length; i++) {
        if (y == snake[i][0] && x == snake[i][1] ||
            y == portal1[0] && x == portal1[1] ||
            y == portal2[0] && x == portal2[1]) {
            generate = false;
        }
    }
    if (!generate) {
        generateX();
    } else {
        var line = 'line' + y;
        var str = document.getElementById(line).innerHTML;
        var str1 = str.substring(0, x);
        var str2 = str.substring(x + 1, lineLength);
        str = str1 + 'X' + str2;
        document.getElementById(line).innerHTML = str;
    }
}

function generatePortal() {
    var x1 = Math.floor(Math.random() * (lineLength - 2)) + 1;
    var y1 = Math.floor(Math.random() * (numOfLines - 2)) + 1;
    var x2 = Math.floor(Math.random() * (lineLength - 2)) + 1;
    var y2 = Math.floor(Math.random() * (numOfLines - 2)) + 1;
    var generate = true;
    for (i = 0; i < snake.length; i++) {
        if (y1 == snake[i][0] && x1 == snake[i][1] &&
            y1 == snake[i][0] && x1 == snake[i][1] &&
            y1 == y2 && x1 == x2) {
            generate = false;
        }
    }
    if (!generate) {
        generatePortal();
    } else {
        var line1 = 'line' + y1;
        var str1 = document.getElementById(line1).innerHTML;
        var str11 = str1.substring(0, x1);
        var str12 = str1.substring(x1 + 1, lineLength);
        str1 = str11 + '@' + str12;
        document.getElementById(line1).innerHTML = str1;

        var line2 = 'line' + y2;
        var str2 = document.getElementById(line2).innerHTML;
        var str21 = str2.substring(0, x2);
        var str22 = str2.substring(x2 + 1, lineLength);
        str2 = str21 + '@' + str22;
        document.getElementById(line2).innerHTML = str2;
        portal1 = [y1, x1];
        portal2 = [y2, x2];
    }
}

var portalOn = true;
function resetPortal() {
    reset();
    if (portalOn) {
        var x1 = portal1[1];
        var y1 = portal1[0];
        var x2 = portal2[1];
        var y2 = portal2[0];
        var line1 = 'line' + y1;
        var str1 = document.getElementById(line1).innerHTML;
        var str11 = str1.substring(0, x1);
        var str12 = str1.substring(x1 + 1, lineLength);
        str1 = str11 + ' ' + str12;
        document.getElementById(line1).innerHTML = str1;

        var line2 = 'line' + y2;
        var str2 = document.getElementById(line2).innerHTML;
        var str21 = str2.substring(0, x2);
        var str22 = str2.substring(x2 + 1, lineLength);
        str2 = str21 + ' ' + str22;
        document.getElementById(line2).innerHTML = str2;
        portal1 = [];
        portal2 = [];
        document.getElementById("portal").innerHTML = "Reset with Portal";
    } else {
        document.getElementById("portal").innerHTML = "Reset without Portal";
        generatePortal();
    }
    portalOn = !portalOn;
}

/*
* updates score, is executed when snake reaches an apple
*/
function updateScore() {
    score++;
    document.getElementById('score').innerHTML = "Score: " + score;
}

/*
* method used to make snake move faster as time goes on
*/
var speed = 85;
function updateSpeed(percentChange) {
    if (percentChange == 0) {
        speed = 85;
    } else {
        speed *= (1 - percentChange/100);
    }
}

/*
* used to pause/start game
*/
var paused = false;
var rememberSpeed = speed;
function pause() {
    if (paused) {
        speed = rememberSpeed;
        clearInterval(e);
        if (previous == 65) {
            e = setInterval(function(){left()}, speed);
        } else if (previous == 68) {
            e = setInterval(function(){right()}, speed);
        } else if (previous == 87) {
            e = setInterval(function(){up()}, speed);
        } else if (previous == 83) {
            e = setInterval(function(){down()}, speed);
        }
        document.getElementById('pause').innerHTML = "Pause";
    } else {
        rememberSpeed = speed;
        speed = 10000;
        clearInterval(e);
        document.getElementById('pause').innerHTML = "Start";
    }
    paused = !paused;
}

/*
* the function that the page executes anytime a key is pressed
* takes into account current direction/last direction change
* uses boolean to make sure that moves cannot be made simultaneously
*/
var e;
var previous = -1;
var turnDone = true;
function move() {
    if (event.keyCode == 65){
        if (previous != 65 && previous != 68 && turnDone && !paused) {
            turnDone = false;
            previous = event.keyCode;
            clearInterval(e);
            left();
            e = setInterval(function(){left()}, speed);
        }
    } else if (event.keyCode == 68){
        if (previous != 68 && previous != 65 && turnDone && !paused) {
            turnDone = false;
            previous = event.keyCode;
            clearInterval(e);
            right();
            e = setInterval(function(){right()}, speed);
        }
    } else if (event.keyCode == 87){
        if (previous != 87 && previous != 83 && turnDone && !paused) {
            turnDone = false;
            previous = event.keyCode;
            clearInterval(e);
            up();
            e = setInterval(function(){up()}, speed*98/81);
        }
    } else if (event.keyCode == 83){
        if (previous != 83 && previous != 87 && turnDone && !paused) {
            turnDone = false;
            previous = event.keyCode;
            clearInterval(e);
            down();
            e = setInterval(function(){down()}, speed*98/81);
        }
    } else if (event.keyCode == 32){
        pause();
    }
}
/*
* each of these methods moves the snake head in a certain direction, then
* use updateSnake() method to finish the rest of the movements
*/
function left() {
    O[1] = (O[1] - 1 + lineLength) % lineLength;
    updateSnake();
    update(snake[0][0], snake[0][1]);
}

function right() {
    O[1] = (O[1] + 1) % lineLength;
    updateSnake();
    update(snake[0][0], snake[0][1]);
}

function up() {
    O[0] = (O[0] - 1 + numOfLines) % numOfLines;
    updateSnake();
    update(snake[0][0], snake[0][1]);
}

function down() {
    O[0] = (O[0] + 1) % numOfLines;
    updateSnake();
    update(snake[0][0], snake[0][1]);
}

/*
* updates the field to account for the change from each move
* if head lands on top of other part of snake, reset initial setting and start
* new game
* if head lands on apple, generate new apple, add new element to snake array
* and update speed by decreasing time interval of moves by 1.5%
*/
function update(y, x) {
    turnDone = false;
    for (i = 1; i < snake.length; i++) {
        if (O[0] == snake[i][0] && O[1] == snake[i][1]) {
            var endScore = score;
            reset();
            window.alert("Game Over\nScore: " + endScore);
            return;
        }
    }

    var line = 'line' + y;
    var str = document.getElementById(line).innerHTML;
    var str1 = str.substring(0, x);
    var str2 = str.substring(x + 1, lineLength);
    if (x == str.indexOf('X')) {
        str = str1 + 'O' + str2;
        document.getElementById(line).innerHTML = str;
        addToSnake();
        updateScore();
        updateSpeed(1.5);
        generateX();
    } else {
        str = str1 + 'O' + str2;
        document.getElementById(line).innerHTML = str;
    }
    turnDone = true;
}
/*
* adds new element into snake (coordinate outside of palying field)
*/
function addToSnake() {
    var newO = [-1, -1];
    snake[snake.length] = newO;
}
/*
* basically shifts every element to be in the position of the element that came
* before it
* takes into account if a element was added in on the last turn
*/
function updateSnake() {
    if (portalOn) {
        if (O[0] == portal1[0] && O[1] == portal1[1]) {
            if (previous == 65) {
                O[0] = portal2[0];
                O[1] = portal2[1] - 1;
            } else if (previous == 68) {
                O[0] = portal2[0];
                O[1] = portal2[1] + 1;
            } else if (previous == 87) {
                O[0] = portal2[0] - 1;
                O[1] = portal2[1];
            } else if (previous == 83) {
                O[0] = portal2[0] + 1;
                O[1] = portal2[1];
            }
        } else if (O[0] == portal2[0] && O[1] == portal2[1]) {
            if (previous == 65) {
                O[0] = portal1[0];
                O[1] = portal1[1] - 1;
            } else if (previous == 68) {
                O[0] = portal1[0];
                O[1] = portal1[1] + 1;
            } else if (previous == 87) {
                O[0] = portal1[0] - 1;
                O[1] = portal1[1];
            } else if (previous == 83) {
                O[0] = portal1[0] + 1;
                O[1] = portal1[1];
            }
        }
    }
    var lastY = snake[snake.length - 1][0];
    var lastX = snake[snake.length - 1][1];
    if (lastY == -1) {
        lastY = snake[snake.length - 2][0];
        lastX = snake[snake.length - 2][1];
    }
    var line = 'line' + lastY;
    var str = document.getElementById(line).innerHTML;
    var x = lastX;
    var str1 = str.substring(0, x);
    var str2 = str.substring(x + 1, lineLength);
    str = str1 + ' ' + str2;
    document.getElementById(line).innerHTML = str;

    for (i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }
    snake[0] = [O[0], O[1]];
}

function reset() {
    clearInterval(e);
    for (j = 1; j < snake.length; j++) {
        updateSnake();
    }
    O = [Math.floor(numOfLines/2), Math.floor(lineLength/2)];
    var line = 'line' + snake[0][0];
    var str = document.getElementById(line).innerHTML;
    var str1 = str.substring(0, snake[0][1]);
    var str2 = str.substring(snake[0][1] + 1, lineLength);
    str = str1 + ' ' + str2;
    document.getElementById(line).innerHTML = str;
    snake = [];
    snake[0] = [O[0], O[1]];
    update(snake[0][0], snake[0][1]);
    score = -1;
    previous = -1;
    updateScore();
    updateSpeed(0);
}
