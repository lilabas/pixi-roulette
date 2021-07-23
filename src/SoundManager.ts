import * as pixiSound from "pixi-sound";
import { SPIN_TIME } from "./constants/config";

class SoundManager {
    static ambientPlaying = false;
    static init(): void {
        pixiSound.default.add("click", "../assets/sounds/click1.ogg");
        pixiSound.default.add("spin", "../assets/sounds/spin.mp3");
        pixiSound.default.add("chip", "../assets/sounds/chip.wav");
        pixiSound.default.add("win", "../assets/sounds/win.wav");
        pixiSound.default.add("ambient", "../assets/sounds/ambient.mp3");
        pixiSound.default.volume("ambient", 0.1);
    }

    static Start(): void {
        this.Ambient();
        this.Switch();
    }

    static Switch(): void {
        if (this.ambientPlaying) {
            pixiSound.default.muteAll();
        } else {
            pixiSound.default.unmuteAll();
        }
        this.ambientPlaying = !this.ambientPlaying;
    }

    static Ambient(): void {
        pixiSound.default.play("ambient", { loop: true });
    }

    static Click(): void {
        pixiSound.default.play("click");
    }

    static Chip(): void {
        pixiSound.default.play("chip");
    }

    static Win(): void {
        pixiSound.default.play("win");
    }

    static Spin(): void {
        pixiSound.default.play("spin");
        setTimeout(() => {
            pixiSound.default.stop("spin");
        }, SPIN_TIME);
    }
}

export default SoundManager;
