// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.01;
        this.minStep = 1 / 60;      // 1/60 default to 60 fps 
        this.lastTimestamp = 0;
        this.paused = false;
    };

    tick() {
        if (this.paused) {
            return 0;
        }

        const current = Date.now();
        const delta = (current - this.lastTimestamp) / 1000;

        // fps cap
        if (delta < this.minStep) {
            return 0;
        }

        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };
};
