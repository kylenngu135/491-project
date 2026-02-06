class SceneManager {
    constructor(game) {
        this.debug = true; // Set to true to see debug info
        this.gameLaunched = false;
        this.game = game;
        this.background = new Background();
        this.mainMenu = new MainMenu(this.game, this);

        //camera properties
        this.camera = {
            x: 0,
            y: 0,
            width: 800,  // Match canvas width
            height: 600, // Match canvas height
            // World bounds - the area the camera can move within
            bounds: {
                minX: 0,
                maxX: 5000, // Match your background size
                minY: 0,
                maxY: 5000,
                width: 5000,
                height: 5000
            }
        };
                
        this.hero = null;
        this.troll = null;
        this.paddle_fish = null;
        this.lizard = null;
        this.shaman = null;
        this.thief = null;
        this.minotaur = null;
    }

    init() {
        this.game.addEntity(this.mainMenu);
    }


    initGame(charType) {
        // Start hero in the middle of the world
        const startX = this.camera.bounds.width / 2;
        const startY = this.camera.bounds.height / 2;

        switch (charType) {
            case 'warrior':
                this.hero = new Warrior(this.game, startX, startY);
                break;
            case 'lancer':        
                this.hero = new Lancer(this.game, startX, startY);
                break;
            default:
                this.hero = new Lancer(this.game, startX, startY);
        }

        // Place enemies around the hero
        this.minotaur = new Minotaur(this.game, startX + 100, startY + 25, this.hero, new BoundingCircles(startX + 100, startY + 25, 42), this.debug);
        this.thief = new Thief(this.game, startX + 250, startY + 50, this.hero, new BoundingCircles(startX + 250, startY + 50, 42), this.debug);
        this.lizard = new Lizard(this.game, startX + 500, startY + 20, this.hero, new BoundingCircles(startX + 500, startY + 20, 42), this.debug);
        this.paddle_fish = new PaddleFish(this.game, startX + 300, startY + 70, this.hero, new BoundingCircles(startX + 300, startY + 70, 42), this.debug);
        this.troll = new Troll(this.game, startX + 500, startY + 50, this.hero, new BoundingCircles(startX + 500, startY + 50, 42), this.debug);
        this.shaman = new Shaman(this.game, startX + 400, startY + 30, this.hero, new BoundingCircles(startX + 400, startY + 30, 42), this.debug);

        this.updateCamera();
    }

    updateCamera() {
        if (this.hero) {
            // Always center camera on hero - no clamping
            this.camera.x = this.hero.destX - this.camera.width / 2.8;
            this.camera.y = this.hero.destY - this.camera.height / 3.3;

            // debug pos
            console.log(`Hero pos: (${Math.floor(this.hero.destX)}, ${Math.floor(this.hero.destY)}), Camera: (${Math.floor(this.camera.x)}, ${Math.floor(this.camera.y)})`);
        }
    }

    // Get world bounds for collision detection
    getWorldBounds() {
        return this.camera.bounds;
    }

    // Helper method to convert world coordinates to screen coordinates
    worldToScreen(x, y) {
        return {
            x: x - this.camera.x,
            y: y - this.camera.y
        };
    }
    
    // Helper method to convert screen coordinates to world coordinates
    screenToWorld(x, y) {
        return {
            x: x + this.camera.x,
            y: y + this.camera.y
        };
    }
    
    // Method to check if an entity is in the camera view
    isInView(x, y, width, height) {
        return x + width > this.camera.x && 
               x < this.camera.x + this.camera.width &&
               y + height > this.camera.y && 
               y < this.camera.y + this.camera.height;
    }
    
    loadLevel() {
        // this.game.entities = [];
        // this.game.addEntity(this);
        this.game.addEntity(this.hero);
        // this.game.addEntity(this.troll);
        this.game.addEntity(this.thief);
        this.game.addEntity(this.troll);
        this.game.addEntity(this.minotaur);
        this.game.addEntity(this.paddle_fish);
        this.game.addEntity(this.lizard);
        this.game.addEntity(this.shaman);
        this.game.addEntity(this.background);
         
        
        
        // this.game.addEntity(this.mainMenu);

        /*
        if (this.hero) {
            this.game.addEntity(this.hero);
            console.log("hero is here");
        }
        */
        // this.game.addEntity(this.paddle_fish);
        
        /*
        if (this.troll) {
            this.game.addEntity(this.troll);
        }
        */

        // this.game.addEntity(this.background);
        this.updateCamera();
    }
    
    draw(ctx) {
        // Draw UI elements (like main menu) without camera transformation
        if (this.mainMenu.active || this.mainMenu.charSelect.isActive()) {
            this.mainMenu.draw(ctx);
        }
    }
    //updates the audio for the game for rn
    updateAudio(){
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    }
    update() {
        this.updateCamera();
        this.updateAudio();
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