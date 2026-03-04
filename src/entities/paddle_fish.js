const PADDLE_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Idle.png";
const PADDLE_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Run.png";
const PADDLE_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Paddle Fish/PaddleFish_Attack.png";

class PaddleFish extends MeleeEnemy {
    constructor(game, x, y, target, debug) {
        super(game,
              x, y, 
              192, 192, 
              PaddleFish.#getSpriteSheets(), 200, 
              target, 300, 
              5, [3],
              new HurtBox(x, y, 55, 60), 
              new HitBox(x, y, 50, 100), 75, 
              { x: 192/2.35 - 30, y: 50 }, { x: 30, y: 30 }, 2,
              "./assets/monsterSounds/paddleAttack.mp3",
              debug
        );
        this.stunDuration = 500;
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
