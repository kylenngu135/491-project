const STATE = { 
    IDLE: 0, 
    WALKING: 1
};

const DIR = {
    DOWN: 0,
    DOWN_RIGHT: 1,
    RIGHT: 2,
    UP_RIGHT: 3,
    UP: 4,
    DOWN_LEFT: 5,
    LEFT: 6,
    UP_LEFT: 7
};

const FACING = {
    LEFT: true,
    RIGHT: false 
}

const FRAME_COUNT = 4;
const FRAME_DURATION = 0.1;
const NUM_OF_DIR = 8;

class MainCharacter {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game.mainCharacter = this;

        // dimensions
        this.sX = 0;
        this.sY = 0;
        this.sW = 20;
        this.sH = 20;
        this.x = 5;
        this.y = 5;
        this.dW = 128;
        this.dH = 160;

        // sprite sheets
        this.spritesheets = [];
        this.loadSpritesheets();

        // animations
        this.animations = [];
        this.loadAnimations();

        // default states
        this.velocity = {x: 0, y: 0};
        this.state = STATE.IDLE;
        this.dir = DIR.DOWN;
    }

    loadSpritesheets() {
        this.spritesheets[0] = ASSET_MANAGER.getAsset("./assets/16x16/16x16 Idle-Sheet.png");
        this.spritesheets[1] = ASSET_MANAGER.getAsset("./assets/16x16/16x16 Walk-Sheet.png");
    }

    loadAnimations() {
        for (let i = 0; i < this.spritesheets.length; i++) { // 2 states: IDLE and Walking
            this.animations.push([]);
            for (let j = 0; j < NUM_OF_DIR; j++) { // 5 
                this.animations[i].push([]);
            }
        }

        // 2 states: IDLE and Walking
        for (let i = 0; i < this.spritesheets.length; i++) {
            for (let j = 0; j < 5; j++) {
                this.animations[i][j] = new Animator(this.spritesheets[i], 0, this.sW*j + 1, this.sW, this.sH, FRAME_COUNT, FRAME_DURATION, FACING.RIGHT);
            }
            for (let j = 1; j < 4; j++) {
                this.animations[i][j+4] = new Animator(this.spritesheets[i], 0, this.sW*j + 1, this.sW, this.sH, FRAME_COUNT, FRAME_DURATION, FACING.LEFT);
            }
        }
    }

    draw(ctx) {
        this.animations[this.state][this.dir].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateState();
        this.updateDirection();
    }

    updateState() {
        this.state = this.velocity.x != 0 || this.velocity.y != 0 ? STATE.WALKING : STATE.IDLE;
    }

    updateDirection() {
        if (this.velocity.x < 0) {
            if (this.velocity.y != 0) {
                this.dir = this.velocity.y < 0 ? DIR.UP_LEFT : DIR.DOWN_LEFT;
            } else {
                this.dir = DIR.LEFT;
            }
        } else if (this.velocity.x > 0) {
            if (this.velocity.y != 0) {
                this.dir = this.velocity.y < 0 ? DIR.UP_RIGHT : DIR.DOWN_RIGHT;
            } else {
                this.dir = DIR.RIGHT;
            }
        } else if (this.velocity.y != 0) {
            this.dir = this.velocity.y < 0 ? DIR.UP: DIR.DOWN;
        }
    }

    updateVelocityX(dir) {
        this.velocity.x = 5 * (dir ? -1 : 1);
    }

    degradeVelocityX() {
        this.velocity.x *= 0.8;
        if (Math.abs(this.velocity.x) < 0.1) {
            this.velocity.x = 0;
        }
    }

    updateVelocityY(dir) {
        this.velocity.y = 5 * (dir ? -1 : 1);
    }

    degradeVelocityY() {
        this.velocity.y *= 0.8;
        if (Math.abs(this.velocity.y) < 0.1) {
            this.velocity.y = 0;
        }
    }
}
