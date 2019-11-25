class ButtonUI extends UIElement {
    constructor(position, text, box) {
        super(ButtonUI, position);
        // fields
        this.text = text;
        this.text.active = false;
        this.box = box;
        this.box.active = false;
    }
    draw(canvas, context) {
        this.box.draw(canvas, context);
        this.text.draw(canvas, context);
    }
    inBounds(point) {
        return this.box.inBounds(point);
    }
    setText(text) {
        this.text.text = text;
        this.setTextOffset();
    }
    setTextOffset() {
        Render.context.font = TextUI.getFont(this.text.font);
        this.text.offset.x = -(this.box.size.x + Render.context.measureText(this.text.text).width) / 4;
    }
    setSizeX(x) {
        this.box.size.x = x;
        this.setTextOffset();
    }
    setSizeY(y) {
        this.box.size.y = y;
        //this.text.offset.y = (y + this.text.font.size) / 2;
    }
    setFontSize(size) {
        this.text.font.size = size;
        this.setTextOffset();
    }
    static create(text, position, size) {
        const btn = new ButtonUI(position, new TextUI(text, position), new BoxUI(position, size));
        btn.setText(text);
        btn.setSizeX(size.x);
        btn.setSizeY(size.y);
        return btn;
    }
}
ButtonUI.ALL = [];
