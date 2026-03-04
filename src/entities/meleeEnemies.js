const STATES = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
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
        soundPath, debug,
        attackCooldown = 0.5      //default 2 seconds
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
            soundPath, debug,
            attackCooldown
        );

        this.attackState = {
            CHASE: 0,
            ATTACK: 1,
            STUNNED: 2
        };

        this.currentAction = this.attackState.CHASE;
    }

    update(){
        // decrement cooldown timer
        if (this.attackCooldownTimer > 0) {
            this.attackCooldownTimer -= this.game.clockTick;
        } else {
            this.attackCooldownTimer = 0; 
        }

        this.currentAction = this.isStunned ? this.attackState.STUNNED : this.currentAction; 


        if (this.currentAction === this.attackState.STUNNED) {
            this.state = this.states.IDLE;
            this.animations[this.state][this.dir].reset();
        }
        
        if (this.currentAction !== this.attackState.STUNNED) {
            if(this.hitbox.collide(this.target.hurtbox) &&
               this.currentAction === this.attackState.CHASE &&
               this.attackCooldownTimer === 0        // added timer check to atk
            ){
                this.currentAction = this.attackState.ATTACK;
                this.state = this.states.ATTACK;
                this.animations[this.state][this.dir].reset();
            }

            if(this.currentAction === this.attackState.ATTACK){
                this.degradeVelocityX();
                this.degradeVelocityY();
                if(this.animations[this.state][this.dir].currentFrame() === this.monsterFrames){ 
                    this.attackCooldownTimer = this.attackCooldown;     // reset timer after attacking  
                    this.currentAction = this.attackState.CHASE;
                    this.state = this.states.RUN;
                    this.animations[this.state][this.dir].reset();
                }
            }

            if(this.currentAction === this.attackState.CHASE) {
                // Calculate the distance between the lizard and the warrior using the helper method
                var dist = this.distance(this, this.target);

                // used center for velocity
                let center = this.getCenter();
                let target_center = this.target.getCenter();
            
                // Calculate velocity to move toward the warriro this is what he uses
                this.velocity = {
                    x: ((target_center.x - center.x) / dist * this.maxSpeed) * this.game.clockTick,
                    y: ((target_center.y - center.y) / dist * this.maxSpeed) * this.game.clockTick
                };

                // Update the lizard's X position this is simmilar to what he used in his video 
                this.x += this.velocity.x;
            
                // Update the lizard's Y position This is what he had in his video
                this.y += this.velocity.y;

                // Set animation state to running this is hard coded we might want to change it later 
                this.state = this.states.RUN;

                // Stop moving if really close to the warrior we need to change this later maybe make a monster file that
                // extends entities and then extend that to monsters 
                if(dist < 1) {
                    this.velocity = { x: 0, y: 0 };
                    this.state = this.states.IDLE;
                }
            }
        } else {
            if (this.invulnerable === false) {
                this.currentAction = this.attackState.CHASE;
            }
        }

        this.updateDirection();
        this.updateStun();
        super.update();
    }
}
