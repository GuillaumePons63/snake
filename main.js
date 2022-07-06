const canvas = document.getElementById('canvas');
const button = document.querySelector('button');

let dX = 10;
let dY = 10;
let ctx = canvas.getContext('2d');

function drawSnake(X, Y, longueur) {
    ctx.beginPath()
    ctx.fillStyle = 'rgb(0,215,90)';
    ctx.fillRect(X, Y, 10, longueur, 10);
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake(dX, dY, 80)
    dY++;

}

button.addEventListener('click', () => {
    setInterval(draw, 100)

});