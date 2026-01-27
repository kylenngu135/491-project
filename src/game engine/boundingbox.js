class BoundingBox{
    constructor(x , y, width, height){
            Object.assign(this,{x, y, width, height});
            this.left = x;
            this.top = y;
            this.right = this.left + this.width;
            this.bottom = this.top + this.top.height;
    };

    collide(oth){
        if(this.right > oth.left && this.left < oth.right && this.top < oth.bottom && oth.top < this.bottom) {
            return this;
        }
    }
}
