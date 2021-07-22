import { CHIP_VALUES, INITIAL_BALANCE, SELECTED_CHIP } from "../constants/config";
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
    static balance = INITIAL_BALANCE;
    static bet = 0;
    static selectedChip: IChip = CHIP_VALUES[SELECTED_CHIP];
    static lastWinNumber = -1;
    static lastWinAmount = -1;
    static placedBets: Array<IPlacedBet> = [];
    static betHistory: Array<IBetHistory> = [];
    static sound = true;
    static cleaned = false;

    public static PlaceBet(location: string): boolean {
        //needs enough balance
        if (this.balance < this.selectedChip.value) return false;
        this.balance -= this.selectedChip.value;
        this.bet += this.selectedChip.value;
        this.placedBets.push({ chip: this.selectedChip, location });
        return true;
    }

    public static Spin(): boolean {
        //needs bets placed
        if (this.bet === 0) return false;
        this.lastWinNumber = this.GenerateWinningNumber();
        console.log("🚀 ~ file: GameState.ts ~ line 46 ~ GameState ~ Spin ~ lastWinNumber", this.lastWinNumber);
        this.lastWinAmount = BetResolver.DetermineWinningAmount(this.lastWinNumber, this.placedBets);
        console.log("🚀 ~ file: GameState.ts ~ line 48 ~ GameState ~ Spin ~ lastWinAmount", this.lastWinAmount);
        this.balance += this.lastWinAmount;
        this.betHistory.push({ bet: this.bet, winAmount: this.lastWinAmount, winNumber: this.lastWinNumber });

        //this.Cleanup();
        return true;
    }

    private static GenerateWinningNumber(): number {
        const min = 0;
        const max = 36;
        return Math.floor(Math.random() * (max - min) + min);
    }

    // cleanup variables after spin
    static Cleanup(): void {
        this.balance += this.bet;
        this.bet = 0;
        this.placedBets = [];
        this.cleaned = true;
    }
}

export default GameState;
