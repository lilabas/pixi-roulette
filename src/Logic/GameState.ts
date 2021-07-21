import { INITIAL_BALANCE } from "../constants/config";

interface IChip {
    color: string;
    value: number;
}

enum ChipValues {
    none = 1,
    yellow = 1,
    white = 5,
    red = 10,
    purple = 20,
    orange = 50,
    green = 100,
    blue = 500,
    black = 1000,
}

class GameState {
    static balance = INITIAL_BALANCE;
    static bet = 0;
    static selectedChip: IChip = { color: "Orange", value: ChipValues.orange };
}

export default GameState;
