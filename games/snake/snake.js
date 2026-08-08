const BOARD_SIZE = 500;
const GRID_SIZE = 20;
const CELL_SIZE = BOARD_SIZE / GRID_SIZE;

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");

function drawBoard() {
    context.fillStyle = "#080b10";

    context.fillRect(
        0,
        0,
        BOARD_SIZE,
        BOARD_SIZE
    );

    context.strokeStyle = "#151b27";
    context.lineWidth = 1;

    for (let position = 0; position <= BOARD_SIZE; position += CELL_SIZE) {
        context.beginPath();

        context.moveTo(position, 0);
        context.lineTo(position, BOARD_SIZE);

        context.stroke();

        context.beginPath();

        context.moveTo(0, position);
        context.lineTo(BOARD_SIZE, position);

        context.stroke();
    }
}

drawBoard();