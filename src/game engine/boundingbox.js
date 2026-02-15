class BoundingBox{
    constructor(x, y, width, height) {
            Object.assign(this, {x, y, width, height});

            this.left = x;
            this.top = y;
            this.right = this.left + this.width;
            this.bottom = this.top + this.height;
    }

    collide(oth){
        // console.log("this.right > oth.left: " + this.right > oth.left, "this.left < oth.right: " + this.left < oth.right, "this.top < oth.bottom: " + this.top < oth.bottom, "oth.top < this.bottom:" + oth.top < this.bottom);
        return (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && oth.top < this.bottom);
    }

    draw(ctx, dir) {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    update(x, y) {
        this.x = x;
        this.y = y;
        this.left = this.x;
        this.top = this.y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }
}
