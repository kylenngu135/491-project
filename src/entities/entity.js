const DIR = {
    LEFT: 0,
    RIGHT: 1 
}

const FRAME_DURATION = 0.05;
const NUM_OF_DIR = 2;

class Entity {
    constructor(game, states, 
        startX, startY, 
        startWidth, startHeight, 
        destX, destY, 
        destWidth, destHeight, 
        spritesheets, activeFrames,
        hurtbox, hitbox, 
        hp, debug
    ) {
        Object.assign(this, 
            {
                game, states, 
                startX, startY, 
                startWidth, startHeight, 
                destX, destY, 
                destWidth, destHeight, 
                spritesheets, activeFrames,
                hurtbox, hitbox, 
                hp, debug
            }
        );

        this.game.entity = this;

        this.damage = 20;
        this.removeFromWorld = false;
        this.invulnerable = false;
        this.invulTimer = 0;

        // animations
        this.animations = [];
        this.loadAnimations();

        // default states
        this.velocity = {x: 0, y: 0};
        this.state = states.IDLE;
        this.dir = DIR.RIGHT;
        this.lasthurtbox = null;
    }

    loadAnimations() {
        let length = this.spritesheets.length;

        for (let i = 0; i < length; i++) {
            this.animations.push([]);
        }

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < NUM_OF_DIR; j++) {
                this.animations[i][j] = new Animator(
                    this.spritesheets[i].sheet, 
                    0, 0,
                    
                    // NOTE - EXPERIMENTAL
                    // this.startWidth / 2, this.startHeight / 2, 
                    this.startWidth, this.startHeight, 
                    this.spritesheets[i].frame_count, 
                    FRAME_DURATION, j === 0 
                );
            }
        }

    }

    draw(ctx) {
        this.animations[this.state][this.dir].drawFrame(this.game.clockTick, ctx, this.destX, this.destY);

        if (this.debug) {
            this.hurtbox.draw(ctx, this.dir);
            this.hitbox.draw(ctx, this.dir);
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.destX, this.destY, this.startWidth, this.startHeight);
        }
    }

    update() {
        this.updateHurtbox();
        this.updateHitbox();

        if (this.invulnerable) {

            this.invulTimer -= this.game.clockTick;
            if (this.invulTimer > 0.21) {
                this.destX -= this.velocity.x * 0.35;
                this.destY -= this.velocity.y * 0.35;
            }

            if (this.invulTimer <= 0) {
                this.invulTimer = 0;
                this.invulnerable = false;
            }
        }
    }

    updateState() {
        this.state = this.velocity.x != 0 || this.velocity.y != 0 ? this.states.RUN : this.states.IDLE;
    }

    updateDirection() {
        if (this.velocity.x < 0) {
            this.dir = DIR.LEFT;
        } else if (this.velocity.x > 0) {
            this.dir = DIR.RIGHT;
        }
    }

    updateVelocityX(dir) {
        this.velocity.x = 5 * (dir ? -1 : 1);
    }

    degradeVelocityX() {
        this.velocity.x = 0;
    }

    updateVelocityY(dir) {
        this.velocity.y = 5 * (dir ? -1 : 1);
    }

    degradeVelocityY() {
        this.velocity.y = 0;
    }

    updateHurtbox() {
        this.lastHurtbox = this.hurtbox;
        this.hurtbox = new HurtBox(this.destX + this.startWidth/2.4, this.destY + this.startHeight/2.4, this.hurtbox.width, this.hurtbox.height);
        // this.hitbox = new BoundingCircles(this.destX + (this.startWidth / 2), this.destY + (this.startHeight / 2), 42);
    }

    updateHitbox() {
        this.lastHitbox = this.hixbox;
        this.hitbox = new HitBox(this.destX - (this.dir == 0 ? 0: (-1 * this.startWidth/2)), this.destY + this.startHeight/5, this.startWidth/2, this.hitbox.height);
    }

    register_hit(hp_lost) {
        this.hp -= hp_lost;
    }

    isAlive() {
        return this.hp > 0;
    }

    deleteEntity() {
        this.removeFromWorld = true;
    }

    toggleIFrames() {
        this.invulnerable = true;
        this.invulTimer = 0.25;
    }
}
