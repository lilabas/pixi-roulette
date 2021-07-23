import * as PIXI from "pixi.js";
import UIText from "./UIText";
import GameState from "../../../Logic/GameState";
import ChipSelect from "./ChipSelect";
import { CHIP_VALUES, Scene, SELECTED_CHIP } from "../../../constants/config";
import GameButton from "./GameButton";
import SoundManager from "../../../SoundManager";

class GameMenu {
    _renderer: PIXI.AbstractRenderer;
    _container: PIXI.Container;
    _scale: number;
    _chips: Array<ChipSelect> = [];
    _balanceText = new UIText("BALANCE " + GameState.balance, "#45684e", 30);
    _betText = new UIText("BET " + GameState.bet, "#8c2c2c", 30);

    constructor(renderer: PIXI.AbstractRenderer, scale: number) {
        this._renderer = renderer;
        this._container = new PIXI.Container();
        this._scale = scale;
        this._container.position.set(50, 50);

        this.initGameText();
        this.initChipSelect();
        this.initButtons();
    }

    private initButtons(): void {
        const spinButton = new GameButton("UI/red_button01.png", new PIXI.Point(0.5, 0.5), this._renderer, 0, "SPIN");
        spinButton.onClicked(this.handleButtonClick);
        this._container.addChild(spinButton.Sprite);
        this._container.addChild(spinButton.ButtonText);

        const clearButton = new GameButton(
            "UI/grey_button00.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            1,
            "CLEAR"
        );

        clearButton.onClicked(this.handleButtonClick);
        this._container.addChild(clearButton.Sprite);
        this._container.addChild(clearButton.ButtonText);

        const mainMenuButton = new GameButton(
            "UI/grey_sliderRight.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            -6.5,
            "MENU",
            true
        );

        mainMenuButton.onClicked(this.handleButtonClick);
        this._container.addChild(mainMenuButton.Sprite);
        this._container.addChild(mainMenuButton.ButtonText);
    }

    private initGameText(): void {
        this._container.addChild(this._balanceText.Text);

        this._betText.Text.position.set(0, 50);
        this._container.addChild(this._betText.Text);
    }

    private initChipSelect(): void {
        CHIP_VALUES.forEach((chipValue, index) => {
            const newChip = new ChipSelect(
                `chips/chip${chipValue.color}.png`,
                new PIXI.Point(0.5, 0.5),
                this._renderer,
                index
            );

            newChip.setSelected(index === SELECTED_CHIP);
            newChip.onClicked(this.handleChipSelected);

            this._chips.push(newChip);
            this._container.addChild(newChip.Sprite);
            this._container.addChild(newChip.ChipText);
        });
    }

    private handleChipSelected = (chipIndex: number): void => {
        this._chips.forEach((chip, index) => {
            chip.setSelected(index === chipIndex);
        });
        GameState.selectedChip = CHIP_VALUES[chipIndex];
    };

    private handleButtonClick = (index: number): void => {
        // 0 = spin
        if (index === 0 && GameState.Spin()) {
            SoundManager.Spin();
        } else if (index === 1) {
            //1 = clear
            GameState.Clear();
        } else if (index < 0) {
            GameState.scene = Scene.MENU;
        }
    };

    get Container(): PIXI.Container {
        return this._container;
    }

    updateGameText(): void {
        if (this._balanceText.Text.text !== "BALANCE " + GameState.balance)
            this._balanceText.changeText("BALANCE " + GameState.balance);

        if (this._betText.Text.text !== "BET " + GameState.bet) this._betText.changeText("BET " + GameState.bet);
    }
}

export default GameMenu;
