const canvas = document.getElementById('canvas');
const button = document.querySelector('button');

let ctx = canvas.getContext('2d');
let blockSize = 20;
const directionPossible = ['up', 'right', 'down', 'left'];

let direction = directionPossible[2];

let interval;

let snakes = [
    [0, 0],
    [0, 1],
    [0, 2]
]


// Gestion des touches du clavier

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

// Fonction de dessin

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake()
}
function drawBlock(x, y) {
    ctx.beginPath()
    ctx.fillStyle = 'rgb(0,215,90)';
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    ctx.closePath();
}
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
    collision(newBlock, snakes);
    snakes.push(newBlock);
    snakes.shift();
}



function collision(block, snakeArray) {
    // Pour les colision sur le serpent en lui même
    for (let oneBlockSnake of snakeArray) {
        if (JSON.stringify(oneBlockSnake) === JSON.stringify(block)) {
            gameOver();
        }
    }
    // Pour empécher de sortir du canvas
    if (block[0] < 0 || block[1] < 0 || block[0] > (canvas.width / blockSize) || block[1] > (canvas.height / blockSize)) {
        gameOver();
    }

}




function gameOver() {
    clearInterval(interval);
    alert('Vous avez perdu, pfff trop nul');
    document.location.reload();
}


// Lancement du jeu au clique

button.addEventListener('click', () => {
    interval = setInterval(draw, 100);
});