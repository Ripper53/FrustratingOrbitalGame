class UI extends Entity {
    constructor(entity, position) {
        super(UI);
        this.position = position;
        this.offset = {
            x: 0,
            y: 0
        };
        entity.ALL.push(this);
    }
}
UI.ALL = [];
class UIElement extends UI {
    constructor(entity, position) {
        super(entity, position);
        this.isInBounds = false;
        this.events = {
            click: [],
            enter: [],
            leave: []
        };
    }
    triggerEvents() {
        const pointerEvent = {
            position: Input.pointer.position
        };
        if (!this.inBounds(pointerEvent.position)) {
            if (this.isInBounds) {
                this.isInBounds = false;
                for (let action of this.events.leave) {
                    action(this, pointerEvent);
                }
            }
        }
        else if (!this.isInBounds) {
            this.isInBounds = true;
            for (let action of this.events.enter) {
                action(this, pointerEvent);
            }
        }
    }
}
