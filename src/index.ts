import * as PIXI from "pixi.js";
import "./style.css";
import Background from "./containers/Background/index";
import { GAME_HEIGHT, GAME_WIDTH, COMPONETS_SCALE, Scene } from "./constants/config";
import MainBoard from "./containers/Board/components/MainBoard";
import Table from "./containers/Board/components/Table";
import GameMenu from "./containers/UI/components/GameMenu";
import MainMenu from "./containers/MainMenu/index";
import GameState from "./Logic/GameState";
import SoundManager from "./SoundManager";
import History from "./containers/History/index";

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
const ticker = new PIXI.Ticker();

let sceneShowing = Scene.MENU;

// game elements
let background: Background;
let mainBoard: MainBoard;
let table: Table;
let gameMenu: GameMenu;
let mainMenu: MainMenu;
let history: History;

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    SoundManager.Start();
    document.body.appendChild(app.view);

    initComponents();

    //start main game loop
    ticker.add((deltaTime) => {
        update(deltaTime);
    });
    ticker.start();
};

function initComponents(): void {
    mainMenu = new MainMenu(renderer);

    background = new Background(renderer);

    history = new History(renderer);

    table = new Table("board/board-sm.png", new PIXI.Point(0, 1), renderer);

    mainBoard = new MainBoard(renderer, COMPONETS_SCALE, table);

    gameMenu = new GameMenu(renderer, COMPONETS_SCALE);

    SwitchScene();
}

function setMainMenuScene(): void {
    stage.removeChildren();
    stage.addChild(mainMenu.Container);
}

function setGameScene(): void {
    stage.removeChildren();
    stage.addChild(background.Sprite);

    stage.addChild(mainBoard.Container);
    stage.addChild(mainBoard.PlacedChipsContainer);
    stage.addChild(gameMenu.Container);
}

function setHistoryScene(): void {
    stage.removeChildren();
    history.renderBetHistory();
    stage.addChild(history.Container);
}

function SwitchScene() {
    sceneShowing = GameState.scene;
    switch (GameState.scene) {
        case Scene.MENU:
            setMainMenuScene();
            break;
        case Scene.GAME:
            setGameScene();
            break;
        case Scene.HISTORY:
            setHistoryScene();
            break;
        default:
            setMainMenuScene();
            break;
    }
}

// main game loop
function update(deltaTime: number) {
    if (sceneShowing != GameState.scene) {
        SwitchScene();
    }

    if (GameState.scene === Scene.GAME) {
        background.update();
        mainBoard.update(deltaTime, ticker.elapsedMS);
        gameMenu.updateGameText();
    }
}

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = PIXI.Loader.shared;
        SoundManager.init();
        loader.add("background", "./assets/background/background.jpg");
        loader.add("mainmenu", "./assets/background/mainmenu.jpg");
        loader.add("components", "./assets/components.json");
        loader.add("animations", "./assets/animations.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}
