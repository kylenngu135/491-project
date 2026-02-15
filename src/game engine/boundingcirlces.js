class BoundingCircles {
    constructor(x, y, radius) {
        Object.assign(this, {x, y, radius});
    }

    draw(ctx) {
        ctx.strokeStyle = 'Red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.stroke();
    }

    update(destX, destY) {
        this.x = destX;
        this.y = destY;
    }
    
    collide(oth) {
        const dx = this.x - oth.x;
        const dy = this.y - oth.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + oth.radius;
    }

    displace(oth, distance) {
        const dx = (this.x + this.radius) - (oth.x + oth.radius);
        const dy = (this.y + this.radius) - (oth.y + oth.radius);

        const displacement = { 
            displaceX: (dx / distance) * ( dx > 0 ? 0.75 : 1.5), 
            displaceY: dy / distance * ( dy > 0 ? 0.75 : 1.5)
        };

        return displacement;
    }

    collideLeft() {
        return (this.x - this.radius) < 0;
    }

    collideRight() {
        return (this.x + this.radius) > 800;
    }

    collideTop() {
        return (this.y - this.radius) < 0;
    }

    collideBottom() {
        return (this.y + this.radius) > 800;
    }
}
