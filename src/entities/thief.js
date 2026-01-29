const THIEF_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Idle.png";
const THIEF_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Run.png";
const THIEF_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Thief/Thief_Attack.png";

const THIEF_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
}

class Thief extends Enemy {
    constructor(game, destX, destY, target) {
        super(game, THIEF_STATE, 0, 0, 192, 192, destX, destY, 192, 192, Thief.#getSpriteSheets(), 200, target, 250, 4);
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
