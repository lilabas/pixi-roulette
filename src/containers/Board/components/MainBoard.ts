import * as PIXI from "pixi.js";
import BoardPart from "./BoardPart";
import Table from "./Table";
import BoardInteract from "../helpers/BoardInteract";
import Hitbox from "../helpers/hitboxes/Hitbox";
import HitboxBig3 from "../helpers/hitboxes/HitboxBig3";
import HitboxBottom6 from "../helpers/hitboxes/HitboxBottom6";
import HitboxZero from "../helpers/hitboxes/HitboxZero";
import GameState from "../../../Logic/GameState";
import Chip from "./Chip";
import SoundManager from "../../../SoundManager";
import {
    BET_LOCATION_BIG_TRIPLES,
    BET_LOCATION_DOUBLES,
    BET_LOCATION_NUMBERS,
    BET_LOCATION_ZERO,
} from "../../../constants/config";

class MainBoard {
    _renderer: PIXI.AbstractRenderer;
    _container: PIXI.Container;
    _scale: number;
    _children: Array<BoardPart>;
    _table: Table;
    _boardInteract: BoardInteract;
    _placedChipsCointainer: PIXI.Container;

    constructor(renderer: PIXI.AbstractRenderer, scale: number, table: Table) {
        this._renderer = renderer;
        this._container = new PIXI.Container();
        this._placedChipsCointainer = new PIXI.Container();
        this._scale = scale;
        this._children = [];
        this._table = table;
        this._container.addChild(this._table.Sprite);
        this._boardInteract = new BoardInteract(renderer, scale, table);
        this._container.addChild(this._boardInteract.Container);

        this.buildHitboxes();
    }

    update(deltaTime: number): void {
        this._container.pivot.x = 0;
        this._container.pivot.y = this._renderer.screen.height - this._container.height / this._scale;
        this._container.y = this._renderer.screen.height - this._container.height;
        this._container.scale.set(this._scale);

        this._placedChipsCointainer.pivot.x = 0;
        this._placedChipsCointainer.pivot.y =
            this._renderer.screen.height - this._placedChipsCointainer.height / this._scale;
        this._placedChipsCointainer.y = this._renderer.screen.height - this._placedChipsCointainer.height;
        this._placedChipsCointainer.scale.set(this._scale);

        this._table.update();

        this._children.forEach((child) => {
            child.update(deltaTime, this._table);
        });

        this._boardInteract.update(deltaTime);

        this.checkGameState();
    }

    addComponent(component: BoardPart): void {
        this._container.addChild(component.Sprite);
        this._children.push(component);
    }

    private addChip(chip: Chip): void {
        this._placedChipsCointainer.addChild(chip.Sprite);
    }

    get Container(): PIXI.Container {
        return this._container;
    }

    get PlacedChipsContainer(): PIXI.Container {
        return this._placedChipsCointainer;
    }

    private checkGameState(): void {
        if (GameState.cleaned) {
            this.clearBoard();
            GameState.cleaned = false;
        }
    }

    private clearBoard = (): void => {
        this._placedChipsCointainer.removeChildren();
    };

    private handleBoardClick = (name: string, sprite: PIXI.Sprite): void => {
        if (!GameState.PlaceBet(name)) return;
        SoundManager.Click();
        const chip = new Chip(
            `chips/chip${GameState.selectedChip.color}.png`,
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            new PIXI.Point(sprite.position.x, sprite.position.y)
        );
        this.addChip(chip);
    };

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
                    `${BET_LOCATION_NUMBERS}-${num}`
                );
                hitbox.onClicked(this.handleBoardClick);
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
                `${BET_LOCATION_BIG_TRIPLES}-${num}`
            );
            hitboxBig3.onClicked(this.handleBoardClick);
            this.addComponent(hitboxBig3);
            num++;
        }

        // bottom double bets
        num = 1;
        for (let cols = 0; cols < 6; cols++) {
            const hitboxBottom6 = new HitboxBottom6(
                "board/hitbox.png",
                new PIXI.Point(0.5, 0.5),
                this._renderer,
                new PIXI.Point(cols, 0),
                `${BET_LOCATION_DOUBLES}-${num}`
            );
            hitboxBottom6.onClicked(this.handleBoardClick);
            this.addComponent(hitboxBottom6);
            num++;
        }

        //zero
        const hitboxZero = new HitboxZero(
            "board/hitbox.png",
            new PIXI.Point(0.5, 0.5),
            this._renderer,
            new PIXI.Point(0, 0),
            `${BET_LOCATION_ZERO}-0`
        );
        hitboxZero.onClicked(this.handleBoardClick);
        this.addComponent(hitboxZero);
    }
}

export default MainBoard;
