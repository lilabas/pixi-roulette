import * as PIXI from "pixi.js";
import UIText from "../UI/components/UIText";
import GameState from "../../Logic/GameState";
import GameButton from "../UI/components/GameButton";
import { Scene } from "../../constants/config";

class History {
    _renderer: PIXI.AbstractRenderer;
    _container: PIXI.Container;
    _background: PIXI.Sprite;
    _panel: PIXI.Graphics;

    constructor(renderer: PIXI.AbstractRenderer) {
        this._renderer = renderer;
        this._container = new PIXI.Container();
        this._background = this.initBackground();
        this._panel = this.initPanel();

        this.renderBetHistory();
    }

    renderBetHistory(): void {
        const offsetY = 160;
        const offsetYPrct = 0.4;

        this._container.removeChildren();

        this._container.addChild(this._background);
        this._container.addChild(this._panel);
        this.initTexts();
        this.initMainMenuButton();

        GameState.betHistory.forEach((history, index) => {
            const betText = new UIText(history.bet.toString(), "#000000", 30);
            betText.Text.position.set(
                this._renderer.screen.width - this._renderer.screen.width * 0.7,
                offsetY + offsetY * index * offsetYPrct
            );
            this._container.addChild(betText.Text);

            const winAmountText = new UIText(history.winAmount.toString(), "#000000", 30);
            winAmountText.Text.position.set(
                this._renderer.screen.width - this._renderer.screen.width * 0.58,
                offsetY + offsetY * index * offsetYPrct
            );
            this._container.addChild(winAmountText.Text);

            const winNumberText = new UIText(history.winNumber.toString(), "#000000", 30);
            winNumberText.Text.position.set(
                this._renderer.screen.width - this._renderer.screen.width * 0.4,
                offsetY + offsetY * index * offsetYPrct
            );
            this._container.addChild(winNumberText.Text);
        });
    }

    private initMainMenuButton(): void {
        const mainMenuButton = new GameButton(
            "UI/green_sliderRight.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            -6,
            "MENU",
            true
        );

        mainMenuButton.onClicked(() => {
            GameState.scene = Scene.MENU;
        });
        this._container.addChild(mainMenuButton.Sprite);
        this._container.addChild(mainMenuButton.ButtonText);
    }

    private initTexts(): void {
        const betText = new UIText("BET", "#8c2c2c", 30);
        betText.Text.position.set(this._renderer.screen.width - this._renderer.screen.width * 0.7, 80);
        this._container.addChild(betText.Text);

        const winAmountText = new UIText("WIN AMOUNT", "#8c2c2c", 30);
        winAmountText.Text.position.set(this._renderer.screen.width - this._renderer.screen.width * 0.58, 80);
        this._container.addChild(winAmountText.Text);

        const winNumberText = new UIText("WIN NUMBER", "#8c2c2c", 30);
        winNumberText.Text.position.set(this._renderer.screen.width - this._renderer.screen.width * 0.4, 80);
        this._container.addChild(winNumberText.Text);
    }

    private initBackground(): PIXI.Sprite {
        const sprite = PIXI.Sprite.from("mainmenu");
        sprite.anchor.set(0.5);
        sprite.position.set(this._renderer.screen.width / 2, this._renderer.screen.height / 2);
        sprite.filters = [new PIXI.filters.BlurFilter(10)];
        return sprite;
    }

    private initPanel(): PIXI.Graphics {
        const panel = new PIXI.Graphics();
        panel.beginFill(0x014c3c);
        panel.drawRect(
            this._renderer.screen.width / 2,
            this._renderer.screen.height / 2,
            this._renderer.screen.width / 1.5,
            this._renderer.screen.height
        );
        panel.pivot.set(panel.width / 2, panel.height / 2);
        panel.endFill();

        return panel;
    }

    get Container(): PIXI.Container {
        return this._container;
    }
}

export default History;
