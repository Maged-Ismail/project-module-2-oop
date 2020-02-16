
class Player extends Entity {
    constructor(root) {
        super();
        this.x = 7 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        let src= 'images/laptop2.png';
        this.render(src, this.x, this.y, '10');
    }
    moveLeft() {
        if (this.x > 0) {
            this.x = this.x - PLAYER_WIDTH;
        }
        this.domElement.style.left = `${this.x}px`;
    }
    moveRight() {
        if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
            this.x = this.x + PLAYER_WIDTH;
        }
        this.domElement.style.left = `${this.x}px`;
    }
    moveUp() {
        if (this.y > 80) {
            this.y = this.y - PLAYER_HEIGHT;
        }
        this.domElement.style.top = `${this.y}px`;
    }
    moveDown() {
        if ( this.y <= (GAME_HEIGHT - 2*PLAYER_HEIGHT)) {
            this.y = this.y + PLAYER_HEIGHT;
        }
        this.domElement.style.top = `${this.y}px`;
    }
    //Initialize Player Position
    initialize() {
        this.x = 7 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
    }
}

