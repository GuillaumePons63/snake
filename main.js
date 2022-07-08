const canvas = document.getElementById('canvas');
const button = document.querySelector('button');

let ctx = canvas.getContext('2d');
let blockSize = 20;
const directionPossible = ['up', 'right', 'down', 'left'];
let direction = directionPossible[2];


let snakes = [
    [0, 0],
    [0, 1],
    [0, 2]
]

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        direction = directionPossible[0];
    } else if (e.key === 'ArrowRight') {
        direction = directionPossible[1];
    } else if (e.key === 'ArrowDown') {
        direction = directionPossible[2];
    } else if (e.key === 'ArrowLeft') {
        direction = directionPossible[3];
    } else {
        return;
    }
})


function drawSnake() {
    for (let snake of snakes) {
        drawBlock(snake[0], snake[1]);
    }
    setDirection();

}

function setDirection() {
    let newBlock;
    let lastBlock = snakes[snakes.length - 1];
    if (direction === 'up') {
        newBlock = [lastBlock[0], lastBlock[1] - 1]
    } else if (direction === 'right') {
        newBlock = [lastBlock[0] + 1, lastBlock[1]]
    } else if (direction === 'down') {
        newBlock = [lastBlock[0], lastBlock[1] + 1]
    } else if (direction === 'left') {
        newBlock = [lastBlock[0] - 1, lastBlock[1]]
    }
    snakes.push(newBlock);
    snakes.shift();
}

function drawBlock(x, y) {
    ctx.beginPath()
    ctx.fillStyle = 'rgb(0,215,90)';
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    ctx.closePath();


}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake()

}

button.addEventListener('click', () => {
    setInterval(draw, 100)

});