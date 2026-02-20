const LIZARD_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Idle.png";
const LIZARD_RUN_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Run.png";
const LIZARD_ATTACK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Attack.png";
const LIZARD_HIT_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Lizard/Lizard_Hit.png";


// TODO: Fix Lizard Hitbox sizing

class Lizard extends MeleeEnemy {
    constructor(game, x, y, target, debug) {
        super(game,
            x, y, 
            192, 192, 
            Lizard.#getSpriteSheets(), 200, 
            target, 200,
            5, [3],
            new HurtBox(x, y, 60, 80), 
            new HitBox(x, y, 100, 100),
            100, { x: 192/4, y: 50}, { x: 25, y: 40}, 5,
            "./assets/monsterSounds/lizardAttack.mp3",
            debug
        );
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

    updateHitbox() {
        let center = this.getCenter();
        this.hitbox.update(center.x - this.hitOffset.x, center.y - this.hitOffset.y);
    }
}
