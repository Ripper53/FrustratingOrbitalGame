class BoxUI extends UIElement {
    constructor(position, size) {
        super(BoxUI, position);
        this.size = size;
        this.offset.x = -this.size.x / 2;
        this.offset.y = -this.size.y / 2;
        this.color = "black";
        this.fill = true;
    }
    draw(canvas, context) {
        if (this.fill) {
            context.fillStyle = this.color;
            context.fillRect(this.position.x + this.offset.x, this.position.y + this.offset.y, this.size.x, this.size.y);
        }
        else {
            context.strokeStyle = this.color;
            context.strokeRect(this.position.x + this.offset.x, this.position.y + this.offset.y, this.size.x, this.size.y);
        }
    }
    inBounds(point) {
        const tL = {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y
        }, bR = this.getBottomRight();
        return ((tL.x <= point.x && bR.x >= point.x) &&
            (tL.y <= point.y && bR.y >= point.y));
    }
    getBottomRight() {
        return {
            x: this.position.x + this.offset.x + this.size.x,
            y: this.position.y + this.offset.y + this.size.y
        };
    }
}
BoxUI.ALL = [];
