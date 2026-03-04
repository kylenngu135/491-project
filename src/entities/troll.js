const TROLL_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Idle.png";
const TROLL_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Walk.png";
const TROLL_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Attack.png";
const TROLL_WINDUP_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Windup.png";
const TROLL_DEAD_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Dead.png";
const TROLL_RECOVER_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Recovery.png";

// TODO:Troll Club will be seperate with troll dead

const TROLL_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2,
    WINDUP: 3,
    DEAD: 4,
    RECOVER: 5
};

const CHARGE_ATTACK_COOLDOWN = 10; 

const BASIC_WINDUP_TIME = 0.25;

const CHARGE_WINDUP_TIME = 0.8;

const ATTACK_TYPE = {
    BASIC: 0,
    CHARGED: 1
};

// TODO: WORK ON TROLL LATER

class Troll extends Enemy {
    constructor(game, x, y, target, debug) {
        super(
            game, TROLL_STATE, 
            x, y, 
            384, 384, 
            Troll.#getSpriteSheets(), 200, 
            target, 150, 
            5, [3], 
            new HurtBox(x, y, 140, 180), 
            new HitBox(x, y, 120, 180), 500,
            { x: 120, y: 100 }, { x: 70, y: 100 }, 50,
            "", 
            debug, 5
        );

        // these are the sounds that the troll needs
        this.trollLaugh = ASSET_MANAGER.cache["./assets/monsterSounds/trollLaugh.mp3"];
        this.trollLaugh.currentTime = 1.0;
        this.trollTired = ASSET_MANAGER.cache["./assets/monsterSounds/tired.mp3"];
        this.trollTired.currentTime = 1.0;
    
        this.attackState = {
            CHASE: 0,
            WIND_UP: 1,
            CHARGE: 2,
            RECOVERING: 3

        };

        this.currentAttack = ATTACK_TYPE.CHARGED;
        this.currentAction = this.attackState.CHASE;
        this.chargeAttackCooldown = 0;
        this.windupTimer = 0;
        this.attackCooldownTimer = 0;
        this.heroLocation = { x: 0, y: 0 };
        this.offset = { x: 0, y: 0 };
    }

    update() {
        if (this.chargeAttackCooldown > 0) {
            this.chargeAttackCooldown -= this.game.clockTick;
        } else {
            this.currentAttack = ATTACK_TYPE.CHARGED;
        }

        if (this.windupTimer > 0) {
            this.windupTimer -= this.game.clockTick;
        }

        // this checks to see if the warrior is on the same y axis but i dont think i am doing it right low key
        
        let troll_center = this.getCenter();
        let target_center = this.target.getCenter();

        if (this.currentAttack === ATTACK_TYPE.CHARGED) {
            if (
                Math.abs(target_center.y - troll_center.y) < 200 && 
                Math.abs(target_center.x - troll_center.x) < 400 && 
                this.currentAction === this.attackState.CHASE
            ) {
                this.currentAction = this.attackState.WIND_UP;
                this.state = this.states.WINDUP;
                this.animations[this.state][this.dir].reset();
                this.windupTimer = CHARGE_WINDUP_TIME;

                //plays the attack here so the sounds has more time to play
                // this.trollLaugh.play();
            }
        } else {
            if (this.hitbox.collide(this.target.hurtbox) &&
                this.currentAction === this.attackState.CHASE &&
                this.attackCooldownTimer === 0
            ) {
                this.currentAction = this.attackState.WIND_UP;
                this.state = this.states.WINDUP;
                this.animations[this.state][this.dir].reset();
                this.windupTimer = BASIC_WINDUP_TIME;
            }
        }

        if (this.currentAction !== this.attackState.CHASE) {
            if(this.currentAction === this.attackState.WIND_UP) {
                // this makes it so that it lets the troll finish tha animation before going on to the next step
                // in the animator class theres 2 functions 1 being isDone(); which basiclly returns true when the animation is done
                // and the problem with that is that there is a loop going on so it is never true we need to fix that
                // and the one i am using which is current frame which says he this is the frame we are on
                // since wind up has 5 frames i set this to be 5 frames type shit
                
                if(this.animations[this.state][this.dir].currentFrame() === 4 && !this.animations[this.state][this.dir].isPaused) {
                    this.animations[this.state][this.dir].pause();

                }

                if (this.windupTimer <= 0.25 && this.windupTimer > 0.2) {
                    let tar_center = this.target.getCenter();
                    let center = this.getCenter();
                    this.offset = { x: tar_center.x - center.x, y: tar_center.y - center.y };
                }
               
                if (this.windupTimer <= 0) {  
                    this.animations[this.state][this.dir].unpause();
                    this.animations[this.state][this.dir]
                    this.currentAction = this.attackState.CHARGE;
                    this.state = this.states.ATTACK;
                    this.animations[this.state][this.dir].reset();
                }
            }

            if(this.currentAction === this.attackState.CHARGE) {
                // this is basiclly saying how far it goings when it charges 
                if (this.currentAttack === ATTACK_TYPE.CHARGED) {
                    this.x += this.offset.x * 0.0455;
                    this.y += this.offset.y * 0.0455;
                }   
                // same thing up above 
                
                if(this.animations[this.state][this.dir].currentFrame() === 5){  
                    this.currentAction = this.attackState.RECOVERING;
                    this.state = this.states.RECOVER;
                    this.animations[this.state][this.dir].reset();
                    this.chargeAttackCooldown = CHARGE_ATTACK_COOLDOWN;
                }
            }

            // we might want to change the tick speed for this animation for it to work. 
            if(this.currentAction === this.attackState.RECOVERING) {
                //stops then starts the next sound which is the out of breathe sound
                // this.trollLaugh.pause();
                this.trollLaugh.currentTime = 1.0;
                // this.trollTired.play();
                if(this.animations[this.state][this.dir].currentFrame() === 9){  
                    this.currentAction = this.attackState.CHASE;
                    this.state = this.states.RUN;
                    this.currentAttack = ATTACK_TYPE.BASIC;
                }
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
            if(dist < 5) {
                this.velocity = { x: 0, y: 0 };
                this.state = this.states.IDLE;
            }
        }

        this.updateDirection();
        super.update();
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_IDLE_PATH),
                frame_count: 12
            },
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_RUN_PATH),
                frame_count: 10
            },
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_ATTACK_PATH),
                frame_count: 6
            },
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_WINDUP_PATH),
                frame_count: 5
            },
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_DEAD_PATH),
                frame_count: 10
            }, 
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_RECOVER_PATH),
                frame_count: 10
            }
        ];
    }
}
