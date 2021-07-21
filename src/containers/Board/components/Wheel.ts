import * as PIXI from "pixi.js";
import BoardPart from "./BoardPart";
import Table from "./Table";

class Wheel extends BoardPart {
    //_delta = 0.0;
    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        super(textureName, anchorPoint, renderer);
    }

    update(deltaTime: number, table: Table): void {
        const tableRect = table.Sprite.getBounds(true);
        this._sprite.x = tableRect.x + this._sprite.width - tableRect.width / 7.8;
        this._sprite.y = tableRect.y - this._sprite.height + tableRect.height * 1.22;
        const scaleFactor = this._renderer.screen.width / this._sprite.texture.width;
        this._sprite.scale.set(scaleFactor * 0.32);
        this.spin(deltaTime);
    }

    private spin(deltaTime: number): void {
        this._sprite.rotation += 0.01 * deltaTime;
    }
}

export default Wheel;
