class SceneManager {
    constructor(game) {
        this.debug = true;
        this.gameLaunched = false;
        this.game = game; this.background = new Background();
        this.mainMenu = new MainMenu(this.game, this);

        this.hero = null;

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


        this.enemies.push(new PaddleFish(this.game, 300, 70, this.hero, this.debug));

        this.enemies.push(new Minotaur(this.game, 100, 25, this.hero, this.debug));
        
        this.enemies.push(new Thief(this.game, 250, 50, this.hero, this.debug));
        this.enemies.push(new Lizard(this.game, 500, 20, this.hero, this.debug));
        
        // TODO: NOTE TO KEEP TROLL DISABLED TILL FURTHER NOTICE
        
        // this.enemies.push(new Troll(this.game, 500, 50, this.hero, this.debug));
        
        // TODO: NOTE TO KEEP SHAMAN DISABLED TILL FURTHER NOTICE

        // this.enemies.push(new Shaman(this.game, 400, 30, this.hero, this.debug));
    }
    
    loadLevel() {
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
