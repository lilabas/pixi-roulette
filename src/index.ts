import * as PIXI from "pixi.js";
import "./style.css";
import Background from "./components/background/index";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants/config";

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

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    //resizeCanvas();

    background = new Background(renderer);
    //backgroundSprite.scale.set();

    //backgroundSprite.anchor.set(0.5, 0.5);

    stage.addChild(background.Sprite);
    // const birdFromSprite = getBird();
    // birdFromSprite.anchor.set(0.5, 0.5);
    // birdFromSprite.position.set(gameWidth / 2, gameHeight / 2);

    // stage.addChild(birdFromSprite);

    const ticker = new PIXI.Ticker();
    ticker.add(update);
    ticker.start();
};

// main game loop
function update() {
    background.update();
}

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", "./assets/simpleSpriteSheet.json");
        loader.add("background", "./assets/background/sky.png");

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
