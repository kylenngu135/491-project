const THIEF_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Idle.png";
const THIEF_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Run.png";
const THIEF_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Attack.png";

class Thief extends MeleeEnemy {
    constructor(game, x, y, target, debug) {
        super(game, 
            x, y,
            192, 192, 
            Thief.#getSpriteSheets(), 200, 
            target, 500, 
            4, [3],
            new HurtBox(x, y, 40, 80),  new HitBox(x, y, 50, 60), 
            50, { x: 192/4, y: /* 42.5 */ 35 }, 
            { x: 20, y: 45}, 4,
            "./assets/monsterSounds/thiefAttack.mp3", debug
        );
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(THIEF_IDLE_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(THIEF_RUN_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(THIEF_ATTACK_PATH),
                frame_count: 6
            }
        ];
    }
}
