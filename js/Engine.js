
class Engine {

    constructor(theRoot) {
        this.root = theRoot;
        this.player = new Player(this.root);
        this.enemies = [];
        addBackground(this.root);

        this.bonuses =[];
        this.life = new Lives();
        this.score = new Score();
        this.scoreUp = 0;
        this.scoreInc = 1;
        this.timeCounter = 0;
        this.level = new Level();
        this.levelCount = 1;
        this.loop = 20;
        let i =0;
        
    }

    gameLoop = () => {
    if (playing === true){
        if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime();
        let timeDiff = (new Date).getTime() - this.lastFrame;
        this.lastFrame = (new Date).getTime();
        this.enemies.forEach(enemy => {
            enemy.update(timeDiff);
        });
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });
        while (this.enemies.length < MAX_ENEMIES) {
            const spot = nextEnemySpot(this.enemies);
            this.enemies.push(new Enemy(this.root, spot));
        }

        if (this.isPlayerDead()) {
            failSound.play();
            playing = false;
            gameMusic.pause();
            this.player.initialize();
            document.removeEventListener("keydown", keydownHandler);
            starter.restartPage();
            this.lastFrame = (new Date).getTime();
            this.timeCounter = 0;
            this.levelCount = 1;
            this.scoreUp = 0;
            lives = 3;
            cups = 0;
            // this.bonuses =[];
            this.life.updateLives();
            this.life.updateBonus();
            MAX_ENEMIES = 7;
            this.loop = 20;
            this.score.update(this.scoreUp);
            this.level.raise(Math.round(this.levelCount));
            // window.alert("Fail!");
            // document.removeEventListener("keydown", keydownHandler);
            // return;
        }

        this.timeCounter += 1;
        
        //Score Count
        if (this.timeCounter % 20 === 0 && this.timeCounter > 10){
        this.scoreUp +=  this.scoreInc;
        this.score.update(this.scoreUp);
        }

        //Week Count (level Up)
        if (this.scoreUp % 50 === 0 && this.scoreUp >1){
            this.levelCount += 0.05;
            // console.log(this.levelCount);
            this.level.raise(Math.round(this.levelCount));
            levelUpSound.play();
            if (this.timeCounter % 3 === 0 && this.timeCounter > 4){
                brewSound.play();
            this.bonuses.push(new Bonus(this.root));
            this.life.updateBonus();
            // console.log(this.bonuses);
            // console.log(this.enemies);
        }
    }

        //Bonus Array Check
        this.life.updateBonus();
        this.bonuses.forEach(bonus => {bonus.update(this.player.x, this.player.y);});
        this.bonuses = this.bonuses.filter(bonus => {
            return !bonus.taken;
        });

        //Extra Life
        if (cups === 5) {
            cups = 0;
            lives ++;
            lifeSound.play();
            this.life.updateLives();
            this.life.updateBonus();
        }
        
        
        // More Ennemies every 2 weeks
        if (this.scoreUp % 100 === 0) {
            if (this.timeCounter % 15 === 0 && this.timeCounter > 15){
                setTimeout(() => {
                    incomingSound.play();}, 500);
                MAX_ENEMIES ++;
                console.log(MAX_ENEMIES);
        }
    }
        //Ennemies faster every 3 weeks
        if (this.scoreUp % 150 === 0) {
            if (this.timeCounter % 15 === 0 && this.timeCounter > 15){
            this.loop -= 0.25;
            setTimeout(() => {
                warningSound.play();}, 300);
            console.log(this.loop);
        }
    }
        //Game Ends After 12 Weeks
        if (this.scoreUp > 600){
            playing = false;
            gameMusic.pause();
            completedSound.play();
            document.removeEventListener("keydown", keydownHandler);
            // window.alert("Game Over");
        }
    }
        setTimeout(this.gameLoop, this.loop);  
    }

    isPlayerDead = () => {
        let dead = false;
        // let playerY= GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.enemies.forEach((enemyArr) => {
            
            if ((enemyArr.x +5 >= this.player.x && enemyArr.x +5  <= (this.player.x+PLAYER_WIDTH)) && ((enemyArr.y+ENEMY_HEIGHT +10 ) >= this.player.y && (enemyArr.y+ENEMY_HEIGHT +10)<= this.player.y+PLAYER_HEIGHT)){
                if (this.timeCounter % 5 === 0){
                    failSound.play();
                    lives = lives-1;
                    this.life.updateLives();
                    this.player.initialize();
            }
        }
        });

        if (lives <= 0){
            goodbyeSound.play();
            dead = true;
    }
        return dead;
    }
}

//     isBonusTaken = () => {
//         // let drink = false;
        
//         this.bonuses.forEach((bonusElem) => {
//             if ((bonusElem.x <= (this.player.x +37.5) && (bonusElem.x+37.5) >= (this.player.x +37.5)) && (bonusElem.y <= (this.player.y+37.5) && (bonusElem.y+37.5) >= (this.player.y+37.5))) {
//                 console.log("Bonus");                
//                 bonusElem.remove();
//                 // let bonusElemClass = document.getElementById('bonus');
//                 // appRoot.removeChild(bonusElemClass);
//                 // drink = true;
//             }
//         });
//         // return drink;
//     }
// }
