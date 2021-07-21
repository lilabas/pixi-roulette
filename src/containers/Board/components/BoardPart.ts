import * as PIXI from "pixi.js";

//const SCALEDOWN_FACTOR = 1.3;

class BoardPart {
    _renderer: PIXI.AbstractRenderer;
    _sprite: PIXI.Sprite;

    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        this._renderer = renderer;
        this._sprite = this.initSprite(textureName, anchorPoint);
    }

    private initSprite(textureName: string, anchorPoint: PIXI.Point): PIXI.Sprite {
        const sprite = PIXI.Sprite.from(textureName);
        sprite.anchor.set(anchorPoint.x, anchorPoint.y);
        // sprite.interactive = true;
        // sprite.hitArea = new PIXI.Rectangle(0, 0, 100, 100);
        // sprite.on("click", (event) => {
        // });
        return sprite;
    }

    get Sprite(): PIXI.Sprite {
        return this._sprite;
    }

    update(deltaTime: number, anotherPart: BoardPart): void {
        if (!anotherPart) return;
        //console.log("🚀 ~ file: BoardPart.ts ~ line 29 ~ BoardPart ~ update ~ anotherPart", anotherPart);
        //console.log("board part update");
    }
}

export default BoardPart;
