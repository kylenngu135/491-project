const PRO_STATES = {
    IDLE: 0,
    RUN: 1,
    SHOOT: 2
    // STUNNED: 3
}
class ProjectileEnemies extends Enemy{
    constructor(
        game, 
        x, y,
        width, height,
        spritesheets, visualRadius, 
        target, maxSpeed, 
        monsterFrames, activeFrames,
        hurtbox, hitbox, 
        hp, hitOffset, 
        hurtOffset, coinValue,
        soundPath, range, 
        debug
    ) {
        super(
            game, PRO_STATES, 
            x, y,
            width, height,
            spritesheets, visualRadius, 
            target, maxSpeed, 
            monsterFrames, activeFrames,
            hurtbox, hitbox, 
            hp, hitOffset, 
            hurtOffset, coinValue,
            soundPath, debug
        );
        this.range = range;
        this.x = x;
        this.y = y;
        this.attackState = {
            CHASE: 0,
            FIRING: 1
        };

        this.currentAction = this.attackState.CHASE;
        this.dis = this.distance(this, this.target);

        this.attackCooldown = 0;
        this.cooldownTime = 1;
        this.attackCount = 0;
        this.maxAttacksInSuccession = 3;
    }
    // this should work like the troll where it stops then does something 
    update() {
        console.log(this.state)
        console.log(this.isStunned)
        this.updateStun();

        if (this.isStunned) {
            this.state = PRO_STATES.IDLE;
            this.animations[this.state][this.dir].reset();
            this.degradeVelocityX();
            this.degradeVelocityY();
            this.updateDirection();
            super.update();
            return; // skip all chase/firing logic
        }

        let trueTarget = this.target.getCenter();
        let center = this.getCenter();
        
        this.dis = this.distance(this, this.target);
        
        if(this.currentAction === this.attackState.CHASE) {
            this.state = PRO_STATES.RUN;
            this.velocity = {
                x: ((trueTarget.x - center.x) / this.dis) * this.maxSpeed * this.game.clockTick,
                y: ((trueTarget.y - center.y) / this.dis) * this.maxSpeed * this.game.clockTick
            };
            if (this.state === PRO_STATES.RUN) {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }
            if (this.attackCooldown <= 0) {
                if(this.dis <= this.range) {
                    this.currentAction = this.attackState.FIRING;
                    this.state = PRO_STATES.SHOOT;
                    this.animations[this.state][this.dir].reset();
                }
            } else {
                this.attackCooldown -= this.game.clockTick;
            }
        }
    
        if(this.currentAction === this.attackState.FIRING) {
            this.degradeVelocityX();
            this.degradeVelocityY();
        
            if(this.animations[this.state][this.dir].currentFrame() === this.monsterFrames) { 
                // what this is doing is kinda leading the shot and shooting at where it could be 
                let leadX = trueTarget.x + this.target.velocity.x * 35;
                let leadY = trueTarget.y + this.target.velocity.y * 35;

                this.game.sceneManager.spawnFireBall(this.x, this.y, leadX, leadY);
                this.currentAction = this.attackState.CHASE;
                this.state = PRO_STATES.RUN;
                this.animations[this.state][this.dir].reset();
                this.attackCooldown = this.cooldownTime;
            }
        }

        this.updateDirection();
        super.update();
    }
    
    

}
