import * as PIXI from "pixi.js";
import BoardPart from "./BoardPart";
import Table from "./Table";
import BoardInteract from "../helpers/BoardInteract";
import Hitbox from "../helpers/hitboxes/Hitbox";
import HitboxBig3 from "../helpers/hitboxes/HitboxBig3";
import HitboxBottom6 from "../helpers/hitboxes/HitboxBottom6";
import HitboxZero from "../helpers/hitboxes/HitboxZero";

class MainBoard {
    _renderer: PIXI.AbstractRenderer;
    _container: PIXI.Container;
    _scale: number;
    _children: Array<BoardPart>;
    _table: Table;
    _boardInteract: BoardInteract;

    constructor(renderer: PIXI.AbstractRenderer, scale: number, table: Table) {
        this._renderer = renderer;
        this._container = new PIXI.Container();
        this._scale = scale;
        this._children = [];
        this._table = table;
        this._container.addChild(this._table.Sprite);
        this._boardInteract = new BoardInteract(renderer, scale, table);
        this._container.addChild(this._boardInteract.Container);

        this.buildHitboxes();
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

        this._table.update();

        this._children.forEach((child) => {
            child.update(deltaTime, this._table);
        });

        this._boardInteract.update(deltaTime);
    }

    private buildHitboxes(): void {
        let num = 1;

        // Numbers from 1-36 + column triples
        for (let cols = 0; cols < 13; cols++) {
            for (let rows = 0; rows < 3; rows++) {
                const hitbox = new Hitbox(
                    "board/hitbox.png",
                    new PIXI.Point(0.5, 0.5),
                    this._renderer,
                    new PIXI.Point(cols, rows),
                    `hitbox-${num}`
                );
                this.addComponent(hitbox);
                num++;
            }
        }

        //big triples
        num = 1;
        for (let cols = 0; cols < 3; cols++) {
            const hitboxBig3 = new HitboxBig3(
                "board/hitbox.png",
                new PIXI.Point(0.5, 0.5),
                this._renderer,
                new PIXI.Point(cols, 0),
                `hitboxBig3-${num}`
            );
            this.addComponent(hitboxBig3);
            num++;
        }

        //b6 bottom bets
        num = 1;
        for (let cols = 0; cols < 6; cols++) {
            const hitboxBottom6 = new HitboxBottom6(
                "board/hitbox.png",
                new PIXI.Point(0.5, 0.5),
                this._renderer,
                new PIXI.Point(cols, 0),
                `HitboxBottom6-${num}`
            );
            this.addComponent(hitboxBottom6);
            num++;
        }

        //zero
        const hitboxZero = new HitboxZero(
            "board/hitbox.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            new PIXI.Point(0, 0),
            `HitboxZero`
        );
        this.addComponent(hitboxZero);
    }
}

export default MainBoard;
