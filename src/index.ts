import * as PIXI from "pixi.js";
import "./style.css";
import Background from "./components/Background/index";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants/config";
import MainBoard from "./components/Board/MainBoard";
import Table from "./components/Board/Table";

declare const VERSION: string;

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    autoDensity: true,
    resolution: window.devicePixelRatio,
    resizeTo: window,
});

const stage = app.stage;
const renderer = app.renderer;

// game elements
let background: Background;
let mainBoard: MainBoard;
let table: Table;

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    initComponents();

    //start main game loop
    const ticker = new PIXI.Ticker();
    ticker.add(update);
    ticker.start();
};

function initComponents(): void {
    background = new Background(renderer);
    stage.addChild(background.Sprite);

    mainBoard = new MainBoard(renderer, 0.7);

    table = new Table("board/board-sm.png", new PIXI.Point(0, 1), renderer);

    mainBoard.addComponent(table);

    stage.addChild(mainBoard.Container);
}

// main game loop
function update() {
    background.update();
    mainBoard.update();
}

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = PIXI.Loader.shared;
        loader.add("background", "./assets/background/background.jpg");
        loader.add("components", "./assets/components.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

// function resizeCanvas(): void {
//     const resize = () => {
//         renderer.resize(GAME_WIDTH, GAME_HEIGHT);
//         stage.scale.x = window.innerWidth / GAME_WIDTH;
//         stage.scale.y = window.innerHeight / GAME_HEIGHT;
//     };

//     resize();

//     window.addEventListener("resize", resize);
// }

// function getBird(): PIXI.AnimatedSprite {
//     const bird = new PIXI.AnimatedSprite([
//         PIXI.Texture.from("birdUp.png"),
//         PIXI.Texture.from("birdMiddle.png"),
//         PIXI.Texture.from("birdDown.png"),
//     ]);

//     bird.loop = true;
//     bird.animationSpeed = 0.1;
//     bird.play();
//     bird.scale.set(3);

//     return bird;
// }
