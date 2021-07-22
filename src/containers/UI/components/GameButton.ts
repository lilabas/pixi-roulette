import * as PIXI from "pixi.js";
import UIPart from "./UIPart";
import UIText from "./UIText";

class GameButton extends UIPart {
    _place: number;
    _buttonText: UIText = new UIText("", "", 0, 0);
    _scale = 1.5;
    _menu = false;
    _mainMenu = false;

    constructor(
        textureName: string,
        anchorPoint: PIXI.Point,
        renderer: PIXI.AbstractRenderer,
        place: number,
        text: string,
        menu = false,
        mainMenu = false
    ) {
        super(textureName, anchorPoint, renderer);
        this._place = place;
        this._scale = menu ? 2.5 : this._scale;
        this._menu = menu;
        this._mainMenu = mainMenu;
        this.initButton(text);
    }

    private initButton(text: string): void {
        //const scaleFactor = this._sprite.texture.width / this._renderer.screen.width;
        this._sprite.scale.set(this._scale);
        const menuOffsetX = this._menu ? 0.1 : 0.15;
        let offsetX = this._renderer.screen.width - this._renderer.screen.width * menuOffsetX;
        if (this._mainMenu) offsetX = this._renderer.screen.width / 2;
        const offsetY = this._renderer.screen.height - this._renderer.screen.height * (0.3 - this._place * 0.1);
        this._sprite.position.set(offsetX, offsetY);

        this._sprite.on("pointerover", this.handleOnPointerOver, this);
        this._sprite.on("pointerout", this.handleOnPointerOut, this);
        this._sprite.on("pointerdown", this.handleOnPointerDown, this);

        const textSize = this._menu ? 24 : 30;
        const buttonText = new UIText(text, "0x000000", textSize, 3);
        buttonText.Text.anchor.set(0.5, 0.5);
        buttonText.Text.position.set(this._sprite.position.x, this._sprite.position.y);
        this._buttonText = buttonText;
    }

    get ButtonText(): PIXI.Text {
        return this._buttonText.Text;
    }

    private handleOnPointerDown(): void {
        this._onClick(this._place);
    }

    private handleOnPointerOver(): void {
        this._sprite.scale.set(this._scale + this._scale * 0.1);
    }

    private handleOnPointerOut(): void {
        this._sprite.scale.set(this._scale);
    }
}

export default GameButton;
