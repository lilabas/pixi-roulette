import * as PIXI from "pixi.js";
class BoardPart {
    _renderer: PIXI.AbstractRenderer;
    _sprite: PIXI.Sprite;

    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        this._renderer = renderer;
        this._sprite = this.initSprite(textureName, anchorPoint);
    }

    private initSprite(textureName: string, anchorPoint: PIXI.Point): PIXI.Sprite {
        const sprite = PIXI.Sprite.from(textureName);
        sprite.anchor.set(anchorPoint.x, anchorPoint.y);
        return sprite;
    }

    get Sprite(): PIXI.Sprite {
        return this._sprite;
    }

    update(deltaTime: number, anotherPart: BoardPart, elapsedMS: number): void {
        if (!anotherPart || !elapsedMS || !deltaTime) return;
    }
}

export default BoardPart;
