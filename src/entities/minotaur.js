const MINOTAUR_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Idle.png";
const MINOTAUR_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Walk.png";
const MINOTAUR_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Attack.png";
const MINOTAUR_GUARD_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Guard.png";

// TODO:Troll Club will be seperate with troll dead

const MINOTAUR_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2,
    GAURD: 3
}

// TODO: MAKE THIS NOT TERRIBLE

class Minotaur extends Enemy {
    constructor(game, x, y, target, debug) {
        super(game, MINOTAUR_STATE, 
              x, y, 
              320, 320, 
              Minotaur.#getSpriteSheets(), 200, 
              target, 150, 
              10, [3], 
              new HurtBox(x + 320/2.5, y + 320/3, 70, 100), 
              new HitBox(x + 320/2, y + 320/4, 120, 160), 150, 
              { left: 320/7, right: 320/2 }, debug
        );
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(MINOTAUR_IDLE_PATH),
                frame_count: 16
            },
            {
                sheet: ASSET_MANAGER.getAsset(MINOTAUR_RUN_PATH),
                frame_count: 8
            },
            {
                sheet: ASSET_MANAGER.getAsset(MINOTAUR_ATTACK_PATH),
                frame_count: 12
            },
            {
                sheet: ASSET_MANAGER.getAsset(MINOTAUR_GUARD_PATH),
                frame_count: 11
            }
        ];
    }
}
