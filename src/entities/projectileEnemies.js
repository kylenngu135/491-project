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
    }
    // this should work like the troll where it stops then does something 
    update() {
        this.dis = this.distance(this, this.target);
    
        if(this.currentAction === this.attackState.CHASE) {
            if(this.dis > this.range) {
                this.velocity = {
                    x: ((this.target.x - this.x) / this.dis) * this.maxSpeed * this.game.clockTick,
                    y: ((this.target.y - this.y) / this.dis) * this.maxSpeed * this.game.clockTick
                };
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.state = PRO_STATES.RUN;
            }
        
            if(this.dis <= this.range) {
                this.currentAction = this.attackState.FIRING;
                this.state = PRO_STATES.SHOOT;
                this.animations[this.state][this.dir].reset();
            }
        }
    
        if(this.currentAction === this.attackState.FIRING) {
            this.degradeVelocityX();
            this.degradeVelocityY();
        
            if(this.animations[this.state][this.dir].currentFrame() === this.monsterFrames) {  
                this.game.sceneManager.spawnFireBall(this.x, this.y, this.target.x * 1.5, this.target.y * 1.5);
                this.currentAction = this.attackState.CHASE;
                this.state = PRO_STATES.RUN;
                this.animations[this.state][this.dir].reset();
            }
        }

        this.updateDirection();
        super.update();
    }
    
    

}