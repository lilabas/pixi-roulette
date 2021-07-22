import * as PIXI from "pixi.js";
import BoardPart from "./BoardPart";

class Chip extends BoardPart {
    _dropPosition: PIXI.Point;

    constructor(
        textureName: string,
        anchorPoint: PIXI.Point,
        renderer: PIXI.AbstractRenderer,
        dropPosition: PIXI.Point
    ) {
        super(textureName, anchorPoint, renderer);
        this._dropPosition = dropPosition;
        this._dropPosition.x = dropPosition.x + Math.random() * 10;
        this._dropPosition.y = dropPosition.y + Math.random() * 10;
        const scaleFactor = this._renderer.screen.width / this._sprite.texture.width;
        this._sprite.scale.set(scaleFactor * 0.025);
        this._sprite.x = this._dropPosition.x;
        this._sprite.y = this._dropPosition.y;
    }
}

export default Chip;
