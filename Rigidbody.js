class Rigidbody extends Entity {
    constructor(position) {
        super(Rigidbody);
        this.drag = 1;
        this.onUpdate = [];
        this.onAfterUpdate = [];
        this.position = position;
        this.velocity = { x: 0, y: 0 };
    }
    run() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= this.drag;
        this.velocity.y *= this.drag;
    }
    static start(updateTime = 0.02) {
        if (this.active)
            return;
        this.active = true;
        this.intervalFunc = setInterval(this.run, updateTime);
    }
    static run() {
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
        if (!this.active)
            return;
        this.active = false;
        clearInterval(this.intervalFunc);
    }
}
Rigidbody.ALL = [];
Rigidbody.active = false;
