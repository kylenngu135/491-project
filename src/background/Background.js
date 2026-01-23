class Background {
    constructor() {
        this.fillColor = "Gray";
        this.strokeColor = "Gray";
    }

    draw(ctx) {
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;

        //ctx.strokeRect(100, 110, 100, 100);
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    update() {
        // TODO: will use this to update location when I add a camera
    }
}
