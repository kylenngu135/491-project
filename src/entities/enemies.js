class Enemy extends Entity {
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
        soundPath, debug,
        attackCooldown,
        stunDuration,
        isStunned,
        stunTimer
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
        
        Object.assign(this, {visualRadius, target, maxSpeed, monsterFrames, coinValue, attackCooldown});

        this.attackState = {
            CHASE: 0,
            ATTACK: 1
        };
        // this is so if we add new mosnters or things that need this class it doesnt crash when we need to test
        // this is saying if there is a sound assign it if not make it null
        this.sound = soundPath ? ASSET_MANAGER.cache[soundPath] : null;
        this.currentAction = this.attackState.CHASE;

        // make a timer for atk cooldowns
        this.attackCooldownTimer = 0;

        // This is an amount of time to be stunned for each enemy starts at 0
        this.stunDuration = 0;
        this.isStunned = false;
        this.stunTimer = 0;
    }

    
    applyStun() {
        if (this.isStunned || this.stunDuration <= 0) return;
        this.isStunned = true;
        this.stunTimer = this.stunDuration / 1000;
    }

    applyScaling(waveCount){
        this.hp *= Math.pow(1.03, waveCount);
        this.damage *= Math.pow(1.03, waveCount); 
    }

    updateStun() {
        if (this.isStunned) {
            this.stunTimer -= this.game.clockTick;
            if (this.stunTimer <= 0) {
                this.isStunned = false;
                this.stunTimer = 0;
            }
        }
    }
    // Helper method to calculate distance between two entities using Pythagorean theorem this is what i am assuming it is doiing in the vid
    // i just looked up how and this is it. 
    distance(entity1, entity2) {
        let entity1_center = entity1.getCenter();
        let entity2_center = entity2.getCenter();

        var dx = entity1_center.x - entity2_center.x;
        var dy = entity1_center.y - entity2_center.y;
        return Math.sqrt(dx * dx + dy * dy);

    }
}
