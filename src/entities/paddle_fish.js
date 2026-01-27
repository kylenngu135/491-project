const PADDLE_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Idle.png";
const PADDLE_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Run.png";
const PADDLE_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Attack.png";

const PADDLE_FISH_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
}

class PaddleFish extends Enemy {
    constructor(game, destX, destY, target) {
        super(game,  PADDLE_FISH_STATE , 0, 0, 192, 192, destX, destY, 192, 192, PaddleFish.#getSpriteSheets(), 200, target, 100);
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
}
