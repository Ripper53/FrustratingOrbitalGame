const EventSystem = new (class {
    constructor() {

    }

    private active: boolean = false;
    get isActive() {
        return this.active;
    }
    start() {
        this.active = true;
        requestAnimationFrame(() => this.run());
    }

    private run() {
        if (!this.active) return;
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