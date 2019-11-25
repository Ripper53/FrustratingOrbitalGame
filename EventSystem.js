const EventSystem = new (class {
    constructor() {
        this.active = false;
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
        for (let ui of UI.ALL) {
            if (ui.active)
                ui.triggerEvents();
        }
        requestAnimationFrame(() => this.run());
    }
    stop() {
        this.active = false;
    }
})();
