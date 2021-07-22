import * as PIXI from "pixi.js";

class UIText {
    _text: PIXI.Text;

    constructor(text: string, color: string, size: number, stroke = 19) {
        const style = new PIXI.TextStyle({
            fill: "white",
            fontFamily: '"Lucida Console", Monaco, monospace',
            fontSize: size,
            lineJoin: "bevel",
            stroke: color,
            strokeThickness: stroke,
        });
        this._text = new PIXI.Text(text, style);
    }

    get Text(): PIXI.Text {
        return this._text;
    }

    public changeText(text: string): void {
        this._text.text = text;
    }
}

export default UIText;
