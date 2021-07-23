import * as PIXI from "pixi.js";
import { Tweener } from "pixi-tweener";
import { easing } from "ts-easing";
import BoardPart from "../containers/Board/components/BoardPart";
import GameState from "../Logic/GameState";
import { SPIN_TIME } from "../constants/config";
import SoundManager from "../SoundManager";

class WinPopup extends BoardPart {
    _container;
    _prepareToShow = false;
    _fireWorks: PIXI.AnimatedSprite;

    constructor(textureName: string, anchorPoint: PIXI.Point, renderer: PIXI.AbstractRenderer) {
        super(textureName, anchorPoint, renderer);
        this._container = new PIXI.Container();
        Tweener.init(PIXI.Ticker.shared);
        this._fireWorks = new PIXI.AnimatedSprite([PIXI.Texture.from(`fireworks/Firework-1.png`)]);
        this.init();
    }

    init(): void {
        this._sprite.x = this._renderer.width / 2 + this._sprite.width / 2;
        this._sprite.y = 3000;

        this._fireWorks = new PIXI.AnimatedSprite(
            Array.from({ length: 29 }, (v, i) => i).map((n) => PIXI.Texture.from(`fireworks/Firework-${n + 1}.png`))
        );

        this._fireWorks.x = this._renderer.width / 2 + this._fireWorks.width / 2;
        this._fireWorks.y = this._renderer.height / 2 + this._fireWorks.height / 2;
        this._fireWorks.anchor.set(0.5);
        this._fireWorks.scale.set(4);
        this._fireWorks.loop = true;
        this._fireWorks.animationSpeed = 0.25;
        this._fireWorks.play();

        this._container.addChild(this._sprite);
    }

    get Container(): PIXI.Container {
        return this._container;
    }

    async show(): Promise<void> {
        if (GameState.lastWinAmount === 0) return;
        SoundManager.Win();
        this._sprite.y = 3000;
        this._sprite.filters = [new PIXI.filters.AlphaFilter(1.0)];
        this._container.addChild(this._fireWorks);

        await Tweener.add(
            { target: this._sprite, duration: 3, ease: easing.outQuart },
            { y: this._renderer.height / 2 }
        );
        await Tweener.add({ target: this._sprite, duration: 1, ease: easing.inQuint }, { alpha: 0.0 });
        this._container.removeChild(this._fireWorks);
        this._prepareToShow = false;
    }

    waitToShow(): void {
        this._prepareToShow = true;
        setTimeout(() => {
            this.show();
        }, SPIN_TIME + 100);
    }

    check(): void {
        if (GameState.spinning && !this._prepareToShow) {
            this.waitToShow();
        }
    }
}

export default WinPopup;
