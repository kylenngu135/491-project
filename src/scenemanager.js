class SceneManager {
    constructor(game) {
        this.debug = false;
        this.gameLaunched = false;
        this.game = game; this.background = new Background();
        this.mainMenu = new MainMenu(this.game, this);
        this.displayTime = new DisplayTimer(this.game);
                
        this.hero = null;
        this.allowed_enemies = ['paddlefish', 'lizard', 'thief', 'minotaur'];
        this.enemies = [];
    }

    init() {
        this.game.addEntity(this.mainMenu);
    }

    initGame(charType) {
        switch (charType) {
            case 'warrior':
                this.hero = new Warrior(this.game, 0, 0, new HurtBox(0, 0, 30, 30),  new HitBox(0, 0, 50, 100), this.debug);
                break;
            case 'lancer':
                this.hero = new Lancer(this.game, 0, 0, new HurtBox(0, 0, 30, 30), new HitBox(0, 0, 30, 30), this.debug);
                break;
            default:
                this.hero = new Lancer(this.game, 0, 0, new HurtBox(0, 0, 30, 30), new HitBox(0, 0, 30, 30), this.debug);
        }

        for (let i = 0; i < 3; i++) {
            this.spawn_enemy(this.generate_spawn_location());
        }
        
        // TODO: NOTE TO KEEP TROLL DISABLED TILL FURTHER NOTICE
        
        // this.enemies.push(new Troll(this.game, 500, 50, this.hero, this.debug));
        
        // TODO: NOTE TO KEEP SHAMAN DISABLED TILL FURTHER NOTICE

        // this.enemies.push(new Shaman(this.game, 400, 30, this.hero, this.debug));
    }

    generate_spawn_location() {
        return {
            x: (Math.floor(Math.random() * this.game.ctx.canvas.width)),
            y: (Math.floor(Math.random() * this.game.ctx.canvas.height))
        }
    }

    spawn_enemy(spawn_coord) {
        let enemy = this.allowed_enemies[Math.floor(Math.random() * 4)];

        switch(enemy) {
            case 'paddlefish':
                this.enemies.push(new PaddleFish(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug));
                break;
            case 'lizard':
                this.enemies.push(new Lizard(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug));
                break;
            case 'thief':
                this.enemies.push(new Thief(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug));
                break;
            case 'minotaur':
                this.enemies.push(new Minotaur(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug));
                break;
            default:
                this.enemies.push(new PaddleFish(this.game, spawn_coord.x, spawn_coord.y, this.hero, this.debug));
        }
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

        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];

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

            let enemy_ani = enemy.animations[enemy.state][enemy.dir];

            if (enemy.hitbox.collide(hurtbox) &&
                enemy.activeFrames.includes(enemy_ani.currentFrame()) &&
                enemy.currentAction == enemy.attackState.ATTACK
            ) {
                if (!hero.invulnerable) {
                    hero.register_hit(enemy.damage);
                    hero.toggleIFrames();
                    if (!hero.isAlive()) {
                        hero.deleteEntity();
                    }
                } 
            }
        }
    }
}
