const Input = new (class {
    constructor() {
        this.pointer = {
            position: { x: 0, y: 0 },
            oldPosition: { x: 0, y: 0 }
        };
    }
})();
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY // been adjusted to be relative to element
    };
}
window.addEventListener('pointermove', e => {
    Input.pointer.oldPosition = Input.pointer.position;
    Input.pointer.position = getMousePos(Render.canvas, e);
});
