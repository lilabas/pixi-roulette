import * as PIXI from "pixi.js";
import UIText from "./UIText";
import GameState from "../../../Logic/GameState";
import ChipSelect from "./ChipSelect";
import { CHIP_VALUES, SELECTED_CHIP } from "../../../constants/config";

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
    }

    private initGameText(): void {
        this._container.addChild(this._balanceText.Text);

        this._betText.Text.position.set(0, 50);
        this._container.addChild(this._betText.Text);
    }

    private handleChipSelected = (chipIndex: number): void => {
        this._chips.forEach((chip, index) => {
            chip.setSelected(index === chipIndex);
        });
        GameState.selectedChip = CHIP_VALUES[chipIndex];
    };

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
