/*
Ok here are the problems so the shaman is messed up so it doesnt spawn right it still needs the hurt boxes so it doesnt work rn 
but this should work where it goes to where past to where the hero was in a straight line and then blows up. Hopefully this works 
I made it so if its around it it blows up to but idk i am just puting stuff out there so i dont forget later

*/


const PROJECTILE_MOVING = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Projectile.png";
const PROJECTILE_EXPLODING = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Explosion.png";
const PROJECTILE_STATE = {
    MOVING: 0,
    EXPLODING: 1
};
class ProjectileShaman {
    constructor(game, x, y, tarX, tarY, hero) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.tarX = tarX;
        this.tarY = tarY;
        this.hero = hero;
        this.width = 128;
        this.height = 120;
        this.currentAction = PROJECTILE_STATE.MOVING;  
        this.animations = [];
        this.loadAnimations();
        // made a hit box just so we can do damage 
        this.hitbox = new HitBox(x, y, 64, 64);

        this.removeFromWorld = false;
    }
    // this should try to go towrds when the hero is 
    update() {
        var dist = this.distanceLine(this);
        var herodist = this.distance(this, this.hero);

        if ((dist < 50 || herodist < 50) && this.currentAction !== PROJECTILE_STATE.EXPLODING) {
            this.currentAction = PROJECTILE_STATE.EXPLODING;
            this.animations[this.currentAction].reset();
        }
        if (this.currentAction === PROJECTILE_STATE.MOVING) {
            // makes the hit box null so we dont hit other monsters 
            this.hitbox = null;
            this.velocity = {
                x: ((this.tarX - this.x) / dist) * 600 * this.game.clockTick,
                y: ((this.tarY - this.y) / dist) * 600 * this.game.clockTick
            };
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
        if (this.currentAction === PROJECTILE_STATE.EXPLODING) {
            // this just checks if the hit box is null so it doesnt ram 
            // into the other monsters and if it is null make a new one right quick
            // with dummy perams
            if (!this.hitbox) this.hitbox = new HitBox(0, 0, 64, 64);
            //this updates the hit box with its current location
            this.hitbox.update(this.x + this.width/2, this.y + this.height/2);
            if (this.hero.hurtbox && this.hitbox.collide(this.hero.hurtbox )) {
                let hpHero = this.hero.currentMaxHp() * .15;
                this.hero.register_hit(hpHero);
                this.hero.toggleIFrames();
            }
            if (this.animations[this.currentAction].currentFrame() === 8) {
                this.deleteEntity();
            }
        }
    }
    //the same as before
    distanceLine(entity1) {
        var dx = this.tarX - entity1.x;
        var dy = this.tarY - entity1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
     distance(entity1, entity2) {
        var dx = entity1.x - entity2.x;
        var dy = entity1.y - entity2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    draw(ctx) {
        this.animations[this.currentAction].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    
    getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(PROJECTILE_MOVING),
                frame_count: 3
            },
            {
                sheet: ASSET_MANAGER.getAsset(PROJECTILE_EXPLODING),
                frame_count: 9
            }
        ];
    }
    
    loadAnimations() {
        let spritesheets = this.getSpriteSheets();
        
        for (let i = 0; i < spritesheets.length; i++) {
            this.animations[i] = new Animator(
                spritesheets[i].sheet,
                0, 0,
                this.width, this.height,
                spritesheets[i].frame_count,
                FRAME_DURATION,
                false
            );
        }
    }
    
    deleteEntity() {
        this.removeFromWorld = true;
    }
}