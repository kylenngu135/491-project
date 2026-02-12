const THIEF_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Idle.png";
const THIEF_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Run.png";
const THIEF_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Attack.png";

const THIEF_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
}

class Thief extends Enemy {
    constructor(game, x, y, target, debug) {
        super(game, THIEF_STATE, 
            x, y,
            192, 192, 
            Thief.#getSpriteSheets(), 200, 
            target, 250, 
            4, [3], 
            new HurtBox(x + 192/2.5, y + 192/2.5, 40, 50), 
            new HitBox(x + 192/2, y + 192/4, 60, 80), 50,
            { left: 192/5, right: 192/2 }, debug
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
