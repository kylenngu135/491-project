const LIZARD_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Idle.png";
const LIZARD_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Run.png";
const LIZARD_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Attack.png";
const LIZARD_HIT_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Hit.png";
const LIZARD_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2,
    Hit: 3
}
class Lizard extends Enemy {
    constructor(game, destX, destY, target, hitbox, debug) {
        super(game, LIZARD_STATE, 0, 0, 192, 192, destX, destY, 192, 192, Lizard.#getSpriteSheets(), 200, target, 200, 5, hitbox, debug);
    }
   
    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(LIZARD_IDLE_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(LIZARD_RUN_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(LIZARD_ATTACK_PATH),
                frame_count: 6
            },
            {
                sheet: ASSET_MANAGER.getAsset(LIZARD_HIT_PATH),
                frame_count: 2
            }
        ];
    }
}
