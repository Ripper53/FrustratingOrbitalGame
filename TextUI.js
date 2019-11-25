class TextUI extends UIElement {
    constructor(text, position) {
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
    draw(canvas, context) {
        const pos = {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y
        };
        context.font = TextUI.getFont(this.font);
        if (this.fill) {
            context.fillStyle = this.color;
            context.fillText(this.text, pos.x, pos.y, this.font.maxWidth);
        }
        else {
            context.strokeStyle = this.color;
            context.strokeText(this.text, pos.x, pos.y, this.font.maxWidth);
        }
    }
    inBounds(point) {
        return false;
    }
    static getFont(font) {
        return `${font.size}px ${font.family}`;
    }
}
TextUI.ALL = [];
