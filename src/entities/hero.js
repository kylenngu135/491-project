class Hero extends Entity {
    constructor(game, states, startX, startY, startWidth, startHeight, destX, destY, destWidth, destHeight, spritesheets, isAttacking, attackAnimation, attackDuration, hitbox, debug) {
        super(game, states, startX, startY, startWidth, startHeight, destX, destY, destWidth, destHeight, spritesheets, hitbox, debug);
        Object.assign(this, {isAttacking, attackAnimation, attackDuration});
    }
    
    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.attackAnimation = this.animations[this.states.ATTACK1][this.dir];
            this.animations[this.states.ATTACK1][this.dir].elapsedTime = 0;
            this.animations[this.states.ATTACK2][this.dir].elapsedTime = 0;
            this.attackElapsedTime = 0;
        }

    }

    update() {
        this.destX += this.velocity.x;
        this.destY += this.velocity.y;
        this.updateDirection();
        
        if (this.isAttacking) {
            this.attackElapsedTime += this.game.clockTick;
            //console.log("Attack elapsed:", this.attackElapsedTime, "isAttacking:", this.isAttacking, "state:", this.state);
            
            // Determine which animation to play based on total elapsed time
            const attack1Duration = 4 * FRAME_DURATION; // 0.4 seconds
            
            if (this.attackElapsedTime < attack1Duration) {
                // Play ATTACK1
                this.state = this.states.ATTACK1;
                this.animations[this.states.ATTACK1][this.dir].elapsedTime = this.attackElapsedTime;
            } else if (this.attackElapsedTime < this.attackDuration) {
                // Play ATTACK2
                this.state = this.states.ATTACK2;
                this.animations[this.states.ATTACK2][this.dir].elapsedTime = this.attackElapsedTime - attack1Duration;
            } else {
                // Attack finished
                //console.log("Attack finished");
                this.isAttacking = false;
                this.attackElapsedTime = 0;
                this.updateState();
            }
        } else {
            this.updateState();
        }

        this.hitbox.update(this.destX + (this.startWidth / 2), this.destY + (this.startHeight / 2));
    }
}
