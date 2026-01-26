const PADDLE_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Idle.png";
const PADDLE_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Run.png";
const PADDLE_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Attack.png";

const PADDLE_FISH_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
}

class PaddleFish extends Entity {
    constructor(game, destX, destY, target) {
        super(game,  PADDLE_FISH_STATE , 0, 0, 192, 192, destX, destY, 192, 192, PaddleFish.#getSpriteSheets());
        this.visualRadius = 200;
        this.target = target;
        this.maxSpeed = 100;
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(PADDLE_IDLE_PATH),
                frame_count: 8
            },
            {
                sheet: ASSET_MANAGER.getAsset(PADDLE_RUN_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(PADDLE_ATTACK_PATH),
                frame_count: 6
            }
        ];
    }
    update(){
        var dist = this.distance(this, this.target);

         this.velocity = { 
                x: (this.target.destX - this.destX) / dist * this.maxSpeed,
                y: (this.target.destY - this.destY) / dist * this.maxSpeed 
            };
            this.destX += this.velocity.x * this.game.clockTick;
            this.destY += this.velocity.y * this.game.clockTick;
            this.state = LIZARD_STATE.RUN;
            if(dist < 5){
                this.velocity = { x: 0, y: 0 };
                this.state = LIZARD_STATE.IDLE;
            }
            this.updateDirection();

    }

    distance(entity1, entity2) {
        var dx = entity1.destX - entity2.destX;
        var dy = entity1.destY - entity2.destY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
