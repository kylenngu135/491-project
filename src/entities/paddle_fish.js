const PADDLE_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Idle.png";
const PADDLE_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Run.png";
const PADDLE_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Attack.png";

class PaddleFish extends MeleeEnemy {
    constructor(game, x, y, target, debug) {
        super(game,
              x, y, 
              192, 192, 
              PaddleFish.#getSpriteSheets(), 200, 
              target, 100, 
              5, [3], 
              new HurtBox(x, y, 40, 50), 
              new HitBox(x, y, 80, 100),
              75, { x: 192/2.35, y: 50 }, { x: 20, y: 25},
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
