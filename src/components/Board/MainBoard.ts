import * as PIXI from "pixi.js";
import BoardPart from "./helpers/BoardPart";
import Table from "./Table";

class MainBoard {
    _renderer: PIXI.AbstractRenderer;
    _container: PIXI.Container;
    _scale: number;
    _children: Array<BoardPart>;
    _table: Table;

    constructor(renderer: PIXI.AbstractRenderer, scale: number, table: Table) {
        this._renderer = renderer;
        this._container = new PIXI.Container();
        this._scale = scale;
        this._children = [];
        this._table = table;
        this._container.addChild(this._table.Sprite);
    }

    addComponent(component: BoardPart): void {
        this._container.addChild(component.Sprite);
        this._children.push(component);
    }

    get Container(): PIXI.Container {
        return this._container;
    }

    update(deltaTime: number): void {
        this._container.pivot.x = 0;
        this._container.pivot.y = this._renderer.screen.height - this._container.height / this._scale;
        this._container.y = this._renderer.screen.height - this._container.height;

        this._container.scale.set(this._scale);

        this._table.update(deltaTime);

        this._children.forEach((child) => {
            child.update(deltaTime, this._table);
        });
    }
}

export default MainBoard;
