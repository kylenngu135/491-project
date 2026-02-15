class Enemy extends Entity {
    constructor(
        game, states, 
        x, y,
        width, height,
        spritesheets, visualRadius, 
        target, maxSpeed, 
        monsterFrames, activeFrames,
        hurtbox, hitbox, 
        hp, hitboxOffset, coinValue, 
        debug
    ) {
        super(game, states, 
              x, y, 
              width, height,
              spritesheets, activeFrames,
              hurtbox, hitbox, 
              hp, hitboxOffset,
              debug);
        Object.assign(this, {visualRadius, target, maxSpeed, monsterFrames, coinValue});

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
    

    // NOT OLD ONES, size is just wrong
    
    // Helper method to calculate distance between two entities using Pythagorean theorem this is what i am assuming it is doiing in the vid
    // i just looked up how and this is it. 
    distance(entity1, entity2) {
        var dx = entity1.x - entity2.x;
        var dy = entity1.y - entity2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // TODO: CARE ABOUT THIS LATER

    /*
    updateCollision() {
        // Wall collision handling from the videos 
        if (this.hitbox.collideLeft() || this.hitbox.collideRight()) {
            this.degradeVelocityX();
            if (this.hitbox.collideLeft()) this.x = this.hitbox.radius;
            if (this.hitbox.collideRight()) this.x = 800 - this.hitbox.radius;
        }

        if (this.hitbox.collideTop() || this.hitbox.collideBottom()) {
            this.degradeVelocityY();
            if (this.hitbox.collideTop()) this.y = this.hitbox.radius;
            if (this.hitbox.collideBottom()) this.y = 800 - this.hitbox.radius;
        }

        // Corner collision makes bros stop when wall is seen so its not them just running up a wall not moving 
        if ((this.hitbox.collideLeft() && this.hitbox.collideTop()) || 
            (this.hitbox.collideLeft() && this.hitbox.collideBottom()) ||
            (this.hitbox.collideRight() && this.hitbox.collideTop()) ||
            (this.hitbox.collideRight() && this.hitbox.collideBottom())){
            this.state = this.states.IDLE;
        }
    }
    */
}
