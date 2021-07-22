import * as PIXI from "pixi.js";
import { CHIP_VALUES } from "../../../constants/config";
import UIPart from "./UIPart";
import UIText from "./UIText";
import SoundManager from "../../../SoundManager";

class ChipSelect extends UIPart {
    _place: number;
    _chipText: UIText = new UIText("", "", 0, 0);
    _scale = 0.5;
    _selected = false;
    _originalYPos = 80;

    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer, place: number) {
        super(textureName, anchorPoint, renderer);
        this._place = place;
        this.initChip();
    }

    private initChip(): void {
        this._sprite.scale.set(this._scale);
        const offsetX = this._renderer.screen.width - this._renderer.screen.width * (0.6 - this._place * 0.03);
        this._sprite.position.set(offsetX, this._originalYPos);

        this._sprite.on("pointerover", this.handleOnPointerOver, this);
        this._sprite.on("pointerout", this.handleOnPointerOut, this);
        this._sprite.on("pointerdown", this.handleOnPointerDown, this);

        const chipText = new UIText(CHIP_VALUES[this._place].value.toString(), "0x000000", 20, 3);
        chipText.Text.anchor.set(0.5, 0.5);
        chipText.Text.position.set(this._sprite.position.x, this._sprite.position.y);
        this._chipText = chipText;
    }

    get ChipText(): PIXI.Text {
        return this._chipText.Text;
    }

    setSelected(selected: boolean): void {
        if (selected === this._selected) return;
        this._selected = selected;
        if (selected) {
            this._sprite.scale.set(this._scale + this._scale * 0.2);
            this._sprite.position.y -= 20;
        } else {
            this._sprite.scale.set(this._scale);
            this._sprite.position.y += 20;
        }
        this._chipText.Text.position.set(this._sprite.position.x, this._sprite.position.y);
    }

    private handleOnPointerDown(): void {
        //this._sprite.filters = [new PIXI.filters.AlphaFilter(0.0)];
        if (this._selected) return;
        SoundManager.Chip();
        this._onClick(this._place);
    }

    private handleOnPointerOver(): void {
        if (this._selected) return;
        this._sprite.scale.set(this._scale + this._scale * 0.1);
    }

    private handleOnPointerOut(): void {
        if (this._selected) return;
        this._sprite.scale.set(this._scale);
    }
}

export default ChipSelect;
