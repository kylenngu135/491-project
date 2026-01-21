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
        this.velocity = {x: 0, y:0};
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        console.log(this.velocity);
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
