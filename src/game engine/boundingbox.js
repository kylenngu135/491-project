class BoundingBox{
    constructor(x, y, width, height){
            Object.assign(this,{x, y, width, height});
            this.left = x;
            this.top = y;
            this.right = this.left + this.width;
            this.bottom = this.top + this.top.height;
    };

    collide(oth){
        // console.log(this.left, this.right, this.top, this.bottom);
        // console.log(oth.left, oth.right, oth.top, oth.bottom);

        return (this.right > oth.left && this.left < oth.right) || (this.top < oth.bottom && oth.top < this.bottom);
    }

    draw(ctx, dir) {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }
}
