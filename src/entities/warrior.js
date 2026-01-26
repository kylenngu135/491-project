const WARRIOR_IDLE_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Idle.png";
const WARRIOR_RUN_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Run.png";
const WARRIOR_ATTACK1_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Attack1.png";
const WARRIOR_ATTACK2_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Attack2.png";
const WARRIOR_GUARD_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Guard.png";

const STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK1: 2,
    ATTACK2: 3,
    GUARD: 4
}


class Warrior extends Hero {
    constructor(game, destX, destY) {
        super(game, STATE, 0, 0, 192, 192, destX, destY, 192, 192, Warrior.#getSpriteSheets());
        // this.game.warrior = this;
        this.isAttacking = false;
        this.attackAnimation = null;
        this.attackDuration = 8 * FRAME_DURATION; // 8 frames total (4 ATTACK1 + 4 ATTACK2) * 0.1 frame duration
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_IDLE_PATH),
                frame_count: 8
            },
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_RUN_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_ATTACK1_PATH),
                frame_count: 4 
            },
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_ATTACK2_PATH),
                frame_count: 4 
            },
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_GUARD_PATH),
                frame_count: 6 
            }
        ];
    }

    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.attackAnimation = this.animations[STATE.ATTACK1][this.dir];
            this.animations[STATE.ATTACK1][this.dir].elapsedTime = 0;
            this.animations[STATE.ATTACK2][this.dir].elapsedTime = 0;
            this.attackElapsedTime = 0;
        }
    }

    update() {
        this.destX += this.velocity.x;
        this.destY += this.velocity.y;
        this.updateDirection();
        
        if (this.isAttacking) {
            this.attackElapsedTime += this.game.clockTick;
            console.log("Attack elapsed:", this.attackElapsedTime, "isAttacking:", this.isAttacking, "state:", this.state);
            
            // Determine which animation to play based on total elapsed time
            const attack1Duration = 4 * FRAME_DURATION; // 0.4 seconds
            
            if (this.attackElapsedTime < attack1Duration) {
                // Play ATTACK1
                this.state = STATE.ATTACK1;
                this.animations[STATE.ATTACK1][this.dir].elapsedTime = this.attackElapsedTime;
            } else if (this.attackElapsedTime < this.attackDuration) {
                // Play ATTACK2
                this.state = STATE.ATTACK2;
                this.animations[STATE.ATTACK2][this.dir].elapsedTime = this.attackElapsedTime - attack1Duration;
            } else {
                // Attack finished
                console.log("Attack finished");
                this.isAttacking = false;
                this.attackElapsedTime = 0;
                this.updateState();
            }
        } else {
            this.updateState();
        }
    }
}
