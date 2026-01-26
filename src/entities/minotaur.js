const MINOTAUR_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Idle.png";
const MINOTAUR_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Walk.png";
const MINOTAUR_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Attack.png";
const MINOTAUR_GUARD_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Guard.png";

// TODO:Troll Club will be seperate with troll dead

const MINOTAUR_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2,
    GAURD: 3
}

class Minotaur extends Entity {
    constructor(game, destX, destY, target) {
        super(game, MINOTAUR_STATE, 0, 0, 320, 320, destX, destY, 192, 192, Minotaur.#getSpriteSheets());

        // i dont have anything for this rn but it will be how far the lizard can see 
        this.visualRadius = 200;
        this.target = target;
        //this is in the video
        this.maxSpeed = 150;
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(MINOTAUR_IDLE_PATH),
                frame_count: 16
            },
            {
                sheet: ASSET_MANAGER.getAsset(MINOTAUR_RUN_PATH),
                frame_count: 8
            },
            {
                sheet: ASSET_MANAGER.getAsset(MINOTAUR_ATTACK_PATH),
                frame_count: 12
            },
            {
                sheet: ASSET_MANAGER.getAsset(MINOTAUR_GUARD_PATH),
                frame_count: 11
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
        this.state = MINOTAUR_STATE.RUN;
        
        // Stop moving if really close to the warrior we need to change this later maybe make a monster file that
        // extends entities and then extend that to monsters 
        if(dist < 5){
            this.velocity = { x: 0, y: 0 };
            this.state = MINOTAUR_STATE.IDLE;
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
