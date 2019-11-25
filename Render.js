const Render = new (class {
    constructor() {
        this.active = false;
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.canvas.style.border = "black 1px solid";
        this.canvas.width = 1500;
        this.canvas.height = 750;
        this.canvas.style.width = "100%";
        this.canvas.style.height = "auto";
    }
    drawUI() {
        for (let ui of UI.ALL) {
            if (ui.active)
                ui.draw(this.canvas, this.context);
        }
    }
    get isActive() {
        return this.active;
    }
    start() {
        this.active = true;
        requestAnimationFrame(() => this.run());
    }
    run() {
        if (!this.active)
            return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawUI();
        requestAnimationFrame(() => this.run());
    }
    stop() {
        this.active = false;
    }
})();
