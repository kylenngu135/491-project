class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, isFlipped) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, isFlipped});

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    }

    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();

        if (this.isFlipped) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.spritesheet,
                this.xStart + this.width*frame, this.yStart,
                this.width, this.height,
                 (-1*x) - (this.width),  y,
                this.width, this.height
            );
            ctx.restore();
        } else {
            ctx.drawImage(this.spritesheet,
                this.xStart + this.width*frame, this.yStart,
                this.width, this.height,
                 x,  y,
                this.width, this.height
            );
        }
    }
    
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
    reset() {
        this.elapsedTime = 0;
    }
}
