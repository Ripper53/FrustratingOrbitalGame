type font = {
    size: number;
    maxWidth: number;
    family: string;
}

class TextUI extends UIElement<TextUI> implements IColorUI {
    static ALL: TextUI[] = [];

    text: string;
    font: font;
    fill: boolean;
    color: string;

    constructor(text: string, position: vector2) {
        super(TextUI, position);
        this.text = text;
        this.font = {
            size: 32,
            maxWidth: 1028,
            family: "Arial"
        };
        this.fill = true;
        this.color = "white";
    }

    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        const pos: vector2 = {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y
        };
        context.font = TextUI.getFont(this.font);
        if (this.fill) {
            context.fillStyle = this.color;
            context.fillText(this.text, pos.x, pos.y, this.font.maxWidth);
        } else {
            context.strokeStyle = this.color;
            context.strokeText(this.text, pos.x, pos.y, this.font.maxWidth);
        }
    }

    inBounds(point: vector2): boolean {
        return false;
    }

    static getFont(font: font): string {
        return `${font.size}px ${font.family}`;
    }
}