const TROLL_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Idle.png";
const TROLL_WALK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Walk.png";
const TROLL_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Attack.png";
const TROLL_WINDUP_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Windup.png";
const TROLL_DEAD_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Troll/Troll_Dead.png";

// TODO:Troll Club will be seperate with troll dead

const TROLL_STATE = {
    IDLE: 0,
    WALK: 1,
    ATTACK: 2,
    WINDUP: 3,
    DEAD: 4
}

class Troll extends Entity {
    constructor(game, destX, destY) {
        super(game, TROLL_STATE, 0, 0, 384, 384, destX, destY, 192, 192, Troll.#getSpriteSheets());
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_IDLE_PATH),
                frame_count: 12
            },
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_WALK_PATH),
                frame_count: 10
            },
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_ATTACK_PATH),
                frame_count: 6
            },
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_WINDUP_PATH),
                frame_count: 5
            },
            {
                sheet: ASSET_MANAGER.getAsset(TROLL_DEAD_PATH),
                frame_count: 10
            }
        ];
    }
}
