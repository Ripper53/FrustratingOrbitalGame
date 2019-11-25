class Rigidbody extends Entity<Rigidbody> {
    static ALL: Rigidbody[] = [];

    position: vector2;
    velocity: vector2;
    drag: number = 1;
    onUpdate: ((rb: Rigidbody) => void)[] = [];
    onAfterUpdate: ((rb:Rigidbody) => void)[] = [];

    constructor(position: vector2) {
        super(Rigidbody);
        this.position = position;
        this.velocity = {x: 0, y: 0};
    }

    run() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= this.drag;
        this.velocity.y *= this.drag;
    }

    private static active: boolean = false;
    private static intervalFunc: number;
    static start(updateTime: number = 0.02) {
        if (this.active) return;
        this.active = true;
        this.intervalFunc = setInterval(this.run, updateTime);
    }

    private static run() {
        for (let rb of Rigidbody.ALL) {
            if (rb.active) {
                for (let action of rb.onUpdate)
                    action(rb);
                rb.run();
                for (let action of rb.onAfterUpdate)
                    action(rb);
            }
        }
    }

    static stop() {
        if (!this.active) return;
        this.active = false;
        clearInterval(this.intervalFunc);
    }
}