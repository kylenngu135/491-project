const GNOLL_IDLE_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Gnoll/Gnoll_Idle.png";
const GNOLL_WALK_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Gnoll/Gnoll_Walk.png";
const GNOLL_THROW_PATH = "./assets/Tiny Swords (Enemy Pack)/Enemy Pack/Gnoll/Gnoll_Throw.png";

const GNOLL_STATE = {
    IDLE: 0,
    WALK: 1,
    THROW: 2
}

class Gnoll extends Entity {
    constructor(game, destX, destY) {
        super(game, GNOLL_STATE, 0, 0, 192, 192, destX, destY, 192, 192, Gnoll.#getSpriteSheets());
    }

    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(GNOLL_IDLE_PATH),
                frame_count: 6 
            },
            {
                sheet: ASSET_MANAGER.getAsset(GNOLL_WALK_PATH),
                frame_count: 8
            },
            {
                sheet: ASSET_MANAGER.getAsset(GNOLL_THROW_PATH),
                frame_count: 8
            }
        ];
    }
}
