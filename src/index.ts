import * as PIXI from "pixi.js";
import "./style.css";
import Background from "./containers/Background/index";
import { GAME_HEIGHT, GAME_WIDTH, COMPONETS_SCALE } from "./constants/config";
import MainBoard from "./containers/Board/components/MainBoard";
import Table from "./containers/Board/components/Table";
import Wheel from "./containers/Board/components/Wheel";
import GameMenu from "./containers/UI/components/GameMenu";

declare const VERSION: string;

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new PIXI.Application({
    backgroundColor: 0x000000,
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
let wheel: Wheel;
let gameMenu: GameMenu;

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    initComponents();

    //start main game loop
    const ticker = new PIXI.Ticker();
    ticker.add((deltaTime) => {
        update(deltaTime);
    });
    ticker.start();
};

function initComponents(): void {
    background = new Background(renderer);
    stage.addChild(background.Sprite);

    table = new Table("board/board-sm.png", new PIXI.Point(0, 1), renderer);
    wheel = new Wheel("board/wheel-sm.png", new PIXI.Point(0.5, 0.5), renderer);

    mainBoard = new MainBoard(renderer, COMPONETS_SCALE, table);
    mainBoard.addComponent(wheel);

    gameMenu = new GameMenu(renderer, COMPONETS_SCALE);

    stage.addChild(mainBoard.Container);
    stage.addChild(mainBoard.PlacedChipsContainer);
    stage.addChild(gameMenu.Container);
}

// main game loop
function update(deltaTime: number) {
    background.update();
    mainBoard.update(deltaTime);
    gameMenu.updateGameText();
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
