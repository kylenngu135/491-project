const spawnInt = 15;
class SceneManager {
    constructor(game) {
        this.debug = false; // Set to true to see debug info
        this.gameLaunched = false;
        this.game = game; 
        this.background = new Background();
        this.mainMenu = new MainMenu(this.game, this);
        this.displayTime = null;
        this.maxMobs = 100;
        this.maxMiniBoss = 4;
        this.miniBossIdx = 0;
        this.lastSpawnTime = 0;

        //camera properties
        this.camera = {
            x: 0,
            y: 0,
            width: 800,  // Match canvas width
            height: 600, // Match canvas height
            // World bounds - the area the camera can move within
            bounds: {
                minX: 0,
                maxX: 5000, // Match your background size
                minY: 0,
                maxY: 5000,
                width: 5000,
                height: 5000
            }
        };
                
        this.hero = null;
        this.allowed_enemies = ['paddlefish', 'lizard', 'thief'];
        this.allowed_mini_bosses = ['minotaur'];
        this.allowed_bosses = ['troll'];
        this.enemies = [];
    }

    init() {
        this.game.addEntity(this.mainMenu);
    }

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


        this.spawn_mobs();
        this.lastSpawnTime = 0;

        // TODO: NOTE TO KEEP TROLL DISABLED TILL FURTHER NOTICE
        
        // this.enemies.push(new Troll(this.game, 500, 50, this.hero, this.debug));
        
        // TODO: NOTE TO KEEP SHAMAN DISABLED TILL FURTHER NOTICE
        
        // this.enemies.push(new Shaman(this.game, 400, 30, this.hero, this.debug));

        this.updateCamera();
    }
    
    // this will select random mob to spawn and call spawn enemy, it should be called every 15 seconds
    spawn_mobs() {        
        for (let i = 0; i < 3; i++) {
            let enemy = this.allowed_enemies[Math.floor(Math.random() * 3)];
            this.spawn_enemy(this.generate_spawn_location(), enemy);
        }
    }

    // // this will select the miniboss based on order to be spawned
    // spawn_boss() {
    //     if (this.displayTime.minute >= 1) {                           
    //         let enemy = this.allowed_mini_bosses[this.miniBossIdx];
    //         this.miniBossIdx++;
    //         this.spawn_enemy(this.generate_spawn_location(), enemy);
    //     }
    // }

    generate_spawn_location() {
        return {
            x: (Math.floor(Math.random() * this.game.ctx.canvas.width)),
            y: (Math.floor(Math.random() * this.game.ctx.canvas.height))
        }
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
            default:
                newEnemy = new PaddleFish(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug);
        }

        this.enemies.push(newEnemy);
        if (this.gameLaunched) {            
            this.game.entities.splice(this.game.entities.length - 1, 0, newEnemy);
        }
    }


    updateCamera() {
        if (this.hero) {
            // Always center camera on hero - no clamping
            this.camera.x = this.hero.x - this.camera.width / 2.8;
            this.camera.y = this.hero.y - this.camera.height / 3.3;
            
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

        // Spawn mobs
        // let elapsedSec = this.displayTime.seconds;
        let elapSec = Math.floor(this.displayTime.elapsedTime / 1000);        
        if (elapSec >= this.lastSpawnTime + spawnInt) {
            this.lastSpawnTime = elapSec;
            this.spawn_mobs();
            console.log("spawning");
        }

        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            let enemy_ani = enemy.animations[enemy.state][enemy.dir];

            if (hitbox.collide(enemy.hurtbox) && 
                activeFrames.includes(animation.currentFrame()) && 
                hero.isAttacking
            ) {
                if (!enemy.invulnerable) {
                    enemy.register_hit(hero.damage);
                    enemy.toggleIFrames();
                    if (!enemy.isAlive()) {
                        enemy.deleteEntity();
                        this.enemies.splice(i, 1);
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
                    if (!hero.isAlive()) {
                        hero.deleteEntity();
                    }
                } 
            }
        }

        this.updateCamera();
        this.updateAudio();
    }
}