class HUD {
    constructor(game, camera, hero) {
        Object.assign(this, { game, camera, hero });
        this.mapHP = this.hero.hp;
    }

    update(){
        //not a thing to update but thing will die without it...
    }

    draw(ctx) {
        // console.log(this.hero.hp);
        const x = 20; // padding from left
        const y = 20; // padding from top
        const width = 270;
        const height = 25;

        // empty health bar
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(this.camera.x + x, this.camera.y + y, width, height);

        // heath bar
        const healthRatio = Math.max(0, this.hero.hp / this.mapHP); 
        ctx.fillStyle = "#dd2323";
        ctx.fillRect(this.camera.x + x, this.camera.y + y, width * healthRatio, height);

        // Draw Border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.camera.x + x, this.camera.y + y, width, height);

        // mone
        ctx.fillStyle = "gold";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "left";
        // pos right under hp
        ctx.fillText(`Coins: ${this.hero.currentMoney}`, this.camera.x + x, this.camera.y + y + height + 25);
    }
}