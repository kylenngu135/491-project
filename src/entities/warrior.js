const WARRIOR_IDLE_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Idle.png";
const WARRIOR_RUN_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Run.png";
const WARRIOR_ATTACK1_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Attack1.png";
const WARRIOR_ATTACK2_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Attack2.png";
const WARRIOR_GUARD_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Warrior/Warrior_Guard.png";

const STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK1: 2,
    ATTACK2: 3,
    GUARD: 4
}


class Warrior extends Entity {
    constructor(game, destX, destY) {
        super(game, STATE, 0, 0, destX, destY, 192, 192, Warrior.#getSpriteSheets());
        // this.game.warrior = this;
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_IDLE_PATH),
                frame_count: 8
            },
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_RUN_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_ATTACK1_PATH),
                frame_count: 4 
            },
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_ATTACK2_PATH),
                frame_count: 4 
            },
            {
                sheet: ASSET_MANAGER.getAsset(WARRIOR_GUARD_PATH),
                frame_count: 6 
            }
        ];
    }
}
