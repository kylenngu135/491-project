

class BoundingCircles {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    collide(oth) {
        const dx = this.x - oth.x;
        const dy = this.y - oth.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + oth.radius;
    }
}

