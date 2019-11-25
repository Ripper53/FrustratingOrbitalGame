type UIEvents<T extends UI> = {
    click: Array<(source: T, e: UIClickEvent) => void>,
    enter: Array<(source: T, e: UIEnterEvent) => void>,
    leave: Array<(source: T, e: UILeaveEvent) => void>
}

type UIPointerEvent = {
    position: vector2;
};

type UIClickEvent = UIPointerEvent & {

};

type UIEnterEvent = UIPointerEvent;

type UILeaveEvent = UIPointerEvent;

abstract class UI extends Entity<UI> {
    static ALL: UI[] = [];
    position: vector2;
    offset: vector2;

    constructor(entity: any, position: vector2) {
        super(UI);
        this.position = position;
        this.offset = {
            x: 0,
            y: 0
        };
        entity.ALL.push(this);
    }

    abstract triggerEvents(): void;

    abstract draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void;

    abstract inBounds(point: vector2): boolean;
}

abstract class UIElement<T extends UI> extends UI {
    events: UIEvents<T>;

    constructor(entity: any, position: vector2) {
        super(entity, position);
        this.events = {
            click: [],
            enter: [],
            leave: []
        };
    }

    private isInBounds: boolean = false;
    triggerEvents() {
        const pointerEvent: UIPointerEvent = {
            position: Input.pointer.position
        };
        if (!this.inBounds(pointerEvent.position)) {
            if (this.isInBounds) {
                this.isInBounds = false;
                for (let action of this.events.leave) {
                    action(<T><unknown>this, pointerEvent);
                }
            }
        } else if (!this.isInBounds) {
            this.isInBounds = true;
            for (let action of this.events.enter) {
                action(<T><unknown>this, pointerEvent);
            }
        }
    }
}