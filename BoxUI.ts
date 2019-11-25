class BoxUI extends UIElement<BoxUI> implements IColorUI {
    static ALL: BoxUI[] = [];

    size: vector2;
    color: string;
    fill: boolean;

    constructor(position: vector2, size: vector2) {
        super(BoxUI, position);
        this.size = size;
        this.offset.x = -this.size.x / 2;
        this.offset.y = -this.size.y / 2;
        this.color = "black";
        this.fill = true;
    }

    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        if (this.fill) {
            context.fillStyle = this.color;
            context.fillRect(this.position.x + this.offset.x, this.position.y + this.offset.y, this.size.x, this.size.y);
        } else {
            context.strokeStyle = this.color;
            context.strokeRect(this.position.x + this.offset.x, this.position.y + this.offset.y, this.size.x, this.size.y);
        }
    }

    inBounds(point: vector2): boolean {
        const
            tL: vector2 = {
                x: this.position.x + this.offset.x,
                y: this.position.y + this.offset.y
            },
            bR: vector2 = this.getBottomRight();
        return (
            (tL.x <= point.x && bR.x >= point.x) &&
            (tL.y <= point.y && bR.y >= point.y)
        );
    }

    getBottomRight(): vector2 {
        return {
            x: this.position.x + this.offset.x + this.size.x,
            y: this.position.y + this.offset.y + this.size.y
        };
    }
}