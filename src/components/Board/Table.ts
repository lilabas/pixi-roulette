import * as PIXI from "pixi.js";
import BoardPart from "../helpers/BoardPart";

class Table extends BoardPart {
    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        super(textureName, anchorPoint, renderer);
    }

    update(): void {
        super.update();
        this._sprite.x = 0;
        this._sprite.y = this._renderer.screen.height;
        const scaleFactor = this._sprite.texture.width / this._renderer.screen.width;

        this._sprite.scale.set(scaleFactor);
    }
}

export default Table;
