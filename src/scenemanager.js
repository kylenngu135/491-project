class SceneManager {
    constructor(game) {

        this.debug = false;
        this.gameLaunched = false;
        this.game = game;
        this.background = new Background();
        this.mainMenu = new MainMenu(this.game, this);
        this.warrior = new Warrior(this.game, 0, 0, new BoundingCircles(0, 0, 42), this.debug);
        this.paddle_fish = new PaddleFish(this.game, 300, 70, this.warrior, new BoundingCircles(300, 70, 42), this.debug);
        // this.troll = new Troll(this.game, 500, 50, this.warrior, new BoundingCircles(500, 50, 42), this.debug);

        /*
        this.minotaur = new Minotaur(this.game, 100, 25, this.warrior, new BoundingCircles(100, 25, 42), this.debug);
        this.thief = new Thief(this.game, 250, 50, this.warrior, new BoundingCircles(250, 50, 42), this.debug);
        this.lizard = new Lizard(this.game, 500, 20, this.warrior, new BoundingCircles(500, 20, 42), this.debug);
        this.shaman = new Shaman(this.game, 400, 30, this.warrior, new BoundingCircles(400, 30, 42), this.debug);
        */

        //this.boundingbox = new BoundingBox(50, 50, 300, 300);
        
        /*
        //Sets an array so like they know whos in the screen if we dont do this we cant really have collision i dont think also from vids
        //video https://www.youtube.com/watch?v=dhoPTY-ogbk&list=PLRgsEjJNLnh7fqP4mVqP-h6fAnuOdx3l4&index=20 he has them in an array 
        
        //this.enemiesArray = [this.thief, this.warrior, this.minotaur, this.lizard, this.paddle_fish, this.troll];
        
        // It wasnt working earlier when i called enemies from the screen manager so i had to pass it in like this ig idk
        // i just looked up someshit ig
        /*
        this.minotaur.enemiesArray = this.enemiesArray;
        this.thief.enemiesArray = this.enemiesArray;
        this.lizard.enemiesArray = this.enemiesArray;
        this.paddle_fish.enemiesArray = this.enemiesArray;
        this.troll.enemiesArray = this.enemiesArray;
        */
    }

    loadLevel() {
        if (!this.mainMenu.active) {

            /*
            this.game.addEntity(this.thief);
            this.game.addEntity(this.troll);
            this.game.addEntity(this.minotaur);
            this.game.addEntity(this.paddle_fish);
            this.game.addEntity(this.lizard);
            this.game.addEntity(this.shaman);
            */

            this.game.addEntity(this.warrior);
            this.game.addEntity(this.paddle_fish);
            // this.game.addEntity(this.troll);
            this.game.addEntity(this.background);
        }
    }

    draw(ctx) {
        /*
        if (this.mainMenu.active) {
            this.mainMenu.draw(ctx);
        } else {
            this.background.draw(ctx);
            this.thief.draw(ctx);
            this.paddle_fish.draw(ctx);
            this.lizard.draw(ctx);
            this.shaman.draw(ctx);
            this.minotaur.draw(ctx);
            this.troll.draw(ctx);
            this.warrior.draw(ctx);
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
            this.warrior.update();
        }
        */
    }
}
