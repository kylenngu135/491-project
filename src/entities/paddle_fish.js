const PADDLE_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Idle.png";
const PADDLE_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Run.png";
const PADDLE_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Attack.png";

const PADDLE_FISH_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
}

class PaddleFish extends Enemy {
    constructor(game, x, y, target, debug) {
        super(game, PADDLE_FISH_STATE, 
              x, y, 
              192, 192, 
              PaddleFish.#getSpriteSheets(), 200, 
              target, 100, 
              5, [3,4,7,8], 
              new HurtBox(x + 192/2.5, y + 192/2.5, 40, 50), 
              new HitBox(x + 192/2, y + 192/4, 80, 100),
              75, {left: 192/10, right: 192/2 }, 
              debug
        );
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
