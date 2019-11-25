class ButtonUI extends UIElement<ButtonUI> {
    static ALL: ButtonUI[] = [];

    text: TextUI;
    box: BoxUI;

    constructor(position: vector2, text: TextUI, box: BoxUI) {
        super(ButtonUI, position);
        // fields
        this.text = text;
        this.text.active = false;
        this.box = box;
        this.box.active = false;
    }

    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.box.draw(canvas, context);
        this.text.draw(canvas, context);
    }

    inBounds(point: vector2): boolean {
        return this.box.inBounds(point);
    }

    setText(text: string) {
        this.text.text = text;
        this.setTextOffset();
    }

    private setTextOffset() {
        Render.context.font = TextUI.getFont(this.text.font);
        this.text.offset.x = -(this.box.size.x + Render.context.measureText(this.text.text).width) / 4;
    }

    setSizeX(x: number) {
        this.box.size.x = x;
        this.setTextOffset();
    }

    setSizeY(y: number) {
        this.box.size.y = y;
        //this.text.offset.y = (y + this.text.font.size) / 2;
    }

    setFontSize(size: number) {
        this.text.font.size = size;
        this.setTextOffset();
    }

    static create(text: string, position: vector2, size: vector2): ButtonUI {
        const btn = new ButtonUI(position, new TextUI(text, position), new BoxUI(position, size));
        btn.setText(text);
        btn.setSizeX(size.x);
        btn.setSizeY(size.y);

        return btn;
    }
}