import * as PIXI from "pixi.js";
import BoardPart from "../helpers/BoardPart";

class Wheel extends BoardPart {
    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        super(textureName, anchorPoint, renderer);
    }

    update(): void {
        this._sprite.x = 0;
        this._sprite.y = this._renderer.screen.height;
        this._sprite.scale.set(
            this._renderer.screen.width / this._sprite.texture.width,
            this._renderer.screen.height / this._sprite.texture.height
        );
    }
}

export default Wheel;
