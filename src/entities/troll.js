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
}

// TODO: WORK ON TROLL LATER

class Troll extends Enemy {
    constructor(game, x, y, target, debug) {
        super(game, TROLL_STATE, 
            x, y, 
            384, 384, 
            Troll.#getSpriteSheets(), 
            200, target, 
            150, [3], 
            new HurtBox(x + 384/2.5, y + 384/2.5, 80, 100), 
            new HitBox(x + 384/2, y + 384/4, 150, 200),
            300, {left: 0, right: 0}, 20,
            null,
            debug);
        
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
        this.currentAction = this.attackState.CHASE;
    }

    update(){

        if(Math.abs(this.target.y - this.y) < 50  && Math.abs(this.target.x - this.x) < 300
         && this.currentAction === this.attackState.CHASE){
            this.currentAction = this.attackState.WIND_UP;  
            this.state = this.states.WINDUP;
            this.animations[this.state][this.dir].reset();
            this.trollLaugh.play();

        }

        if(this.currentAction === this.attackState.WIND_UP){
           
            if(this.animations[this.state][this.dir].currentFrame() === 4 ){  
                this.currentAction = this.attackState.CHARGE;
                this.state = this.states.ATTACK;
                this.animations[this.state][this.dir].reset();
            }
        }

        if(this.currentAction === this.attackState.CHARGE){
            if(this.dir === DIR.LEFT){
                this.x += -20;
            }
            if(this.dir === DIR.RIGHT){
                this.x += 20;
            }
            
            if(this.animations[this.state][this.dir].currentFrame() === 5){  
                this.currentAction = this.attackState.RECOVERING;
                this.state = this.states.RECOVER;
                this.animations[this.state][this.dir].reset();
            }
        }

        if(this.currentAction === this.attackState.RECOVERING){
            this.trollLaugh.pause();
            this.trollLaugh.currentTime = 1.0;
            this.trollTired.play();
            if(this.animations[this.state][this.dir].currentFrame() === 9 ){  
                this.currentAction = this.attackState.CHASE;
                this.state = this.states.RUN;
            }
        }

        if(this.currentAction === this.attackState.CHASE){
            this.trollTired.pause();
            this.trollTired.currentTime = 1.0;
                super.update();
        }
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
            }, {
                sheet: ASSET_MANAGER.getAsset(TROLL_RECOVER_PATH),
                frame_count: 10
            }
        ];
    }
}