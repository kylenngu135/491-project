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


class Troll extends Enemy {
    constructor(game, destX, destY, target, hitbox, debug) {
        super(game, TROLL_STATE, 0, 0, 384, 384, destX, destY, 192, 192, Troll.#getSpriteSheets(), 200, target, 150, hitbox, 300, debug);
        
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
        this.currentAction = this.attackState.CHASE;
    }

    update(){

        // this checks to see if the warrior is on the same y axis but i dont think i am doing it right low key
         if(Math.abs(this.target.destY - this.destY) < 50  && Math.abs(this.target.destX - this.destX) < 300
         && this.currentAction === this.attackState.CHASE){
            this.currentAction = this.attackState.WIND_UP;  
            this.state = this.states.WINDUP;
            this.animations[this.state][this.dir].reset();
            //plays the attack here so the sounds has more time to play
             this.trollLaugh.play();

        }

        if(this.currentAction === this.attackState.WIND_UP){
            // this makes it so that it lets the troll finish tha animation before going on to the next step
            // in the animator class theres 2 functions 1 being isDone(); which basiclly returns true when the animation is done
            // and the problem with that is that there is a loop going on so it is never true we need to fix that
            // and the one i am using which is current frame which says he this is the frame we are on
            // since wind up has 5 frames i set this to be 5 frames type shit
           
            if(this.animations[this.state][this.dir].currentFrame() === 4 ){  
                this.currentAction = this.attackState.CHARGE;
                this.state = this.states.ATTACK;
                this.animations[this.state][this.dir].reset();
            }
        }

        if(this.currentAction === this.attackState.CHARGE){
        // this is basiclly saying how far it goings when it charges 
            if(this.dir === DIR.LEFT){
                this.destX += -20;
            }
            if(this.dir === DIR.RIGHT){
                this.destX += 20;
            }
            // same thing up above 
            
            if(this.animations[this.state][this.dir].currentFrame() === 5){  
                this.currentAction = this.attackState.RECOVERING;
                this.state = this.states.RECOVER;
                this.animations[this.state][this.dir].reset();
            }
        }

        // we might want to change the tick speed for this animation for it to work. 
        if(this.currentAction === this.attackState.RECOVERING){
            //stops then starts the next sound which is the out of breathe sound
            this.trollLaugh.pause();
            this.trollLaugh.currentTime = 1.0;
            this.trollTired.play();
            if(this.animations[this.state][this.dir].currentFrame() === 9 ){  
                this.currentAction = this.attackState.CHASE;
                this.state = this.states.RUN;
            }
        }

        // this is so the super.update doesnt override any of my code 
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
