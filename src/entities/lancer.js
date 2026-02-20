const LANCER_IDLE_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Lancer/Lancer_Idle.png";
const LANCER_RUN_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Lancer/Lancer_Run.png";
const LANCER_ATTACK1_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Lancer/Lancer_Right_Attack.png";
const LANCER_GUARD_PATH = "./assets/Tiny Swords (Free Pack)/Units/Blue Units/Lancer/Lancer_Right_Defence.png";
const LANCER_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK1: 2,
    ATTACK2: 3,
    GUARD: 4
}

class Lancer extends Hero {
    constructor(game, x, y, debug) {
        super(
            game, LANCER_STATE, 
            x, y, 
            320, 320, 
            Lancer.#getSpriteSheets(), false, 
            null, 6 * FRAME_DURATION, 
            [2],  // attack frame(s)
            new HurtBox(x, y, 30, 45),
            new HitBox(x, y, 150, 30), 100, 
            { x: 150, y: 0 }, { x: 15, y: 15 },
            1.15, debug
        );    
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(LANCER_IDLE_PATH),
                frame_count: 12
            },
            {
                sheet: ASSET_MANAGER.getAsset(LANCER_RUN_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(LANCER_ATTACK1_PATH),
                frame_count: 3
            },
            {
                sheet: ASSET_MANAGER.getAsset(LANCER_ATTACK1_PATH),
                frame_count: 3
            },
            {
                sheet: ASSET_MANAGER.getAsset(LANCER_GUARD_PATH),
                frame_count: 6 
            }
        ];
    }
}
