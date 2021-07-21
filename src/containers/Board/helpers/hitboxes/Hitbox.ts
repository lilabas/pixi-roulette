import * as PIXI from "pixi.js";
import Table from "../../components/Table";
import BoardPart from "../../components/BoardPart";

class Hitbox extends BoardPart {
    _offset: PIXI.Point;
    _name: string;

    constructor(
        textureName: string,
        anchorPoint: PIXI.Point,
        renderer: PIXI.AbstractRenderer,
        offset: PIXI.Point,
        name: string
    ) {
        super(textureName, anchorPoint, renderer);
        this._offset = offset;
        this._name = name;
        this.init();
    }

    private init(): void {
        this._sprite.interactive = true;
        this._sprite.buttonMode = true;
        this._sprite.filters = [new PIXI.filters.AlphaFilter(0.0)];
        this._sprite.on("pointerover", this.handleOnPointerOver, this);
        this._sprite.on("pointerout", this.handleOnPointerOut, this);
        this._sprite.on("pointerdown", this.handleOnPointerDown, this);
    }

    update(deltaTime: number, table: Table): void {
        const tableRect = table.Sprite.getBounds(true);
        const scaleFactor = this._renderer.screen.width / this._sprite.texture.width;
        this._sprite.scale.set(scaleFactor * 0.029);
        const spriteBounds = this._sprite.getBounds();
        const offsetX = this._offset.x * spriteBounds.width * 1.44;
        const offsetY = this._offset.y * spriteBounds.height * 1.46;
        this._sprite.x = offsetX + (tableRect.x + tableRect.width / 1.233);
        this._sprite.y = tableRect.y + tableRect.height * 0.43 - offsetY;
    }

    private handleOnPointerDown(): void {
        this._sprite.filters = [new PIXI.filters.AlphaFilter(0.0)];
        console.log("pointerdown", this._name);
    }
    private handleOnPointerOver(): void {
        this._sprite.filters = [new PIXI.filters.AlphaFilter(0.5)];
    }
    private handleOnPointerOut(): void {
        this._sprite.filters = [new PIXI.filters.AlphaFilter(0.0)];
    }
}

export default Hitbox;
