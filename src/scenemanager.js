const spawnInt = 10;
const bossSpawnInt = 180;
const SPAWN_RATE = {
    paddlefish: 20,
    lizard: 20,
    thief: 20,
    shaman: 1
};

class SceneManager {
    constructor(game) {
        this.debug = false; // Set to true to see debug info
        this.gameLaunched = false;
        this.game = game; 
        this.game.sceneManager = this;
        this.background = new Background(this.game);
        this.mainMenu = new MainMenu(this.game, this);
        this.displayTime = null;
        this.hud = null;
        this.maxMobs = 100;
        this.maxMiniBoss = 3;
        this.miniBossIdx = 0;
        this.lastSpawnTime = 0;
        this.lastBossSpawn = 0;
        
        this.canvas = document.getElementById("gameWorld");

        //camera properties
        this.camera = {
            x: 0,
            y: 0,
            width: this.canvas.width*1.25,  // Match canvas width
            height: this.canvas.height*1.25, // Match canvas height
            // World bounds - the area the camera can move within
            bounds: {
                width: 5000,
                height: 5000
            }
        };
                
        this.hero = null;
        this.allowed_enemies = ['paddlefish', 'lizard', 'thief', 'shaman'];
        this.allowed_mini_bosses = ['minotaur','shaman', 'minotaur', 'minotaur'];
        this.allowed_bosses = ['troll'];
        this.enemies = [];
    }

    init() {}

    initGame(charType) {
        this.displayTime = new DisplayTimer(this.game, this.camera);
        this.displayTime.startTimer();

        // Start hero in the middle of the world
        const startX = this.camera.bounds.width / 2;
        const startY = this.camera.bounds.height / 2;

        switch (charType) {
            case 'warrior':
                this.hero = new Warrior(this.game, this.background.width/2, this.background.height/2, this.debug);
                break;
            case 'lancer':
                this.hero = new Lancer(this.game, this.background.width/2, this.background.height/2, this.debug);
                break;
            default:
                this.hero = new Lancer(this.game, this.background.width/2, this.background.height/2, this.debug);
        }

        //make the hud 
        this.hud = new HUD(this.game, this.camera, this.hero);

        //the hud
        this.hud = new HUD(this.game, this.camera, this.hero);
        this.spawn_mobs();

        this.lastSpawnTime = 0;

        // TODO: NOTE TO KEEP TROLL DISABLED TILL FURTHER NOTICE
        
        // this.enemies.push(new Troll(this.game, 500, 50, this.hero, this.debug));
        
        this.updateCamera();
    }
    
    // this will select random mob to spawn and call spawn enemy, it should be called every 15 seconds
    spawn_mobs() {        
        for (let i = 0; i < 6; i++) {
            let enemy = this.weighted_random_enemy();
            this.spawn_enemy(this.generate_spawn_location(), enemy);
        }
    }

    // this will select the miniboss based on order to be spawned
    spawn_boss() {
        let enemy = this.allowed_mini_bosses[this.miniBossIdx];
        this.miniBossIdx++;
        this.spawn_enemy(this.generate_spawn_location(), enemy);
    }

    // slecect the enemies based on the 
    weighted_random_enemy() {
        let totalWeight = 0;
        // this find the sum off all enemies spawn rate
        for (let i =0; i < this.allowed_enemies.length; i++) {
            totalWeight +=  SPAWN_RATE[this.allowed_enemies[i]];
        }
                
        let roll = Math.random() * totalWeight;
        // this rolls a random number and substracts the weight of a given enemy and returns if the result is <= 0
        for (const type of this.allowed_enemies) {
            roll -= SPAWN_RATE[type];
            if (roll <= 0) return type;
        }
        return this.allowed_enemies[this.allowed_enemies.length - 1];
    }
    
    generate_spawn_location(minDistance = 500, maxDistance = 700) {
        let x, y;
        let valid = false;
        const offset = 20; // this is because some of them spawn right on the edge

        while (!valid) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (maxDistance - minDistance) + minDistance;

            x = (this.hero.x + Math.cos(angle) * distance);
            y = (this.hero.y + Math.sin(angle) * distance);

            valid = (x > 0 && x < this.background.width - offset && y > 0 && y < this.background.height - offset);
        }
    
        return {x, y}
    }

    spawn_enemy(spawn_coord, enemy) {
        let newEnemy = null;
        switch(enemy) {
            case 'paddlefish':
                newEnemy = new PaddleFish(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug);
                break;
            case 'lizard':
                newEnemy = new Lizard(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug);
                break;
            case 'thief':
                newEnemy = new Thief(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug);
                break;
            case 'minotaur':
                newEnemy = new Minotaur(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug);
                break;
            case 'shaman':
                newEnemy = new Shaman(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug);
                break;
            default:
                newEnemy = new PaddleFish(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug);
        }

        this.enemies.push(newEnemy);
        console.log(spawn_coord);

        if (this.gameLaunched) {            
            this.game.entities.splice(this.game.entities.length - 1, 0, newEnemy);
        } 
    }


    updateCamera() {
        if (this.hero) {
            this.camera.width = this.canvas.width;
            this.camera.height = this.canvas.height;

            // Always center camera on hero - no clamping
            this.camera.x = this.hero.x - this.camera.width / 2 + this.hero.width / 2;
            this.camera.y = this.hero.y - this.camera.height / 2 + this.hero.height / 2;
            
            if (this.debug) {
                // debug pos
                console.log(`Hero pos: (${Math.floor(this.hero.x)}, ${Math.floor(this.hero.y)}), Camera: (${Math.floor(this.camera.x)}, ${Math.floor(this.camera.y)})`);
            }
        }
    }

    // Get world bounds for collision detection
    getWorldBounds() {
        return this.camera.bounds;
    }

    // Helper method to convert world coordinates to screen coordinates
    worldToScreen(x, y) {
        return {
            x: x - this.camera.x,
            y: y - this.camera.y
        };
    }
    
    // Helper method to convert screen coordinates to world coordinates
    screenToWorld(x, y) {
        return {
            x: x + this.camera.x,
            y: y + this.camera.y
        };
    }
    
    // Method to check if an entity is in the camera view
    isInView(x, y, width, height) {
        return x + width > this.camera.x && 
               x < this.camera.x + this.camera.width &&
               y + height > this.camera.y && 
               y < this.camera.y + this.camera.height;
    }
    
    loadLevel() {
        this.game.addEntity(this.displayTime);
        this.game.addEntity(this.hud);
        this.game.addEntity(this.hero);

        for (let i = 0; i < this.enemies.length; i++) {
            this.game.addEntity(this.enemies[i]);
        }

        this.game.addEntity(this.background);
    }
    
    draw(ctx) {
        // Draw UI elements (like main menu) without camera transformation
        if (this.mainMenu.active || this.mainMenu.charSelect.isActive()) {
            this.mainMenu.draw(ctx);
        }
    }
    //updates the audio for the game for rn
    updateAudio(){
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    }

    update() {
        let hero = this.hero;
        let hitbox = hero.hitbox;
        let hurtbox = hero.hurtbox;
        let activeFrames = hero.activeFrames;
        let animation = hero.animations[hero.state][hero.dir];
        let elapSec = Math.floor(this.displayTime.elapsedTime / 1000);

        this.mainMenu.update();
        if(this.mainMenu.active) {
            return;
        }



        if (elapSec >= this.lastBossSpawn + bossSpawnInt && this.miniBossIdx < this.maxMiniBoss) {
            this.lastBossSpawn = elapSec;
            this.spawn_boss();
            if (this.debug) {
                console.log("spawning miniBoss", elapSec);
            }
        } else if (elapSec >= this.lastSpawnTime + spawnInt) {
            this.lastSpawnTime = elapSec;
            this.spawn_mobs();
            
            if (this.debug) {
                console.log("spawning", elapSec);
            }
        }

        for (let i = 0; i < this.enemies.length; i++) {

            let enemy = this.enemies[i];

            let enemy_ani = enemy.animations[enemy.state][enemy.dir];

            if (hitbox.collide(enemy.hurtbox) && 
                activeFrames.includes(animation.currentFrame()) && 
                hero.isAttacking
            ) {
                if (!enemy.invulnerable) {
                    console.log("HIT ENEMY");
                    enemy.register_hit(hero.damage);
                    enemy.toggleIFrames();
                    if (!enemy.isAlive()) {
                        // this is spawning the coin cant see it tho
                        this.spawnCoin(enemy.x, enemy.y, enemy.coinValue, enemy.target);

                        enemy.deleteEntity();
                        this.enemies.splice(i, 1);
                        if (enemy instanceof Minotaur) {
                            console.log("Minotaur Has Been Killed");
                            this.mainMenu.createWinMenu();
                        }
                    }
                } 
            }

            if (enemy.hitbox.collide(hurtbox) &&
                enemy.activeFrames.includes(enemy_ani.currentFrame()) &&
                enemy.currentAction == enemy.attackState.ATTACK
            ) {
                if (!hero.invulnerable) {
                    hero.register_hit(enemy.damage);
                    console.log("HIT");
                    hero.toggleIFrames();
                    
                } 
            }
        }
        // I (geo) moved this to here bc my projectiles werent killing bro so i looked and saw we 
        // were only checking if he is dead if bro got hit with a melee dude and i was like let me move old boy 
        // out here because i feel like we should always check if bro is dead but other than that if its wrong 
        // you guys can change ig
        if (!hero.isAlive()) {
            hero.deleteEntity();
            this.mainMenu.createDeathMenu();
            if (this.diplayTime) {
                this.displayTime.stopTimer();
                }
        }
        this.updateCamera();
        this.updateAudio();
    }
    // simple coin spawn checking if it is spawned which it is just cant see it
    spawnCoin(x, y, value, target) {
        const coin = new Coin(this.game, x, y, target, value);
        // this.game.addEntity(coin);
        
        this.game.entities.splice(this.game.entities.length - 2, 0, coin);
        console.log(`Coin spawned at (${x.toFixed(1)}, ${y.toFixed(1)})`);
        return coin;
    }
    spawnFireBall(x, y, tarX, tarY){
    
        const projectileShaman = new ProjectileShaman(this.game, x, y, tarX, tarY, this.hero);
        this.game.entities.splice(this.game.entities.length - 2, 0, projectileShaman);
    }

}
