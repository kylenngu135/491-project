const MINOTAUR_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Idle.png";
const MINOTAUR_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Walk.png";
const MINOTAUR_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Attack.png";
const MINOTAUR_GUARD_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Minotaur/Minotaur_Guard.png";

class Minotaur extends MeleeEnemy {
    constructor(game, x, y, target, debug) {
        super(game,
              x, y, 
              320, 320, 
              Minotaur.#getSpriteSheets(), 200, 
              target, 150, 
              10, [6], 
              new HurtBox(x, y, 70, 100), new HitBox(x, y, 120, 160), 
              150, { x: 117, y: 90}, 
              { x: 35, y: 60}, 10,
              "./assets/monsterSounds/cowAttack.mp3", debug
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
