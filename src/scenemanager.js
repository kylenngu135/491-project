class SceneManager {
    constructor(game) {
        this.game = game;
        this.background = new Background();
        this.warrior = new Warrior(this.game, 0, 0);
        //this.warrior = new Lancer(this.game, 0, 0);
        this.minotaur = new Minotaur(this.game, 100, 25, this.warrior);
        this.thief = new Thief(this.game, 250, 50, this.warrior);
        this.lizard = new Lizard(this.game, 500, 20, this.warrior);
        this.paddle_fish = new PaddleFish(this.game, 300, 70, this.warrior);
        this.troll = new Troll(this.game, 500, 50, this.warrior);
        this.shaman = new Shaman(this.game, 400, 30, this.warrior);
        
    }

    loadLevel() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.thief);
        this.game.addEntity(this.troll);
        this.game.addEntity(this.minotaur);
        this.game.addEntity(this.paddle_fish);
        this.game.addEntity(this.lizard);
        this.game.addEntity(this.warrior);
        this.game.addEntity(this.shaman);
    }

    draw(ctx) {
        this.background.draw(ctx);
        this.thief.draw(ctx);
        this.paddle_fish.draw(ctx);
        this.lizard.draw(ctx);
        this.troll.draw(ctx);
        this.shaman.draw(ctx);
        this.minotaur.draw(ctx);
        this.warrior.draw(ctx);
    }

    update() {
        this.background.update();
        this.thief.update();
        this.lizard.update();
        this.paddle_fish.update();
        this.troll.update();
        this.minotaur.update();
        this.warrior.update();
        this.shaman.update();
    }
}
