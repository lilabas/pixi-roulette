import * as PIXI from "pixi.js";
import Table from "../../components/Table";
import Hitbox from "./Hitbox";

class HitboxZero extends Hitbox {
    constructor(
        textureName: string,
        anchorPoint: PIXI.Point,
        renderer: PIXI.AbstractRenderer,
        offset: PIXI.Point,
        name: string
    ) {
        super(textureName, anchorPoint, renderer, offset, name);
        //this._sprite.filters = [new PIXI.filters.AlphaFilter(0.5)];
    }

    update(deltaTime: number, table: Table): void {
        const tableRect = table.Sprite.getBounds(true);
        const scaleFactor = this._renderer.screen.width / this._sprite.texture.width;
        this._sprite.scale.set(scaleFactor * 0.029 * 1.3, scaleFactor * 0.029 * 3);
        const spriteBounds = this._sprite.getBounds();
        const offsetX = this._offset.x * spriteBounds.width * 1.44;
        const offsetY = this._offset.y * spriteBounds.height * 1.46;
        this._sprite.x = offsetX + (tableRect.x + tableRect.width / 1.31);
        this._sprite.y = tableRect.y + tableRect.height * 0.285 - offsetY;
    }
}

export default HitboxZero;
