abstract class Entity<T extends Entity<T>> {
    // should contain a static array named ALL
    //static ALL: Entity<T> = [];
    active: boolean = true;

    constructor(entity: any) {
        entity.ALL.push(this);
    }
}