import * as PIXI from "pixi.js";
import BoardPart from "./BoardPart";
import Table from "./Table";
import GameState from "../../../Logic/GameState";

import { SPIN_ROUNDS, SPIN_TIME, WHEEL_LAYOUT } from "../../../constants/config";

class Wheel extends BoardPart {
    _spinning = false;
    _t = 0;
    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        super(textureName, anchorPoint, renderer);
    }

    update(deltaTime: number, table: Table, elapsedMS: number): void {
        const tableRect = table.Sprite.getBounds(true);
        this._sprite.x = tableRect.x + this._sprite.width - tableRect.width / 7.8;
        this._sprite.y = tableRect.y - this._sprite.height + tableRect.height * 1.22;
        const scaleFactor = this._renderer.screen.width / this._sprite.texture.width;
        this._sprite.scale.set(scaleFactor * 0.32);

        if (!this._spinning && GameState.spinning) this.StartSpinSequence();

        if (this._spinning) {
            this.rotateToWinNumber(deltaTime, elapsedMS);
        }
    }

    private StartSpinSequence(): void {
        this._t = 0;
        this._spinning = true;
    }

    angleToWinNumber(): number {
        const singleFieldAngle = 360.0 / WHEEL_LAYOUT.length;
        const winNumberIndex = WHEEL_LAYOUT.indexOf(GameState.lastWinNumber);
        const angle = 360 - singleFieldAngle * winNumberIndex;

        return angle;
    }

    private rotateToWinNumber(deltaTime: number, elapsedMS: number): void {
        const angleToReach = SPIN_ROUNDS * 360 + this.angleToWinNumber();
        if (this._t < 1) {
            this._t += elapsedMS / SPIN_TIME;
            const deltaAngle = angleToReach * this._t - this._sprite.angle;
            this._sprite.angle += deltaAngle * deltaTime;
        } else {
            this._spinning = false;
            this._sprite.angle = this.angleToWinNumber();
        }
    }

    // private idleSpin(deltaTime: number): void {
    //     this._sprite.rotation += 0.01 * deltaTime;
    // }
}

export default Wheel;
