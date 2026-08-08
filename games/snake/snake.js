import {
    applyTranslations,
    getLanguage,
    getNextLanguage,
    setLanguage
} from "../../shared/i18n.js";


const BOARD_SIZE = 500;
const GRID_SIZE = 20;
const CELL_SIZE = BOARD_SIZE / GRID_SIZE;

const INITIAL_MOVE_INTERVAL = 180;


const GAME_STATE = {
    READY: "ready",
    PLAYING: "playing",
    PAUSED: "paused",
    GAME_OVER: "game-over"
};


const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};


const translations = {
    en: {
        backToArcade: "Back to OzArcade",
        score: "Score",
        highScore: "High Score",
        boardReady: "Game board ready",
        start: "Start",
        pause: "Pause",
        resume: "Resume",
        gameOver: "Game Over",
        playAgain: "Play Again",
        restartHint:
            "Press Play Again to start a new game.",
        controls: "Controls",
        moveUp: "Move Up",
        moveDown: "Move Down",
        moveLeft: "Move Left",
        moveRight: "Move Right",
        or: "or",
        controlsNote:
            "Collect food, grow and avoid colliding with the walls or your own body.",
        changeLanguage:
            "Change language to Spanish",
        canvasLabel:
            "Snake game board"
    },

    es: {
        backToArcade: "Volver a OzArcade",
        score: "Puntuación",
        highScore: "Récord",
        boardReady: "Tablero listo",
        start: "Iniciar",
        pause: "Pausa",
        resume: "Continuar",
        gameOver: "Fin del juego",
        playAgain: "Jugar de nuevo",
        restartHint:
            "Pulsa Jugar de nuevo para iniciar una nueva partida.",
        controls: "Controles",
        moveUp: "Arriba",
        moveDown: "Abajo",
        moveLeft: "Izquierda",
        moveRight: "Derecha",
        or: "o",
        controlsNote:
            "Recoge comida, crece y evita chocar contra las paredes o contra tu propio cuerpo.",
        changeLanguage:
            "Cambiar idioma a inglés",
        canvasLabel:
            "Tablero del juego Snake"
    }
};


const canvas =
    document.querySelector("#game-canvas");

const context =
    canvas.getContext("2d");

const languageButton =
    document.querySelector("#language-toggle");

const startButton =
    document.querySelector("#start-button");

const pauseButton =
    document.querySelector("#pause-button");

const gameMessage =
    document.querySelector("#game-message");

const gameMessageTitle =
    gameMessage.querySelector("p");

const gameMessageText =
    gameMessage.querySelector("span");


let currentLanguage = getLanguage();

let gameState = GAME_STATE.READY;

let snake = [];

let direction = DIRECTIONS.RIGHT;
let nextDirection = DIRECTIONS.RIGHT;

let lastMoveTime = 0;
let animationFrameId = null;


function createInitialSnake() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = DIRECTIONS.RIGHT;
    nextDirection = DIRECTIONS.RIGHT;
}


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

    for (
        let position = 0;
        position <= BOARD_SIZE;
        position += CELL_SIZE
    ) {
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


function drawSnake() {
    snake.forEach((segment, index) => {
        context.fillStyle =
            index === 0
                ? "#62e6a7"
                : "#3dbf86";

        context.fillRect(
            segment.x * CELL_SIZE + 2,
            segment.y * CELL_SIZE + 2,
            CELL_SIZE - 4,
            CELL_SIZE - 4
        );
    });
}


function renderGame() {
    drawBoard();
    drawSnake();
}


function hasWallCollision(position) {
    return (
        position.x < 0 ||
        position.x >= GRID_SIZE ||
        position.y < 0 ||
        position.y >= GRID_SIZE
    );
}


function hasSelfCollision(position) {
    return snake
        .slice(0, -1)
        .some((segment) => {
            return (
                segment.x === position.x &&
                segment.y === position.y
            );
        });
}


function endGame() {
    gameState = GAME_STATE.GAME_OVER;

    animationFrameId = null;

    pauseButton.disabled = true;

    startButton.disabled = false;

    startButton.textContent =
        translations[currentLanguage].playAgain;

    gameMessageTitle.textContent =
        translations[currentLanguage].gameOver;

    gameMessageText.textContent =
        translations[currentLanguage].restartHint;

    gameMessage.classList.remove("hidden");
}


function moveSnake() {
    direction = nextDirection;

    const head = snake[0];

    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
    };

    if (
        hasWallCollision(newHead) ||
        hasSelfCollision(newHead)
    ) {
        endGame();
        return;
    }

    snake.unshift(newHead);
    snake.pop();
}


function gameLoop(timestamp) {
    if (gameState !== GAME_STATE.PLAYING) {
        animationFrameId = null;
        return;
    }

    const elapsedTime =
        timestamp - lastMoveTime;

    if (elapsedTime >= INITIAL_MOVE_INTERVAL) {
        moveSnake();
        renderGame();

        lastMoveTime = timestamp;
    }

    if (gameState !== GAME_STATE.PLAYING) {
        animationFrameId = null;
        return;
    }

    animationFrameId =
        requestAnimationFrame(gameLoop);
}


function startGame() {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    createInitialSnake();

    gameState = GAME_STATE.PLAYING;

    gameMessageTitle.textContent = "Snake";

    gameMessageText.textContent =
        translations[currentLanguage].boardReady;

    gameMessage.classList.add("hidden");

    startButton.disabled = true;

    startButton.textContent =
        translations[currentLanguage].start;

    pauseButton.disabled = false;

    pauseButton.textContent =
        translations[currentLanguage].pause;

    lastMoveTime = performance.now();

    renderGame();

    animationFrameId =
        requestAnimationFrame(gameLoop);
}


function pauseGame() {
    if (gameState === GAME_STATE.PLAYING) {
        gameState = GAME_STATE.PAUSED;

        pauseButton.textContent =
            translations[currentLanguage].resume;

        return;
    }

    if (gameState === GAME_STATE.PAUSED) {
        gameState = GAME_STATE.PLAYING;

        pauseButton.textContent =
            translations[currentLanguage].pause;

        lastMoveTime = performance.now();

        if (animationFrameId === null) {
            animationFrameId =
                requestAnimationFrame(gameLoop);
        }
    }
}


function isOppositeDirection(newDirection) {
    return (
        newDirection.x === -direction.x &&
        newDirection.y === -direction.y
    );
}


function changeDirection(newDirection) {
    if (gameState !== GAME_STATE.PLAYING) {
        return;
    }

    if (isOppositeDirection(newDirection)) {
        return;
    }

    nextDirection = newDirection;
}


function handleKeyDown(event) {
    const key = event.key.toLowerCase();

    const directionKeys = [
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        "w",
        "a",
        "s",
        "d"
    ];

    if (directionKeys.includes(key)) {
        event.preventDefault();
    }

    switch (key) {
        case "arrowup":
        case "w":
            changeDirection(DIRECTIONS.UP);
            break;

        case "arrowdown":
        case "s":
            changeDirection(DIRECTIONS.DOWN);
            break;

        case "arrowleft":
        case "a":
            changeDirection(DIRECTIONS.LEFT);
            break;

        case "arrowright":
        case "d":
            changeDirection(DIRECTIONS.RIGHT);
            break;

        case "p":
            pauseGame();
            break;
    }
}


function updateLanguage() {
    applyTranslations(
        translations,
        currentLanguage
    );

    languageButton.textContent =
        currentLanguage === "en"
            ? "ES"
            : "EN";

    languageButton.setAttribute(
        "aria-label",
        translations[currentLanguage].changeLanguage
    );

    canvas.setAttribute(
        "aria-label",
        translations[currentLanguage].canvasLabel
    );

    if (gameState === GAME_STATE.PAUSED) {
        pauseButton.textContent =
            translations[currentLanguage].resume;
    }

    if (gameState === GAME_STATE.GAME_OVER) {
        startButton.textContent =
            translations[currentLanguage].playAgain;

        gameMessageTitle.textContent =
            translations[currentLanguage].gameOver;

        gameMessageText.textContent =
            translations[currentLanguage].restartHint;
    }
}


function changeLanguage() {
    currentLanguage =
        getNextLanguage(currentLanguage);

    setLanguage(currentLanguage);

    updateLanguage();
}


startButton.addEventListener(
    "click",
    startGame
);

pauseButton.addEventListener(
    "click",
    pauseGame
);

languageButton.addEventListener(
    "click",
    changeLanguage
);

document.addEventListener(
    "keydown",
    handleKeyDown
);


createInitialSnake();
renderGame();
updateLanguage();