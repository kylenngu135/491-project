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
        hp, hitOffset,
        hurtOffset,
        debug
    ) {
        Object.assign(this, 
            {
                game, states, 
                x, y,
                width, height,
                spritesheets, activeFrames,
                hurtbox, hitbox, 
                hp, hitOffset,
                hurtOffset,
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
        /*
        this.lasthurtbox = null;
        this.lasthitbox = null;
        */
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
                this.x += 30 * (this.dir === 0 ? 1 : -1);
                this.y += 30 * (this.dir === 0 ? 1 : -1);
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
        let center = this.getCenter();

        this.hurtbox.update(center.x - this.hurtOffset.x, center.y - this.hurtOffset.y);
    }

    updateHitbox() {
        let center = this.getCenter();
        let horz_offset = this.dir === 0 ? this.hitOffset.x : 0;
        this.hitbox.update(center.x - horz_offset, center.y - this.hitOffset.y);
    }

    register_hit(hp_lost) {
        this.hp -= hp_lost;
        this.state
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

    getCenter() {
        return {
            x: this.x + this.width/2, 
            y: this.y + this.height/2 
        };
    }
}
