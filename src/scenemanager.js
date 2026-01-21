class SceneManager {
    constructor(game) {
        this.game = game;
        this.main_character = new MainCharacter(this.game, 0, 0);
    }

    loadLevel() {
        this.game.addEntity(this.main_character);
    }

    draw(ctx) {
        this.main_character.draw(ctx);
    }

    update() {
        this.main_character.update();
    }
}
