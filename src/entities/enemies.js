class Enemy extends Entity {
    constructor(game, states, 
                startX, startY, 
                startWidth, startHeight, 
                destX, destY, 
                destWidth, destHeight, 
                spritesheets, visualRadius, 
                target, maxSpeed, 
                monsterFrames, hitbox, 
                hp, debug) {
        super(game, states, 
              startX, startY, 
              startWidth, startHeight, 
              destX, destY, 
              destWidth, destHeight, 
              spritesheets, hitbox, 
              hp, debug);
        Object.assign(this, {visualRadius, target, maxSpeed, monsterFrames});

        this.attackState = {
            CHASE: 0,
            ATTACK: 1
        };

        this.currentAction = this.attackState.CHASE;
    }

    updateHitboxLocation() {
        // Calculate the distance between the lizard and the warrior using the helper method
        //https://www.youtube.com/watch?v=OEvL7aQFJWU&list=PLRgsEjJNLnh7fqP4mVqP-h6fAnuOdx3l4&index=22 2:50 time stamp
        var dist = this.distance(this, this.target);
        
        // Calculate velocity to move toward the warriro this is what he uses
        this.velocity = {
            x: (this.target.destX - this.destX) / dist * this.maxSpeed,
            y: (this.target.destY - this.destY) / dist * this.maxSpeed 
        }

        // this.currentAction = this.attackState.CHASE;

    }

    update(){
        if(Math.abs(this.target.destY - this.destY) < 50 && Math.abs(this.target.destX - this.destX) < 50 && this.currentAction === this.attackState.CHASE){
            this.currentAction = this.attackState.ATTACK;
            this.state = this.states.ATTACK;
            this.animations[this.state][this.dir].reset();
        }

        if(this.currentAction === this.attackState.ATTACK){
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
                x: (this.target.destX - this.destX) / dist * this.maxSpeed,
                y: (this.target.destY - this.destY) / dist * this.maxSpeed 
            };
        
            // Update the lizard's X position this is simmilar to what he used in his video 
            this.destX += this.velocity.x * this.game.clockTick;
        
            // Update the lizard's Y position This is what he had in his video
            this.destY += this.velocity.y * this.game.clockTick;
        
            // Set animation state to running this is hard coded we might want to change it later 
            this.state = this.states.RUN;
        
            // Stop moving if really close to the warrior we need to change this later maybe make a monster file that
            // extends entities and then extend that to monsters 
            if(dist < 5){
                this.velocity = { x: 0, y: 0 };
                this.state = this.states.IDLE;
            }

            this.updateHitboxLocation();
            this.updateHitbox();
        }

        this.updateDirection();
        // this.updateCollision();
    }


    updateCollision() {
        // Wall collision handling from the videos 
        if (this.hitbox.collideLeft() || this.hitbox.collideRight()) {
            this.degradeVelocityX();
            if (this.hitbox.collideLeft()) this.destX = this.hitbox.radius;
            if (this.hitbox.collideRight()) this.destX = 800 - this.hitbox.radius;
        }

        if (this.hitbox.collideTop() || this.hitbox.collideBottom()) {
            this.degradeVelocityY();
            if (this.hitbox.collideTop()) this.destY = this.hitbox.radius;
            if (this.hitbox.collideBottom()) this.destY = 800 - this.hitbox.radius;
        }

        // Corner collision makes bros stop when wall is seen so its not them just running up a wall not moving 
        if ((this.hitbox.collideLeft() && this.hitbox.collideTop()) || 
            (this.hitbox.collideLeft() && this.hitbox.collideBottom()) ||
            (this.hitbox.collideRight() && this.hitbox.collideTop()) ||
            (this.hitbox.collideRight() && this.hitbox.collideBottom())){
            this.state = this.states.IDLE;
        }
    }
    
    /*
    updatehitbox(){
        // this.lasthitbox = this.hitbox;
        this.hitbox = new BoundingCircles(this.destX, this.destY, 42);
    }
    */
    // Helper method to calculate distance between two entities using Pythagorean theorem this is what i am assuming it is doiing in the vid
    // i just looked up how and this is it. 
    distance(entity1, entity2) {
        var dx = entity1.destX - entity2.destX;
        var dy = entity1.destY - entity2.destY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
