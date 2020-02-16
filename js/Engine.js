
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
            this.life.update();
            MAX_ENEMIES = 5;
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
            lvlUpSound.play();
            // this.bonuses.push(new Bonus(appRoot));
        }
        // this.isBonusTaken();
        
        // More Ennemies every 2 weeks
        if (this.levelCount % 2 === 0) {
            MAX_ENEMIES ++;
            console.log(MAX_ENEMIES);
        }
        //Ennemies faster every 3 weeks
        if (this.levelCount % 3 === 0) {
            this.loop -= 2;
            console.log(this.loop);
        }

        if (this.levelCount === 13){
            playing = false;
            gameMusic.pause();
            completedSound.play();
            document.removeEventListener("keydown", keydownHandler);
            window.alert("Game Over");

        }
    }
        setTimeout(this.gameLoop, this.loop);  
    }

    isPlayerDead = () => {
        let dead = false;
        // let playerY= GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.enemies.forEach((enemyArr) => {
            
            if ((enemyArr.x +5 >= this.player.x && enemyArr.x +5 <= (this.player.x+PLAYER_WIDTH)) && ((enemyArr.y+ENEMY_HEIGHT +10 ) >= this.player.y && (enemyArr.y+ENEMY_HEIGHT +10)<= this.player.y+PLAYER_HEIGHT)){
                if (this.timeCounter % 5 === 0){
                    failSound.play();
                    lives = lives-1;
                    this.life.update();
                    this.player.initialize();
            }
        }
        });

        if (lives === 0){
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
