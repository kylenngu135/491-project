class Enemy extends Entity {
<<<<<<< HEAD
    constructor(
        game, states, 
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
          game, states, 
          x, y, 
          width, height,
          spritesheets, activeFrames,
          hurtbox, hitbox, 
          hp, hitOffset,
          hurtOffset,
          debug
        );
        
        Object.assign(this, {visualRadius, target, maxSpeed, monsterFrames, coinValue});

        this.attackState = {
            CHASE: 0,
            ATTACK: 1
        };
        // this is so if we add new mosnters or things that need this class it doesnt crash when we need to test
        // this is saying if there is a sound assign it if not make it null
        this.sound = soundPath ? ASSET_MANAGER.cache[soundPath] : null;
        this.currentAction = this.attackState.CHASE;
    }

    // Helper method to calculate distance between two entities using Pythagorean theorem this is what i am assuming it is doiing in the vid
    // i just looked up how and this is it. 
    distance(entity1, entity2) {
        var dx = entity1.x - entity2.x;
        var dy = entity1.y - entity2.y;
        return Math.sqrt(dx * dx + dy * dy);

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
