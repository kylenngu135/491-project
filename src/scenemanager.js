class SceneManager {
    constructor(game) {
        this.debug = false;
        this.gameLaunched = false;
        this.game = game;
        this.background = new Background();
        this.mainMenu = new MainMenu(this.game, this);
                
        this.hero = null;
        this.troll = null;
    }

    init() {
        this.game.addEntity(this.mainMenu);
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

        // this.minotaur = new Minotaur(this.game, 100, 25, this.hero);
        // this.thief = new Thief(this.game, 250, 50, this.hero);
        // this.lizard = new Lizard(this.game, 500, 20, this.hero);
        // this.paddle_fish = new PaddleFish(this.game, 300, 70, this.hero);
        this.troll = new Troll(this.game, 500, 50, this.hero);
        // this.shaman = new Shaman(this.game, 400, 30, this.hero);
    }
    
    loadLevel() {

        this.game.entities = [];
        this.game.addEntity(this);
        
        this.game.addEntity(this.mainMenu);
        /*
        this.game.addEntity(this.thief);
        this.game.addEntity(this.troll);
        this.game.addEntity(this.minotaur);
        this.game.addEntity(this.paddle_fish);
        this.game.addEntity(this.lizard);
        this.game.addEntity(this.shaman);
        */

        if (this.hero) {
            this.game.addEntity(this.hero);
            console.log("heri is here");
        }
        // this.game.addEntity(this.paddle_fish);
        
        if (this.troll) {
            this.game.addEntity(this.troll);
        }

        this.game.addEntity(this.background);
    }

    draw(ctx) {
    /*
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
        */
    }

    update() {
        /*
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
        */
    }
}
