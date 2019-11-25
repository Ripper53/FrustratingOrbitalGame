(() => {

const mainPlayer = new (class Player {
    UI: UI;
    RB: Rigidbody;
    private points: number = 0;
    private pointsText: TextUI;
    private highScore: number = 0;
    private highScoreText: TextUI;

    constructor(ui: UI) {
        this.UI = ui;
        this.RB = new Rigidbody(this.UI.position);
        this.pointsText = new TextUI("Points: 0", {x: 0, y: 30});
        this.pointsText.color = "black";
        this.highScoreText = new TextUI("High Score: 0", {x: 0, y: 50});
        this.highScoreText.color = "black";
        this.highScoreText.font.size = 18;

        this.RB.onUpdate.push(source => {
            const
            point = Input.pointer.position,
            dir: vector2 = {
                x: source.position.x - point.x,
                y: source.position.y - point.y
            };
            dir.x = (dir.x + 1) / 2;
            dir.y = (dir.y + 1) / 2;
    
            source.velocity.x -= dir.x * 0.001;
            source.velocity.y -= dir.y * 0.001;
        });

        this.RB.onAfterUpdate.push(source => {
            // X
            if (source.position.x < 0)
                source.position.x = 0;
            else if (source.position.x > Render.canvas.width)
                source.position.x = Render.canvas.width;
            // Y
            if (source.position.y < 0)
                source.position.y = 0;
            else if (source.position.y > Render.canvas.height)
                source.position.y = Render.canvas.height;
        });
    }

    reset() {
        this.points = 0;
        this.pointsText.text = "Points: 0";
    }
    turnOnUI() {
        this.pointsText.active = true;
        this.highScoreText.active = true;
    }
    turnOffUI() {
        this.pointsText.active = false;
        this.highScoreText.active = false;
    }

    get position(): vector2 {
        return this.UI.position;
    }

    addPoints(amount: number) {
        this.points += amount;
        if (this.highScore < this.points) {
            this.highScore = this.points;
            this.highScoreText.text = "High Score: " + this.highScore;
        }
        this.pointsText.text = "Points: " + this.points;
    }
})(
    new BoxUI(
        {x: 0, y: 0},
        {x: 5, y: 5}
    )
);

type PlayerRectEvent<T extends UI> = {
    UI: T;
    clickEvent: (source: T, player: typeof mainPlayer) => void;
    enterEvent: (source: T, player: typeof mainPlayer) => void;
    leaveEvent: (source: T, player: typeof mainPlayer) => void;
};

const uiReactToPlayer: PlayerRectEvent<UI>[] = [];
function createButton(text: string, position: vector2, size: vector2) {
    const btn = ButtonUI.create(text, position, size);
    btn.text.font.size = 12;
    btn.text.offset.x = -4;
    btn.text.offset.y = 4;
    btn.box.color = "#dbd51f";
    uiReactToPlayer.push({
        UI: btn,
        clickEvent: (source, player) => {
            player.addPoints(1);
            source.position.x = getRandomArbitrary(0, Render.canvas.width);
            source.position.y = getRandomArbitrary(0, Render.canvas.height);
        },
        enterEvent: (source, player) => {
            (<ButtonUI>source).text.color = "black";
            (<ButtonUI>source).box.color = "white";
        },
        leaveEvent: (source, player) => {
            (<ButtonUI>source).text.color = "white";
            (<ButtonUI>source).box.color = "#dbd51f";
        }
    });
    return btn;
}

let clicked: boolean = false;
window.addEventListener('click', () => clicked = true);

function playerEvents() {
    for (let ui of uiReactToPlayer) {
        if (ui.UI.inBounds(mainPlayer.position)) {
            ui.enterEvent(ui.UI, mainPlayer);
            if (clicked) {
                ui.clickEvent(ui.UI, mainPlayer);
            }
        } else {
            ui.leaveEvent(ui.UI, mainPlayer);
        }
    }
    clicked = false;
    requestAnimationFrame(playerEvents);
}
requestAnimationFrame(playerEvents);

const timeText = new TextUI("Time: 0s", {x: 0, y: 70});
timeText.color = "black";
timeText.font.size = 18;
let time: number = 30;
setInterval(() => {
    time--;
    if (time === 0) {
        time = 30;
        mainPlayer.reset();
    }
    timeText.text = `Time: ${time}s`;
}, 1000);

createButton("P", {x: getRandomArbitrary(0, Render.canvas.width), y: getRandomArbitrary(0, Render.canvas.height)}, {x: 25, y: 25});


Render.start();
EventSystem.start();
Rigidbody.start();

Render.canvas.style.cursor = 'none';

})();