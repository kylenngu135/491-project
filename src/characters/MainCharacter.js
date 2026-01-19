class MainCharacter {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.game.mainCharacter = this;
        
        this.spritesheet = ASSET_MANAGER.getAsset("../assets/16x16/16x16 Idle-Sheet.png");

        console.log(this.spritesheet)

    }

    draw(ctx) {


        ctx.drawImage(this.spritesheet, 0, 0);

        // ctx.drawImage(this.spritesheet, 0, 0, 810, 376);
    }

    update() {
        
    }
}
