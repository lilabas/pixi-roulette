import * as PIXI from "pixi.js";
import BoardPart from "../helpers/BoardPart";

class MainBoard {
    _renderer: PIXI.AbstractRenderer;
    _container: PIXI.Container;
    _scale: number;
    _children: Array<BoardPart>;

    constructor(renderer: PIXI.AbstractRenderer, scale: number) {
        this._renderer = renderer;
        this._container = new PIXI.Container();
        this._scale = scale;
        this._children = [];
    }

    addComponent(component: BoardPart): void {
        this._container.addChild(component.Sprite);
        this._children.push(component);
    }

    get Container(): PIXI.Container {
        return this._container;
    }

    update(): void {
        this._container.pivot.x = 0;
        this._container.pivot.y = this._renderer.screen.height - this._container.height / this._scale;
        this._container.y = this._renderer.screen.height - this._container.height;

        this._container.scale.set(this._scale);

        this._children.forEach((child) => {
            child.update();
        });
    }
}

export default MainBoard;
