class SceneManager {
    constructor(game) {
        this.game = game;
        this.background = new Background();
        this.main_character = new MainCharacter(this.game, 0, 0);
    }

    loadLevel() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.main_character);
    }

    draw(ctx) {
        this.background.draw(ctx);
        this.main_character.draw(ctx);
    }

    update() {
        this.background.update();
        this.main_character.update();
    }
}
