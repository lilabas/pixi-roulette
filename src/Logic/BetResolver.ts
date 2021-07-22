import {
    BET_LOCATION_BIG_TRIPLES,
    BET_LOCATION_DOUBLES,
    BET_LOCATION_NUMBERS,
    BET_LOCATION_ZERO,
    BLACK_BETS,
    RED_BETS,
} from "../constants/config";

class BetResolver {
    // calculates wins that are worth double
    private static CalcDoubleBetWins(winNumber: number, placedBets: Array<IPlacedBet>): number {
        // no win
        if (winNumber === 0) return 0;

        const betsPlacedOnDoubles = placedBets.filter(
            (placedBet) => placedBet.location.split("-")[0] === BET_LOCATION_DOUBLES
        );

        const wins = betsPlacedOnDoubles.reduce((sum, placedBet) => {
            const betLocationId = placedBet.location.split("-")[1];
            let win = false;
            // 1 - 18
            if (winNumber > 0 && winNumber <= 18 && betLocationId === "1") win = true;
            // even
            if (winNumber % 2 === 0 && betLocationId === "2") win = true;
            // red
            if (RED_BETS.indexOf(winNumber) >= 0 && betLocationId === "3") win = true;
            // black
            if (BLACK_BETS.indexOf(winNumber) >= 0 && betLocationId === "4") win = true;
            // odd
            if (winNumber % 2 !== 0 && betLocationId === "5") win = true;
            // 19 - 36
            if (winNumber > 18 && winNumber <= 36 && betLocationId === "6") win = true;

            if (win) return sum + placedBet.chip.value * 2;

            return sum;
        }, 0);

        return wins;
    }

    // calculates wins that are worth triple
    private static CalcTripleBetWins(winNumber: number, placedBets: Array<IPlacedBet>): number {
        // no win
        if (winNumber === 0) return 0;

        const betsPlacedOnBottomTriples = placedBets.filter(
            (placedBet) => placedBet.location.split("-")[0] === BET_LOCATION_BIG_TRIPLES
        );

        //side triples are on last 3 number bet loactions
        const betsPlacedOnSideTriples = placedBets.filter(
            (placedBet) =>
                placedBet.location.split("-")[0] === BET_LOCATION_NUMBERS &&
                Number(placedBet.location.split("-")[1]) > 36
        );

        const betsPlacedOnTriples = [...betsPlacedOnBottomTriples, ...betsPlacedOnSideTriples];

        const wins = betsPlacedOnTriples.reduce((sum, placedBet) => {
            const betLocationId = placedBet.location.split("-")[1];
            let win = false;
            // first bottom triples
            if (winNumber > 0 && winNumber <= 12 && betLocationId === "1") win = true;
            // second bottom triples
            if (winNumber > 12 && winNumber <= 24 && betLocationId === "2") win = true;
            // third bottom triples
            if (winNumber > 24 && winNumber <= 36 && betLocationId === "3") win = true;
            // first columns triples
            if (winNumber % 3 === 1 && betLocationId === "37") win = true;
            // second columns triples
            if (winNumber % 3 === 2 && betLocationId === "38") win = true;
            // third columns triples
            if (winNumber % 3 === 0 && betLocationId === "39") win = true;

            if (win) return sum + placedBet.chip.value * 3;

            return sum;
        }, 0);

        return wins;
    }

    // calculates wins on the number
    private static CalcNumberBetWins(winNumber: number, placedBets: Array<IPlacedBet>): number {
        const betsPlacedOnNumbers = placedBets.filter(
            (placedBet) => placedBet.location.split("-")[0] === BET_LOCATION_NUMBERS
        );

        //side triples are on last 3 number bet loactions
        const betsPlacedOnZero = placedBets.filter(
            (placedBet) => placedBet.location.split("-")[0] === BET_LOCATION_ZERO
        );

        const betsPlacedOnAllNumbers = [...betsPlacedOnNumbers, ...betsPlacedOnZero];

        const wins = betsPlacedOnAllNumbers.reduce((sum, placedBet) => {
            const betLocationId = placedBet.location.split("-")[1];
            // regular numbers
            if (winNumber > 0 && winNumber === Number(betLocationId)) return sum + placedBet.chip.value * 36;
            // zero
            if (winNumber === 0 && winNumber === Number(betLocationId)) return sum + placedBet.chip.value * 37;

            return sum;
        }, 0);

        return wins;
    }

    static DetermineWinningAmount(winNumber: number, placedBets: Array<IPlacedBet>): number {
        const doubleBetWins = this.CalcDoubleBetWins(winNumber, placedBets);
        const tripleBetWins = this.CalcTripleBetWins(winNumber, placedBets);
        const numberWins = this.CalcNumberBetWins(winNumber, placedBets);

        return doubleBetWins + tripleBetWins + numberWins;
    }
}

export default BetResolver;
