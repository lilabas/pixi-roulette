import * as PIXI from "pixi.js";
//import { GAME_HEIGHT, GAME_WIDTH } from "../../constants/config";

class Background {
    _renderer: PIXI.AbstractRenderer;
    _sprite: PIXI.Sprite;

    constructor(renderer: PIXI.AbstractRenderer) {
        this._renderer = renderer;
        this._sprite = this.initSprite();
    }

    private initSprite(): PIXI.Sprite {
        const sprite = PIXI.Sprite.from("background");
        sprite.anchor.set(0.5, 0.5);
        return sprite;
    }

    public get Sprite(): PIXI.Sprite {
        return this._sprite;
    }

    update(): void {
        this._sprite.x = this._renderer.screen.width / 2;
        this._sprite.y = this._renderer.screen.height / 2;
        this._sprite.scale.set(this._renderer.screen.width / 320, this._renderer.screen.height / 240);
    }
}

export default Background;
