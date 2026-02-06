const THIEF_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Idle.png";
const THIEF_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Run.png";
const THIEF_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Attack.png";

class Thief extends MeleeEnemy {
    constructor(game, x, y, target, debug) {
        super(game, 
            x, y,
            192, 192, 
            Thief.#getSpriteSheets(), 200, 
            target, 250, 
            4, [3], 
            new HurtBox(x + 192/2.5, y + 192/2.5, 40, 50), 
            new HitBox(x + 192/2, y + 192/4, 60, 80), 50,
            { x: 192/3.25, y: 42.5 }, { x: 20, y: 30}, 
            "./assets/monsterSounds/thiefAttack.mp3",
            debug
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
