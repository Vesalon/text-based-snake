var score = -1;
var numOfLines = 21;
var lineLength = 37;
updateScore();
var O = [Math.floor(numOfLines/2), Math.floor(lineLength/2)];
var snake = [];
snake[0] = [O[0], O[1]];
generateX();
function generateX() {
    var x = Math.floor(Math.random() * lineLength);
    var y = Math.floor(Math.random() * numOfLines);
    var generate = true;
    for (i = 0; i < snake.length; i++) {
        if (y == snake[i][0] && x == snake[i][1]) {
            generateX();
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


function updateScore() {
    score++;
    document.getElementById('score').innerHTML = "Score: " + score;
}
var e;
var previous = -1;
var turnDone = true;
function move() {
    if (event.keyCode == 65){
        if (previous != 65 && previous != 68 && turnDone) {
            turnDone = false;
            previous = event.keyCode;
            clearInterval(e);
            e = setInterval(function(){left()}, 85);
        }
    } else if (event.keyCode == 68){
        if (previous != 68 && previous != 65 && turnDone) {
            turnDone = false;
            previous = event.keyCode;
            clearInterval(e);
            e = setInterval(function(){right()}, 85);
        }
    } else if (event.keyCode == 87){
        if (previous != 87 && previous != 83 && turnDone) {
            turnDone = false;
            previous = event.keyCode;
            clearInterval(e);
            e = setInterval(function(){up()}, 95);
        }
    } else if (event.keyCode == 83){
        if (previous != 83 && previous != 87 && turnDone) {
            turnDone = false;
            previous = event.keyCode;
            clearInterval(e);
            e = setInterval(function(){down()}, 95);
        }
    }
}

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

function update(y, x) {
    turnDone = false;
    for (i = 1; i < snake.length; i++) {
        if (O[0] == snake[i][0] && O[1] == snake[i][1]) {
            clearInterval(e);
            for (j = 1; j < snake.length; j++) {
                updateSnake();
            }
            window.alert("Game Over\nScore: " + score);
            O = [Math.floor(numOfLines/2), Math.floor(lineLength/2)];
            snake = [];
            snake[0] = [O[0], O[1]];
            update(snake[0][0], snake[0][1]);
            score = -1;
            previous = -1;
            updateScore();
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
        generateX();
    } else {
        str = str1 + 'O' + str2;
        document.getElementById(line).innerHTML = str;
    }
    turnDone = true;
}

function addToSnake() {
    var newO = [-1, -1];
    snake[snake.length] = newO;
}

function updateSnake() {
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
