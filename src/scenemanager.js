class SceneManager {
    constructor(game) {
        this.game = game;
        this.main_character = new MainCharacter(this.game, 0, 0);
    }

    loadLevel() {
        this.game.addEntity(this.main_character);
    }

    draw(ctx) {
        for (var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
    }
}
