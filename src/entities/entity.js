const DIR = {
    LEFT: 0,
    RIGHT: 1 
}

const FRAME_DURATION = 0.05;
const NUM_OF_DIR = 2;

class Entity {
    constructor(
        game, states, 
        x, y,
        width, height, 
        spritesheets, activeFrames,
        hurtbox, hitbox, 
        hp, hitboxOffset,
        debug
    ) {
        Object.assign(this, 
            {
                game, states, 
                x, y,
                width, height,
                spritesheets, activeFrames,
                hurtbox, hitbox, 
                hp, hitboxOffset,
                debug
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
        this.lastDir = this.dir;
        this.lasthurtbox = null;
        this.lasthitbox = null;
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
                    this.width, this.height, 
                    this.spritesheets[i].frame_count, 
                    FRAME_DURATION, j === 0 
                );
            }
        }

    }

    draw(ctx) {
        this.animations[this.state][this.dir].drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.debug) {
            this.hurtbox.draw(ctx, this.dir);
            this.hitbox.draw(ctx, this.dir);

            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    update() {
        this.updateHurtbox();
        this.updateHitbox();

        if (this.invulnerable) {
            this.invulTimer -= this.game.clockTick;
            if (this.invulTimer > 0.21) {
                this.x -= this.velocity.x * 0.35;
                this.y -= this.velocity.y * 0.35;
            }

            if (this.invulTimer <= 0) {
                this.invulTimer = 0;
                this.invulnerable = false;
            }
        }

        if (!this.dirCheck()) {
            this.lastDir = this.dir;

            if (this.dir === 0) {
                this.hitbox.x += this.hitboxOffset.left - this.hitboxOffset.right;
            } else {
                this.hitbox.x += this.hitboxOffset.right - this.hitboxOffset.left;
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
        this.hurtbox = new HurtBox(
            this.lastHurtbox.x + this.velocity.x, 
            this.lastHurtbox.y + this.velocity.y, 
            this.lastHurtbox.width,
            this.lastHurtbox.height
        );
    }

    updateHitbox() {
        this.lastHitbox = this.hitbox;
        this.hitbox = new HitBox(
            this.lastHitbox.x + this.velocity.x,
            this.lastHitbox.y + this.velocity.y, 
            this.lastHitbox.width, 
            this.lastHitbox.height
        );
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

    dirCheck() {
        return this.dir === this.lastDir;
    }
}
