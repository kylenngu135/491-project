class HitBox extends BoundingBox {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    collide(oth) {
        return oth instanceof HurtBox && super.collide(oth);
    }
}
