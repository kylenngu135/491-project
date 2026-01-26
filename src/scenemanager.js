class SceneManager {
    constructor(game) {
        this.game = game;
        this.background = new Background();
        this.thief = new Thief(this.game, 250, 50);
        this.troll = new Troll(this.game, 500, 50);
        this.minotaur = new Minotaur(this.game, 100, 25);
        this.warrior = new Warrior(this.game, 0, 0);
    }

    loadLevel() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.thief);
        this.game.addEntity(this.troll);
        this.game.addEntity(this.minotaur);
        this.game.addEntity(this.warrior);
    }

    draw(ctx) {
        this.background.draw(ctx);
        this.thief.draw(ctx);
        this.troll.draw(ctx);
        this.minotaur.draw(ctx);
        this.warrior.draw(ctx);
    }

    update() {
        this.background.update();
        this.thief.update();
        this.troll.update();
        this.minotaur.update();
        this.warrior.update();
    }
}
