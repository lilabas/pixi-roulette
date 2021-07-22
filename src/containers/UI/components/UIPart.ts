import * as PIXI from "pixi.js";
import SoundManager from "../../../SoundManager";

interface IUIClick {
    (index: number): void;
}

class UIPart {
    _renderer: PIXI.AbstractRenderer;
    _sprite: PIXI.Sprite;
    _onClick: IUIClick = () => null;

    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        this._renderer = renderer;
        this._sprite = this.initSprite(textureName, anchorPoint);
    }

    private initSprite(textureName: string, anchorPoint: PIXI.Point): PIXI.Sprite {
        const sprite = PIXI.Sprite.from(textureName);
        sprite.anchor.set(anchorPoint.x, anchorPoint.y);

        sprite.interactive = true;
        sprite.buttonMode = true;

        return sprite;
    }

    get Sprite(): PIXI.Sprite {
        return this._sprite;
    }

    onClicked(callback: IUIClick): void {
        this._onClick = callback;
    }

    update(deltaTime: number): void {
        //
    }
}

export default UIPart;
