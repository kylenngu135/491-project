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

const FRAME_COUNT = 4;
const FRAME_DURATION = 0.2;

class MainCharacter {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game.mainCharacter = this;

        // sprite sheets
        this.spritesheets = [];
        this.loadSpritesheets();

        // animations
        this.animations = [];
        this.loadAnimations();

        this.sX = 0;
        this.sY = 0;
        this.sW = 20;
        this.sH = 20;
        this.x = 5;
        this.y = 5;
        this.dW = 128;
        this.dH = 160;
        this.velocity = {x: 0, y: 0};
        this.state = STATE.IDLE;
        this.dir = DIR.DOWN;
        this.state = STATE.IDLE;

    }

    loadSpritesheets() {
        this.spritesheets[0] = ASSET_MANAGER.getAsset("../assets/16x16/16x16 Idle-Sheet.png");
        this.spritesheets[1] = ASSET_MANAGER.getAsset("../assets/16x16/16x16 Walk-Sheet.png");
    }

    loadAnimations() {
        for (let i = 0; i < 2; i++) { // 2 states: IDLE and Walking
            this.animations.push([]);
            for (let j = 0; j < 8; j++) { // 5 
                this.animations[i].push([]);
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                this.animations[i][j] = new Animator(this.spritesheets[i], 0, 20*(j) + 1, 20, 20, FRAME_COUNT, FRAME_DURATION, false);
            }
            for (let j = 1; j < 4; j++) {
                this.animations[i][j+4] = new Animator(this.spritesheets[i], 0, 20*(j) + 1, 20, 20, FRAME_COUNT, FRAME_DURATION, true);
            }
        }
    }

    // TODO: Make this not ugly
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
        this.velocity.x = 7 * (dir ? -1 : 1);
    }

    degradeVelocityX() {
        this.velocity.x *= 0.9;

        if (Math.abs(this.velocity.x) < 0.1) {
            this.velocity.x = 0;
        }
    }

    updateVelocityY(dir) {
        this.velocity.y = 7 * (dir ? -1 : 1);
    }

    degradeVelocityY() {
        this.velocity.y *= 0.9;

        if (Math.abs(this.velocity.y) < 0.1) {
            this.velocity.y = 0;
        }
    }
}
