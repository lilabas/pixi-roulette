import * as PIXI from "pixi.js";
import BoardPart from "./BoardPart";
import Wheel from "./Wheel";
import GameState from "../../../Logic/GameState";
import { SPIN_ROUNDS, SPIN_TIME } from "../../../constants/config";

class Ball extends BoardPart {
    _spinning = false;
    _t = 0;
    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        super(textureName, anchorPoint, renderer);
        this._sprite.scale.set(0.3);
    }

    update(deltaTime: number, wheel: Wheel, elapsedMS: number): void {
        this._sprite.position.x = wheel.Sprite.position.x;
        this._sprite.position.y = wheel.Sprite.position.y;

        this._sprite.pivot.y = wheel.Sprite.position.y + wheel.Sprite.height * 0.3;

        if (!this._spinning && GameState.spinning) this.StartSpinSequence();

        if (this._spinning) {
            this.rotateToWinNumber(deltaTime, elapsedMS);
        }
    }

    private StartSpinSequence(): void {
        this._t = 0;
        this._spinning = true;
    }

    private rotateToWinNumber(deltaTime: number, elapsedMS: number): void {
        const angleToReach = SPIN_ROUNDS * 360 * 2; //+ AnimationHelper.angleToWinNumber(true);
        if (this._t < 1) {
            this._t += elapsedMS / SPIN_TIME;
            const deltaAngle = angleToReach * this._t + this._sprite.angle;
            this._sprite.angle -= deltaAngle * deltaTime;
        } else {
            this._sprite.angle = 0;
            this._spinning = false;
        }
    }
}

export default Ball;
