const DIR = {
    LEFT: 0,
    RIGHT: 1 
}

const FRAME_DURATION = 0.05;
const NUM_OF_DIR = 2;

class Entity {
    constructor(game, states, startX, startY, startWidth, startHeight, destX, destY, destWidth, destHeight, spritesheets, hitbox, hp, debug) {
        Object.assign(this, {game, states, startX, startY, startWidth, startHeight, destX, destY, destWidth, destHeight, spritesheets, hitbox, hp, debug});
        this.game.entity = this;

        // animations
        this.animations = [];
        this.loadAnimations();

        // default states
        this.velocity = {x: 0, y: 0};
        this.state = states.IDLE;
        this.dir = DIR.RIGHT;
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
            this.hitbox.draw(ctx);
        }
    }

    update() {
        console.log(this.destX, this.destY);
        this.destX += this.velocity.x + this.startWidth / 2;
        this.destY += this.velocity.y + this.startHeight / 2;
        this.updateState();
        this.updateDirection();
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

    updateHitbox() {
        this.lastHitbox = this.hitbox;
        this.hitbox = new BoundingCircles(this.destX + (this.startWidth / 2), this.destY + (this.startHeight / 2), 42);
    }
}
