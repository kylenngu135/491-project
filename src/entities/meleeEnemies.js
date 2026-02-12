const STATES = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
    // STUNNED: 3
}

class MeleeEnemy extends Enemy {
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
        soundPath, debug
    ) {
        super(
            game, STATES, 
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

        this.attackState = {
            CHASE: 0,
            ATTACK: 1
        };

        this.currentAction = this.attackState.CHASE;
    }

    update(){
        if(this.hitbox.collide(this.target.hurtbox) &&
           this.currentAction === this.attackState.CHASE
        ){
            this.currentAction = this.attackState.ATTACK;
            this.state = this.states.ATTACK;
            this.animations[this.state][this.dir].reset();
        }

        if(this.currentAction === this.attackState.ATTACK){
            this.degradeVelocityX();
            this.degradeVelocityY();
            if(this.animations[this.state][this.dir].currentFrame() === this.monsterFrames){  
                this.currentAction = this.attackState.CHASE;
                this.state = this.states.RUN;
                this.animations[this.state][this.dir].reset();
            }
        }

        if(this.currentAction === this.attackState.CHASE){
            // Calculate the distance between the lizard and the warrior using the helper method
            var dist = this.distance(this, this.target);
        
            // Calculate velocity to move toward the warriro this is what he uses
            this.velocity = {
                x: ((this.target.x - this.x) / dist * this.maxSpeed) * this.game.clockTick,
                y: ((this.target.y - this.y) / dist * this.maxSpeed) * this.game.clockTick
            };

            // Update the lizard's X position this is simmilar to what he used in his video 
            this.x += this.velocity.x;
        
            // Update the lizard's Y position This is what he had in his video
            this.y += this.velocity.y;

            // Set animation state to running this is hard coded we might want to change it later 
            this.state = this.states.RUN;

            // Stop moving if really close to the warrior we need to change this later maybe make a monster file that
            // extends entities and then extend that to monsters 
            if(dist < 5){
                this.velocity = { x: 0, y: 0 };
                this.state = this.states.IDLE;
            }
        }

        this.updateDirection();
        super.update();
    }
}
