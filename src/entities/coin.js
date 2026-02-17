/* problems i am having so far: the coin wont appear. 
    I am assuming everything else is working because when i tested it to see if it was tracking it was then it was disappear
    like its supposed to if you see the coin so there are 2 answers to why this is happening number 1 the hero is too close and
    the coin gets eaten too quickly to spawn or 2 its just not being drawn. i will ask for some help from who ever is free probobly \
    khalid bc kylen is dying with the hurt boxes. also khalid did the world spawn so it would be best to ask him for help
*/


// used the same logic as the other stuf
const COIN_MOVING = "./assets/other/coin1_16x16.png";
const COIN_STATE = {
    IDLE: 0  
};
// same logic
class Coin {
    constructor(game, x, y, hero, value, debug) {
        Object.assign(this, {game, x, y, hero, value, debug});

        this.hero = hero;
        this.value = value;
        this.magnetRange = 200;  
        this.maxSpeed = 300;
        this.animation = this.loadAnimation();
        this.removeFromWorld = false;
    }

    draw(ctx) {
        this.animation
    }

    update() {
        var dist = this.distance(this, this.hero);
       
        if (dist < 20) {                    
            this.hero.addMoney(this.value);
            this.deleteEntity();
        }
        
       
        if (dist < this.magnetRange) {
            this.velocity = {
                x: ((this.hero.x - this.x) / dist * this.maxSpeed) * this.game.clockTick,
                y: ((this.hero.y - this.y) / dist * this.maxSpeed) * this.game.clockTick
            };
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    }
    
    // same logic as enim
    distance(entity1, entity2) {
        var dx = entity1.x - entity2.x;
        var dy = entity1.y - entity2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // waht kylen did 
    getSpriteSheets() {
        return {
            sheet: ASSET_MANAGER.getAsset(COIN_MOVING),
            frame_count: 15
        };
    }

    loadAnimation() {
        let spritesheet = this.getSpriteSheets();

        return new Animator(
            spritesheet.sheet,
            0, 0,

            this.width, this.height,
            spritesheet.frame_count,
            FRAME_DURATION, false
        );
    }

    deleteEntity() {
        this.removeFromWorld = true;
    }
}
