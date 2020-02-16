
const GAME_WIDTH = 1200;
const GAME_HEIGHT = 550;

const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 75;
let MAX_ENEMIES = 7;

const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 75;


//New Variables
let playing = true;
appRoot=document.getElementById("app");
let lives = 3;

////New Sounds
let gameMusic = new Audio('./sounds/wreck1.mp3');
document.getElementById('app').appendChild(gameMusic);
gameMusic.loop=true;

let playerMoveSound = new Audio('./sounds/pmove.mp3');
document.getElementById('app').appendChild(playerMoveSound);

let lvlUpSound = new Audio('./sounds/levelup.mp3');
document.getElementById('app').appendChild(lvlUpSound);

let failSound = new Audio('./sounds/fail.mp3');
document.getElementById('app').appendChild(failSound);

let completedSound = new Audio('./sounds/completed.mp3');
document.getElementById('app').appendChild(completedSound);

let welcomeSound = new Audio('./sounds/welcome.mp3');
document.getElementById('app').appendChild(welcomeSound);

let warningSound = new Audio('./sounds/warning.mp3');
document.getElementById('app').appendChild(warningSound);

let goodbyeSound = new Audio('./sounds/goodbye.mp3');
document.getElementById('app').appendChild(goodbyeSound);

//New Entity Class
class Entity {
    render(source, x, y, z) {
        this.domElement = document.createElement("img");
        this.domElement.src = source;
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${x}px`;
        this.domElement.style.top =` ${y}px`;
        this.domElement.style.zIndex = z;
        document.getElementById('app').appendChild(this.domElement);
    }
}

//New Bonus Class
class Bonus extends Entity {
    
    constructor(root) {
        super();
        this.x = Math.round(Math.random()*(GAME_WIDTH-10));
        this.y = Math.round(Math.random()*(GAME_HEIGHT-10));
        let src= 'images/coffee.png';
        this.render(src, this.x, this.y, '3');
        // this.domElement.id = 'bonus';
    }
    remove(){
        appRoot.removeChild(this.domElement);
    }
}

//New Score Class
class Score {
    constructor () {
        this.scoreBox = document.createElement('div');
        this.scoreBox.innerText = 'Score: 0';
        appRoot.appendChild(this.scoreBox);
        this.scoreBox.style.position = 'absolute';
        this.scoreBox.style.top = '50px';
        this.scoreBox.style.left= '80px';
        this.scoreBox.style.fontSize='3rem';
        this.scoreBox.style.color = 'white';
        this.scoreBox.style.opacity = '0.85';
        this.scoreBox.style.color = 'lightred';
        this.scoreBox.style.fontWeight= 'bold';
        this.scoreBox.style.maxWidth = '350px';
        this.scoreBox.style.overflow ='none';
    }
    update(score) {
        this.scoreBox.innerText = `Score: ${score}`;
    }
}

//New Level Class
class Level {
    constructor () {
        this.levelBox = document.createElement('div');
        this.levelBox.innerText = 'Week 1';
        appRoot.appendChild(this.levelBox);
        this.levelBox.style.position = 'absolute';
        this.levelBox.style.top = '150px';
        this.levelBox.style.left= '455px';
        this.levelBox.style.fontSize='3.5rem';
        this.levelBox.style.opacity = '0.75';
        this.levelBox.style.color = 'red';
        this.levelBox.style.fontWeight= 'bold';
        this.levelBox.style.maxWidth = '250px';
        this.levelBox.style.overflow ='none';
    }
    raise(lvl) {
        this.levelBox.innerText = `Week ${lvl}`;
    }
}

//New Lives Class
class Lives {
    constructor () {
        this.livesSymb = document.createElement('img');
        this.livesSymb.src = 'images/laptop2.png';
        appRoot.appendChild(this.livesSymb);
        this.livesSymb.style.maxWidth='50px';
        this.livesSymb.style.position = 'absolute';
        this.livesSymb.style.top = '57.5px';
        this.livesSymb.style.right= '145px';
        this.livesBox = document.createElement('div');
        this.livesBox.innerText = `: ${lives}`;
        appRoot.appendChild(this.livesBox);
        this.livesBox.style.position = 'absolute';
        this.livesBox.style.top = '50px';
        this.livesBox.style.right= '80px';
        this.livesBox.style.fontSize='3rem';
        this.livesBox.style.color = 'white';
        this.livesBox.style.opacity = '0.85';
        this.livesBox.style.color = 'lightred';
        this.livesBox.style.fontWeight= 'bold';
        this.livesBox.style.maxWidth = '350px';
        this.livesBox.style.overflow ='none';
    }
    update() {
        this.livesBox.innerText = `: ${lives}`;
    }
}

//New Start & Restart Class
class Start {
    constructor () {
        this.page = document.createElement('div');
        appRoot.appendChild(this.page);
        this.page.style.height = `${GAME_HEIGHT}px`;
        this.page.style.width = `${GAME_WIDTH}px`;
        this.page.style.fontFamily = 'Josefin Sans, sans-serif'
        this.backG = document.createElement('img');
        this.page.appendChild(this.backG);
        this.backG.src = 'images/classroom2.png';
        this.page.style.display = 'cover';
        this.button = document.createElement('button');
        this.button.innerText='Click \n to Start';
        this.page.appendChild(this.button);
        this.button.style.position = 'absolute';
        this.button.style.cursor = 'pointer';
        this.button.style.top = '60px';
        this.button.style.left= '510px';
        this.button.style.padding= '25px 50px';
        this.button.style.backgroundColor= 'grey';
        this.button.style.border = '5px solid black'
        this.button.style.color= 'gold';
        this.button.style.fontSize = '2rem';
        this.button.addEventListener('click', startF);
        this.title = document.createElement('h1');
        this.title.innerText = 'THE BOOTCAMP';
        this.page.appendChild(this.title);
        this.title.style.position = 'absolute';
        this.title.style.bottom = '75px';
        this.title.style.left= '200px';
        this.title.style.fontSize = '6.5rem';
        this.title.style.color= 'red';
        this.par = document.createElement('p');
        this.par.innerText = '\"Use the Arrow Keys to Survive \n12 Weeks of Endless Workshops\"';
        this.page.appendChild(this.par);
        this.par.style.fontSize='1.85rem';
        this.par.style.position = 'absolute';
        this.par.style.top = '220px';
        this.par.style.left= '400px';
        this.par.style.color = 'black';
        this.par.style.fontStyle = 'italic';
    }

    start() {
        gameMusic.currentTime=0;
        this.button.removeEventListener('click', startF);
        this.page.style.display = 'none';
        welcomeSound.play();
        gameMusic.play();
        startGame();
    }
    restartPage(){
        this.page.style.display = 'block';
        this.page.style.position ='absolute';
        this.page.style.top = '0';
        this.page.style.zIndex = '500';
        this.title.innerText = 'YOU FAILED!!!';
        this.title.style.bottom = '50px';
        this.title.style.left = '250px';
        this.button.innerText= 'RESTART';
        this.button.style.left = '495px';
        this.par.style.display = 'none';
        this.button.addEventListener('click', restartF);
    }
    restart(){
        this.button.removeEventListener('click', this.restartF);
        playing = true;
        document.addEventListener('keydown', keydownHandler);
        this.page.style.display = 'none';
        gameMusic.currentTime=0;
        gameMusic.play();
    }
}

