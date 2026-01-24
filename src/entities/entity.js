const DIR = {
    LEFT: 0,
    RIGHT: 1 
}

const FRAME_DURATION = 0.1;
const NUM_OF_DIR = 2;

class Entity {
    constructor(game, states, startX, startY, destX, destY, destWidth, destHeight, spritesheets) {
        Object.assign(this, {game, states, startX, startY, destX, destY, destWidth, destHeight, spritesheets});
        this.game.entity = this;

        // frame size
        this.startWidth = 192
        this.startHeight = 192

        // animations
        this.animations = [];
        this.loadAnimations();

        // default states
        this.velocity = {x: 0, y: 0};
        this.state = states.IDLE;
        this.dir = DIR.RIGHT;
    }

    loadAnimations() {

        let length = this.spritesheets.length;

        for (let i = 0; i < length; i++) {
            this.animations.push([]);
        }

        for (let i = 0; i < length; i++) {
            console.log(i);
            for (let j = 0; j < NUM_OF_DIR; j++) {
                this.animations[i][j] = new Animator(
                    this.spritesheets[i].sheet, 
                    0, 0, 
                    this.startWidth, this.startHeight, 
                    this.spritesheets[i].frame_count, 
                    FRAME_DURATION, j === 0 
                );

                console.log(this.animations[i][j])
            }
        }

    }

    draw(ctx) {
        this.animations[this.state][this.dir].drawFrame(this.game.clockTick, ctx, this.destX, this.destY);
    }

    update() {
        this.destX += this.velocity.x;
        this.destY += this.velocity.y;
        this.updateState();
        this.updateDirection();
    }

    updateState() {
        this.state = this.velocity.x != 0 || this.velocity.y != 0 ? STATE.RUN : STATE.IDLE;
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
}
