import { CHIP_VALUES, INITIAL_BALANCE, Scene, SELECTED_CHIP, SPIN_TIME } from "../constants/config";
import BetResolver from "./BetResolver";

declare global {
    interface IChip {
        color: string;
        value: number;
    }

    interface IBetHistory {
        bet: number;
        winAmount: number;
        winNumber: number;
    }

    interface IPlacedBet {
        chip: IChip;
        location: string;
    }
}

class GameState {
    static scene: Scene = Scene.MENU;
    static balance = INITIAL_BALANCE;
    static bet = 0;
    static selectedChip: IChip = CHIP_VALUES[SELECTED_CHIP];
    static lastWinNumber = -1;
    static lastWinAmount = -1;
    static placedBets: Array<IPlacedBet> = [];
    static betHistory: Array<IBetHistory> = [];
    static sound = true;
    static cleaned = false;
    static spinning = false;

    public static PlaceBet(location: string): boolean {
        //needs enough balance, must not be spinning
        if (this.balance < this.selectedChip.value || this.spinning) return false;
        this.balance -= this.selectedChip.value;
        this.bet += this.selectedChip.value;
        this.placedBets.push({ chip: this.selectedChip, location });
        return true;
    }

    public static Spin(): boolean {
        //needs bets placed, must not be spinning
        if (this.bet === 0 || this.spinning) return false;
        this.spinning = true;
        this.lastWinNumber = this.GenerateWinningNumber();
        this.lastWinAmount = BetResolver.DetermineWinningAmount(this.lastWinNumber, this.placedBets);
        setTimeout(() => {
            this.updateSpinResults();
        }, SPIN_TIME);
        return true;
    }

    private static updateSpinResults(): void {
        this.spinning = false;
        this.balance += this.lastWinAmount;
        this.betHistory.unshift({ bet: this.bet, winAmount: this.lastWinAmount, winNumber: this.lastWinNumber });
        this.Cleanup();
    }

    private static GenerateWinningNumber(): number {
        const min = 0;
        const max = 36;
        return Math.floor(Math.random() * (max - min) + min);
    }

    static Clear(): void {
        this.balance += this.bet;
        this.Cleanup();
    }

    // cleanup variables after spin
    static Cleanup(): void {
        this.bet = 0;
        this.placedBets = [];
        this.cleaned = true;
    }

    static Reset(): void {
        this.scene = Scene.MENU;
        this.balance = INITIAL_BALANCE;
        this.bet = 0;
        this.selectedChip = CHIP_VALUES[SELECTED_CHIP];
        this.lastWinNumber = -1;
        this.lastWinAmount = -1;
        this.placedBets = [];
        this.betHistory = [];
        this.sound = true;
        this.cleaned = true;
    }
}

export default GameState;
