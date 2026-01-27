class Enemy extends Entity {
    constructor(game, states, startX, startY, startWidth, startHeight, destX, destY, destWidth, destHeight, spritesheets, visualRadius, target, maxSpeed, hitbox, debug) {
        super(game, states, startX, startY, startWidth, startHeight, destX, destY, destWidth, destHeight, spritesheets, hitbox, debug);
        Object.assign(this, {visualRadius, target, maxSpeed});
    }

    update(){
        this.updateLocation();
        this.updateDirection();
        this.hitbox.update(this.destX + (this.startWidth / 2), this.destY + (this.startHeight / 2));
        this.updateCollision();
    }

    updateLocation() {
        // Calculate the distance between the lizard and the warrior using the helper method
        //https://www.youtube.com/watch?v=OEvL7aQFJWU&list=PLRgsEjJNLnh7fqP4mVqP-h6fAnuOdx3l4&index=22 2:50 time stamp
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

        if(this.target.hitbox && this.hitbox.collide(this.target.hitbox)){
            var dist = this.distance(this, this.target);
            var delta = this.hitbox.radius + this.target.hitbox.radius - dist;
            var difX = (this.destX - this.target.destX) / dist;
            var difY = (this.destY - this.target.destY) / dist;
    
            this.destX += difX * delta / 2;
            this.destY += difY * delta / 2;
            this.target.destX -= difX * delta / 2;
            this.target.destY -= difY * delta / 2;
        }

        // TODO: CLEAN THIS UP
        /*
        // Entity collision from video e
        //https://www.youtube.com/watch?v=OEvL7aQFJWU&list=PLRgsEjJNLnh7fqP4mVqP-h6fAnuOdx3l4&index=22 6:35 time stamp
        // he has a swap velocity but we dont need it 
        for(var i = 0; i < this.enemiesArray.length; i++){
            var eni = this.enemiesArray[i];
            if(eni !== this && eni.hitbox && this.hitbox.collide(eni.hitbox)){
                var dist = this.distance(this, eni);
                var delta = this.hitbox.radius + eni.hitbox.radius - dist;
                var difX = (this.destX - eni.destX) / dist;
                var difY = (this.destY - eni.destY) / dist;
        
                this.destX += difX * delta / 2;
                this.destY += difY * delta / 2;
                eni.destX -= difX * delta / 2;
                eni.destY -= difY * delta / 2;
            }
        }
        */
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
