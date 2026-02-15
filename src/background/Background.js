class Background {
    constructor() {
        this.fillColor = "#47ABA9";
        this.strokeColor = "#47ABA9";
        this.width = 5000; // Example: world width
        this.height = 5000; // Example: world height
    }

    draw(ctx) {
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;

        //ctx.strokeRect(100, 110, 100, 100);
        ctx.fillRect(0, 0, this.width, this.height);
    }

    update() {
        // TODO: IDK WHAT TO USE THIS FOR
    }
}
