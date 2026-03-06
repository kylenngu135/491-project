class Hero extends Entity {
    constructor(
        game, states, 
        x, y,
        width, height,
        spritesheets, isAttacking, 
        attackAnimation, attackDuration, 
        activeFrames, hurtbox, 
        hitbox, hp,
        hitOffset, hurtOffset,
        speed, debug
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

        Object.assign(this, {isAttacking, attackAnimation, attackDuration, speed});
        this.currentMoney = 0;
        this.maxHp = hp;
    }
    
    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.attackAnimation = this.animations[this.states.ATTACK1][this.dir];
            this.animations[this.states.ATTACK1][this.dir].elapsedTime = 0;
            this.animations[this.states.ATTACK2][this.dir].elapsedTime = 0;
            this.attackElapsedTime = 0;
        }
    }

    update() {
        if (this.isAttacking) {
            /*
            this.degradeVelocityX();
            this.degradeVelocityY();
            */
            this.attackElapsedTime += this.game.clockTick;
            
            // Determine which animation to play based on total elapsed time
            const attack1Duration = 4 * FRAME_DURATION; // 0.4 seconds
            
            if (this.attackElapsedTime < attack1Duration) {
                // Play ATTACK1
                this.state = this.states.ATTACK1;
                this.animations[this.states.ATTACK1][this.dir].elapsedTime = this.attackElapsedTime;
            } else if (this.attackElapsedTime < this.attackDuration) {
                // Play ATTACK2
                this.state = this.states.ATTACK2;
                this.animations[this.states.ATTACK2][this.dir].elapsedTime = this.attackElapsedTime - attack1Duration;
            } else {
                // Attack finished
                //console.log("Attack finished");
                this.isAttacking = false;
                this.attackElapsedTime = 0;
                this.updateState();
            }
        } else {
            this.updateDirection();
            this.updateState();
        }

        let slowdown = this.isAttacking ? 0.5 : 1;

        this.x += this.velocity.x * this.speed * slowdown;
        this.y += this.velocity.y * this.speed * slowdown;

        super.update();
    }
    
    addMoney(money) {
        this.currentMoney += money;
    }
    // just a method to spend money
    subMoney(loss) {
        this.currentMoney -= loss;
    }
    // i gave us a max hp type shit 
    increaseMaxHp(health) {
        this.maxHp += health;
        this.hp += health;
    }
    // this makes sure we dont go over our max hp when we heal 
    heal(healing, cost) {
        if(this.hp < this.maxHp) {
            this.hp += healing
            this.subMoney(cost)
            if(this.hp > this.maxHp) {
                this.hp = this.maxHp
            }
        }
    }

    // i guess we have this set but idk if it would actually increase the damage
    increaseAttack(amount) {
        this.damage += amount;
    }
    // i forgot what this is for 
    shopMoney() {
        return this.currentMoney;
    }
    currentMaxHp(){
        return this.maxHp;
    }
}
