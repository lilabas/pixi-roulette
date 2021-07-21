import * as PIXI from "pixi.js";
import Table from "../../components/Table";
import Hitbox from "./Hitbox";

class HitboxBig3 extends Hitbox {
    constructor(
        textureName: string,
        anchorPoint: PIXI.Point,
        renderer: PIXI.AbstractRenderer,
        offset: PIXI.Point,
        name: string
    ) {
        super(textureName, anchorPoint, renderer, offset, name);
    }

    update(deltaTime: number, table: Table): void {
        const tableRect = table.Sprite.getBounds(true);
        const scaleFactor = this._renderer.screen.width / this._sprite.texture.width;
        this._sprite.scale.set(scaleFactor * 0.117, scaleFactor * 0.029);
        const spriteBounds = this._sprite.getBounds();
        const offsetX = this._offset.x * spriteBounds.width * 1.43;
        const offsetY = this._offset.y * spriteBounds.height * 1.46;
        this._sprite.x = offsetX + (tableRect.x + tableRect.width / 1.145);
        this._sprite.y = tableRect.y + tableRect.height * 0.575 - offsetY;
    }
}

export default HitboxBig3;
