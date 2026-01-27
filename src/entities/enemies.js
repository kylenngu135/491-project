class Enemy extends Entity {
    constructor(game, states, startX, startY, startWidth, startHeight, destX, destY, destWidth, destHeight, spritesheets, visualRadius, target, maxSpeed) {
        super(game, states, startX, startY, startWidth, startHeight, destX, destY, destWidth, destHeight, spritesheets);
        Object.assign(this, {visualRadius, target, maxSpeed});
    }

    update(){
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
    
        this.updateDirection();
         this.updateBB();
         // What this is doing is that i forces them in a certain area that we can talk about later.

         //These first 4 make them stop when they hit the conners so it doesnt look weird when they run 
         // i am only doing this rn because idk what we are gonna do with the hero such as safe zones and shit 
         if (this.BB.collideLeft() && this.BB.collideTop()){
            this.state = this.states.IDLE;
        }
        if (this.BB.collideLeft() && this.BB.collideBottom()){
            this.state = this.states.IDLE;
        }
        if (this.BB.collideRight() && this.BB.collideTop()){
            this.state = this.states.IDLE;
        }
        if (this.BB.collideRight() && this.BB.collideBottom()){
            this.state = this.states.IDLE;
        }
        //this just makes it so they still slide up and down when they hit a wall nothing crazy 
        if (this.BB.collideLeft() || this.BB.collideRight()){
             this.degradeVelocityX();
             if (this.BB.collideLeft()) this.destX = this.BB.radius;
            if (this.BB.collideRight()) this.destX = 800 - this.BB.radius;
        }
        if (this.BB.collideTop() || this.BB.collideBottom()){
             this.degradeVelocityY();
             if (this.BB.collideTop()) this.destY = this.BB.radius;
             if (this.BB.collideBottom()) this.destY = 800 - this.BB.radius;
        }
    
    }
     
    updateBB(){
        this.lastBB = this.BB;
        this.BB = new BoundingCircles(this.destX, this.destY, 42);
    }

    // Helper method to calculate distance between two entities using Pythagorean theorem this is what i am assuming it is doiing in the vid
    // i just looked up how and this is it. 
    distance(entity1, entity2) {
        var dx = entity1.destX - entity2.destX;
        var dy = entity1.destY - entity2.destY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
