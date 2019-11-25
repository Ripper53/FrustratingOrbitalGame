class Entity {
    constructor(entity) {
        // should contain a static array named ALL
        //static ALL: Entity<T> = [];
        this.active = true;
        entity.ALL.push(this);
    }
}
