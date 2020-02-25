
let gameEngine;
const keydownHandler = event => {
    playerMoveSound.play();

    if (event.key === "ArrowLeft") {
        gameEngine.player.moveLeft();
    }

    if (event.key === "ArrowRight") {
        gameEngine.player.moveRight();
    }
    //New Up & Down Movement
    if (event.key === "ArrowUp") {
        gameEngine.player.moveUp();
    }

    if (event.key === "ArrowDown") {
        gameEngine.player.moveDown();
    }
}

function startF() {
    starter.start();
}
function restartF() {
    starter.restart();
}

function startGame () {
    gameEngine = new Engine(appRoot);
    document.addEventListener("keydown", keydownHandler);
    gameEngine.gameLoop();
}

//THE GAME
const starter = new Start;