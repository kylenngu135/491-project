const SHAMAN_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Idle.png";
const SHAMAN_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Run.png";
const SHAMAN_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Attack.png";
const SHAMAN_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
}
class Shaman extends Enemy {
    constructor(game, x, y, target, debug) {
        super(game, SHAMAN_STATE, 
            x, y, 
            192, 192, 
            Shaman.#getSpriteSheets(), 200, 
            target, 200, 
            9, [3],
            new HurtBox(x + 192/2.5, y + 192/2.5, 40, 50), 
            new HitBox(x + 192/2, y + 192/4, 80, 100),
            50, {left: 0, right: 0}, 4,
            "./assets/monsterSounds/shamanAttack.mp3",
            debug
        );
    }
    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(SHAMAN_IDLE_PATH),
                frame_count: 8 
            },
            {
                sheet: ASSET_MANAGER.getAsset(SHAMAN_RUN_PATH),
                frame_count: 4 
            },
            {
                sheet: ASSET_MANAGER.getAsset(SHAMAN_ATTACK_PATH),
                frame_count: 10
            }
        ];
    }
}