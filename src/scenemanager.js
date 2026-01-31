class SceneManager {
    constructor(game) {
        this.game = game;
        this.background = new Background();
        this.hero = new Warrior(this.game, 0, 0);
        this.minotaur = new Minotaur(this.game, 100, 25, this.hero);
        this.thief = new Thief(this.game, 250, 50, this.hero);
        this.lizard = new Lizard(this.game, 500, 20, this.hero);
        this.paddle_fish = new PaddleFish(this.game, 300, 70, this.hero);
        this.troll = new Troll(this.game, 500, 50, this.hero);
        this.shaman = new Shaman(this.game, 400, 30, this.hero);
        
        this.mainMenu = new MainMenu(this.game, this);
    }

    initGame(charType) {

        switch (charType) {
            case 'warrior':
                this.hero = new Warrior(this.game, 0, 0);
                break;
            case 'lancer':        
                this.hero = new Lancer(this.game, 0, 0);
                break;
            default:
                this.hero = new Lancer(this.game, 0, 0);
        }

        this.minotaur = new Minotaur(this.game, 100, 25, this.hero);
        this.thief = new Thief(this.game, 250, 50, this.hero);
        this.lizard = new Lizard(this.game, 500, 20, this.hero);
        this.paddle_fish = new PaddleFish(this.game, 300, 70, this.hero);
        this.troll = new Troll(this.game, 500, 50, this.hero);
        this.shaman = new Shaman(this.game, 400, 30, this.hero);
    }
    /*
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
    */

    draw(ctx) {
        if (this.mainMenu.active || this.mainMenu.charSelect.isActive()) {
            this.mainMenu.draw(ctx);
        } else {
            this.background.draw(ctx);
            this.thief.draw(ctx);
            this.paddle_fish.draw(ctx);
            this.lizard.draw(ctx);
            this.shaman.draw(ctx);
            this.minotaur.draw(ctx);
            this.troll.draw(ctx);
            this.hero.draw(ctx);
        }
    }

    update() {
        this.mainMenu.update();
        if (!this.mainMenu.active) {
            this.background.update();
            this.thief.update();
            this.lizard.update();
            this.paddle_fish.update();
            this.troll.update();
            this.minotaur.update();
            this.shaman.update();
            this.hero.update();
        }
    }
}
