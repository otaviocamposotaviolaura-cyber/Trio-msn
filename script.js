const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleWidth = 10;
let paddleHeight = 80;

let playerY = canvas.height / 2 - paddleHeight / 2;
let botY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSize = 10;
let ballSpeedX = 5;
let ballSpeedY = 5;

document.addEventListener("mousemove", (event) => {
    let canvasRect = canvas.getBoundingClientRect();
    playerY = event.clientY - canvasRect.top - paddleHeight / 2;
});

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall() {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;

    if (ballX <= paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX >= canvas.width - paddleWidth &&
        ballY > botY &&
        ballY < botY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}

function moveBot() {
    if (ballY < botY + paddleHeight / 2) botY -= 4;
    else botY += 4;
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveBall();
    moveBot();

    drawRect(0, playerY, paddleWidth, paddleHeight, "#fff");
    drawRect(canvas.width - paddleWidth, botY, paddleWidth, paddleHeight, "#fff");
    drawBall();

    requestAnimationFrame(loop);
}

loop();
