const SHAMAN_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Idle.png";
const SHAMAN_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Run.png";
const SHAMAN_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Shaman/Shaman_Attack.png";

const SHAMAN_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2
}

class Shaman extends Enemy {
    constructor(game, destX, destY, target) {
        super(game, SHAMAN_STATE, 0, 0, 192, 192, destX, destY, 192, 192, Shaman.#getSpriteSheets(), 200, target, 200);
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
