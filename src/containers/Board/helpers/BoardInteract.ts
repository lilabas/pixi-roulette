import * as PIXI from "pixi.js";
import Table from "../components/Table";
import Hitbox from "./hitboxes/Hitbox";

class BoardInteract {
    _renderer: PIXI.AbstractRenderer;
    _container: PIXI.Container;
    _scale: number;
    _table: Table;
    _hitboxes: Array<Hitbox>;

    constructor(renderer: PIXI.AbstractRenderer, scale: number, table: Table) {
        this._renderer = renderer;
        this._container = new PIXI.Container();
        this._scale = scale;
        this._table = table;
        this._hitboxes = [];
    }

    get Container(): PIXI.Container {
        return this._container;
    }

    update(deltaTime: number): void {
        this._container.scale.set(this._scale);

        this._hitboxes.forEach((hitbox) => {
            hitbox.update(deltaTime, this._table);
        });
    }
}

export default BoardInteract;
