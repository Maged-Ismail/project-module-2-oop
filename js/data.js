
const GAME_WIDTH = 1200;
const GAME_HEIGHT = 550;

const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 75;
let MAX_ENEMIES = 6;

const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 75;


//New Variables
let playing = true;
appRoot=document.getElementById("app");
let lives = 3;
let cups = 0;

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

let levelUpSound = new Audio('./sounds/levelup2.mp3');
document.getElementById('app').appendChild(levelUpSound);

let incomingSound = new Audio('./sounds/incoming.mp3');
document.getElementById('app').appendChild(incomingSound);

let brewSound = new Audio('./sounds/brew2.mp3');
document.getElementById('app').appendChild(brewSound);

let drinkSound = new Audio('./sounds/drink.mp3');
document.getElementById('app').appendChild(drinkSound);

let lifeSound = new Audio('./sounds/newlife.mp3');
document.getElementById('app').appendChild(lifeSound);

//New Entity Class
class Entity {
    render(source, x, y, z) {
        this.domElement = document.createElement("img");
        this.domElement.src = source;
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${x}px`;
        this.domElement.style.top =` ${y}px`;
        this.domElement.style.zIndex = z;
        appRoot.appendChild(this.domElement);
    }
}

//New Bonus Class
class Bonus extends Entity {
    
    constructor(theRoot) {
        super();
        this.root = theRoot;
        this.taken = false;
        this.x = 60+ Math.round(Math.random()*(GAME_WIDTH-150));
        this.y = 60+ Math.round(Math.random()*(GAME_HEIGHT-150));
        let src= 'images/coffee.png';
        this.render(src, this.x, this.y, '3');

    }
    update(px,py){
        if ((this.x <= (px +85) && this.x >= (px)) && (this.y <= (py+85) && (this.y) >= (py))) {
            drinkSound.play();
            this.taken = true;
            px=0;
            py=0;
            this.domElement.style.left = '0';
            this.domElement.style.top = '0';
            this.domElement.style.display= 'none';
            cups ++;
            return;
            console.log(cups);
            // this.root.removeChild(this.domElement);
        }
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
        this.scoreBox.style.zIndex ='25';
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
        this.levelBox.style.color = 'darkred';
        this.levelBox.style.fontWeight= 'bold';
        this.levelBox.style.maxWidth = '250px';
        this.levelBox.style.overflow ='none';
        this.levelBox.style.zIndex ='25';
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
        this.livesSymb.style.zIndex= '25';
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
        this.livesBox.style.zIndex ='25';
        this.bonusSymb = document.createElement('img');
        this.bonusSymb.src = 'images/coffee.png';
        appRoot.appendChild(this.bonusSymb);
        this.bonusSymb.style.maxWidth='30px';
        this.bonusSymb.style.position = 'absolute';
        this.bonusSymb.style.top = '107.5px';
        this.bonusSymb.style.right= '150px';
        this.bonusSymb.style.zIndex= '25';
        this.bonusBox = document.createElement('div');
        this.bonusBox.innerText = `: ${cups}`;
        appRoot.appendChild(this.bonusBox);
        this.bonusBox.style.position = 'absolute';
        this.bonusBox.style.top = '105px';
        this.bonusBox.style.right= '78.5px';
        this.bonusBox.style.fontSize='2.5rem';
        this.bonusBox.style.color = 'white';
        this.bonusBox.style.opacity = '0.85';
        this.bonusBox.style.color = 'lightred';
        this.bonusBox.style.fontWeight= 'bold';
        this.bonusBox.style.maxWidth = '350px';
        this.bonusBox.style.overflow ='none';
        this.bonusBox.style.zIndex ='25';
    }
    updateLives() {
        this.livesBox.innerText = `: ${lives}`;
    }
    updateBonus() {
        this.bonusBox.innerText = `: ${cups}`;
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
        this.button.style.color= 'white';
        this.button.style.fontSize = '2rem';
        this.button.addEventListener('click', startF);
        this.title = document.createElement('h1');
        this.title.innerText = 'THE BOOTCAMP';
        this.page.appendChild(this.title);
        this.title.style.position = 'absolute';
        this.title.style.bottom = '120px';
        this.title.style.left= '180px';
        this.title.style.fontSize = '6.5rem';
        this.title.style.color= 'darkred';
        this.par = document.createElement('p');
        this.par.innerText = '\"Use the Arrow Keys to Survive \n12 Weeks of Endless Workshops.\n Coffee is your friend! Earn \nan Extra Life with Every 5 Cups.\"';
        this.page.appendChild(this.par);
        this.par.style.fontSize='1.05rem';
        this.par.style.position = 'absolute';
        this.par.style.top = '230px';
        this.par.style.left= '510px';
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
        this.title.style.bottom = '20px';
        this.title.style.left = '180px';
        this.button.innerText= 'RETRY';
        this.button.style.left = '505px';
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

