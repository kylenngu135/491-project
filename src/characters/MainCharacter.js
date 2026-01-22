const STATE = { IDLE: 1, WALKING: 2};

const DIR_X = { LEFT: -1, IDLE: 0, RIGHT: 1 }

const DIR_Y = { UP: -1, IDLE: 0, DOWN: 1 }

const FRAME_COUNT = 4;
const FRAME_DURATION = 0.2;

class MainCharacter {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game.mainCharacter = this;
        this.spritesheet = ASSET_MANAGER.getAsset("../assets/16x16/16x16 Idle-Sheet.png");
        this.sX = 0;
        this.sY = 0;
        this.sW = 20;
        this.sH = 20;
        this.x = 5;
        this.y = 5;
        this.dW = 128;
        this.dH = 160;
        this.animator = new Animator(this.spritesheet, 0, 0, 20, 20, 4, 0.2);
        this.velocity = {x: 0, y: 0};
        
        this.dir = {x: DIR_X.IDLE, y: DIR_Y.DOWN};
        // this.state = STATE.IDLE;

        // animations
        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        for (let i = 0; i < 2; i++) { // 2 states: IDLE and Walking
            this.animations.push([]);
            for (let j = 0; j < 5; j++) { // 5 
                this.animations[i].push([]);
            }
        }

        let adder = 0;

        for (let i = 0; i < 5; i++) {
            adder = i === 0 ? 0 : 1;
            this.animations[0][i] = new Animator(this.spritesheet, 0, 20*(i) + adder, 20, 20, FRAME_COUNT, FRAME_DURATION, false);
        }

        for (let i = 1; i < 4; i++) {
            this.animations[0][i+4] = new Animator(this.spritesheet, 0, 20*(i) + adder, 20, 20, FRAME_COUNT, FRAME_DURATION, true);
        }
    }

    draw(ctx) {
        if (this.dir.x === DIR_X.IDLE && this.dir.y === DIR_Y.DOWN) {
            this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dir.x === DIR_X.RIGHT && this.dir.y === DIR_Y.DOWN) {
            this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dir.x === DIR_X.RIGHT && this.dir.y === DIR_Y.IDLE) {
            this.animations[0][2].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dir.x === DIR_X.RIGHT && this.dir.y === DIR_Y.UP) {
            this.animations[0][3].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dir.x === DIR_X.IDLE && this.dir.y === DIR_Y.UP) {
            this.animations[0][4].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dir.x === DIR_X.LEFT && this.dir.y === DIR_Y.DOWN) {
            this.animations[0][5].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dir.x === DIR_X.LEFT && this.dir.y === DIR_Y.IDLE) {
            this.animations[0][6].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.dir.x === DIR_X.LEFT && this.dir.y === DIR_Y.UP) {
            this.animations[0][7].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateDirection();
    }

    updateDirection() {
        if (this.velocity.x != 0) {
            if (this.velocity.y != 0) {
                this.dir.y = this.velocity.y < 0 ? DIR_Y.UP : DIR_Y.DOWN;
            } else {
                this.dir.y = DIR_Y.IDLE;
            }
            this.dir.x = this.velocity.x < 0 ? DIR_X.LEFT : DIR_X.RIGHT;
        } else if (this.velocity.y != 0) {
            if (this.velocity.x == 0) {
                 this.dir.x = DIR_X.IDLE;
            }
            this.dir.y = this.velocity.y < 0 ? DIR_Y.UP : DIR_Y.DOWN;
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
