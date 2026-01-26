const TROLL_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Idle.png";
const TROLL_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Walk.png";
const TROLL_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Attack.png";
const TROLL_WINDUP_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Windup.png";
const TROLL_DEAD_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Dead.png";

// TODO:Troll Club will be seperate with troll dead

const TROLL_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2,
    WINDUP: 3,
    DEAD: 4
}

class Troll extends Entity {
    constructor(game, destX, destY, target) {
        super(game, TROLL_STATE, 0, 0, 384, 384, destX, destY, 192, 192, Troll.#getSpriteSheets());

        // i dont have anything for this rn but it will be how far the lizard can see 
        this.visualRadius = 200;
        this.target = target;
        //this is in the video
        this.maxSpeed = 150;
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
            }
        ];
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
        this.state = TROLL_STATE.RUN;
        
        // Stop moving if really close to the warrior we need to change this later maybe make a monster file that
        // extends entities and then extend that to monsters 
        if(dist < 5){
            this.velocity = { x: 0, y: 0 };
            this.state = TROLL_STATE.IDLE;
        }
    
        this.updateDirection();
    }

    // Helper method to calculate distance between two entities using Pythagorean theorem this is what i am assuming it is doiing in the vid
    // i just looked up how and this is it. 
    distance(entity1, entity2) {
        var dx = entity1.destX - entity2.destX;
        var dy = entity1.destY - entity2.destY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
