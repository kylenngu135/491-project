class Hero extends Entity {
    constructor(
        game, states, 
        x, y,
        width, height,
        spritesheets, isAttacking, 
        attackAnimation, attackDuration, 
        activeFrames, hurtbox, 
        hitbox, hp,
        hitboxOffset, debug
    ) {
        super(game, states, 
              x, y,
              width, height,
              spritesheets, activeFrames, 
              hurtbox, hitbox, 
              hp, hitboxOffset,
              debug
        );
        Object.assign(this, {isAttacking, attackAnimation, attackDuration});
        this.currentMoney = 0;
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
        if (this.isAttacking) {
            this.degradeVelocityX();
            this.degradeVelocityY();
            this.attackElapsedTime += this.game.clockTick;
            
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
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.updateState();
            this.updateDirection();
        }

        

        super.update();
    }
    addMoney(money){
        this.currentMoney += money;
    }
}
