import * as PIXI from "pixi.js";
import GameButton from "../UI/components/GameButton";
import GameState from "../../Logic/GameState";
import { Scene } from "../../constants/config";
import SoundManager from "../../SoundManager";

class MainMenu {
    _renderer: PIXI.AbstractRenderer;
    _container: PIXI.Container;
    _background: PIXI.Sprite;
    _soundButton: GameButton;

    constructor(renderer: PIXI.AbstractRenderer) {
        this._renderer = renderer;
        this._container = new PIXI.Container();
        this._background = this.initSprite();

        this._container.addChild(this._background);
        this._soundButton = new GameButton(
            "UI/red_button01.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            2,
            "SOUND ON",
            false,
            true
        );
        this.initButtons();
    }

    private initSprite(): PIXI.Sprite {
        const sprite = PIXI.Sprite.from("mainmenu");
        sprite.anchor.set(0.5);
        sprite.position.set(this._renderer.screen.width / 2, this._renderer.screen.height / 2);
        sprite.filters = [new PIXI.filters.BlurFilter(10)];
        return sprite;
    }

    private initButtons(): void {
        const newGameButton = new GameButton(
            "UI/red_button01.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            -1,
            "NEW GAME",
            false,
            true
        );
        newGameButton.onClicked(this.handleButtonClick);
        this._container.addChild(newGameButton.Sprite);
        this._container.addChild(newGameButton.ButtonText);

        const playButton = new GameButton(
            "UI/red_button01.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            0,
            "CONTINUE",
            false,
            true
        );
        playButton.onClicked(this.handleButtonClick);
        this._container.addChild(playButton.Sprite);
        this._container.addChild(playButton.ButtonText);

        const historyButton = new GameButton(
            "UI/red_button01.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            1,
            "BET HISTORY",
            false,
            true
        );
        historyButton.onClicked(this.handleButtonClick);
        this._container.addChild(historyButton.Sprite);
        this._container.addChild(historyButton.ButtonText);

        this._soundButton.onClicked(this.handleButtonClick);
        this._container.addChild(this._soundButton.Sprite);
        this._container.addChild(this._soundButton.ButtonText);
    }

    private handleButtonClick = (index: number): void => {
        switch (index) {
            case -1:
                GameState.Reset();
                GameState.scene = Scene.GAME;
                break;
            case 0:
                GameState.scene = Scene.GAME;
                break;
            case 1:
                GameState.scene = Scene.HISTORY;
                break;
            case 2:
                GameState.sound = !GameState.sound;
                SoundManager.Switch();
                this._soundButton.changeText(!GameState.sound ? "SOUND OFF" : "SOUND ON");
                break;
            default:
                break;
        }
    };

    get Container(): PIXI.Container {
        return this._container;
    }

    // update(): void {
    //     this._background.x = this._renderer.screen.width / 2;
    //     this._background.y = this._renderer.screen.height / 2;
    //     this._background.scale.set()
    // }
}

export default MainMenu;
