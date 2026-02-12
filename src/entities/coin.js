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
class Coin extends Entity {
    constructor(game, x, y, hero, money, debug) {
        super(
            game, 
            COIN_STATE,                    
            x, y,
            16, 16,                        
            Coin.#getSpriteSheets(),      
            [15],                          
            new HurtBox(x, y, 16, 16),     
            new HitBox(x, y, 0, 0),        
            1,                            
            { left: 0, right: 0 },        
            debug
        );
        
        this.hero = hero;
        this.money = money;
        this.magnetRange = 200;  
        this.maxSpeed = 300;
    }
    // same logic as the eni class except it deletes itself
    update() {
    
        var dist = this.distance(this, this.hero);
        
        
       
        if (dist < 20) {                    
            this.hero.addMoney(this.money);
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
        
        super.update();
    }
    
    // same logic as enim
    distance(entity1, entity2) {
        var dx = entity1.x - entity2.x;
        var dy = entity1.y - entity2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // waht kylen did 
    static #getSpriteSheets() {
        return [
            {
                sheet: ASSET_MANAGER.getAsset(COIN_MOVING),
                frame_count: 15
            }
        ];
    }
    
}