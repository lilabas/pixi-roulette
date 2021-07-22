export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;
export const INITIAL_BALANCE = 10000.0;
export const COMPONETS_SCALE = 0.7;
export const SELECTED_CHIP = 4;

export const enum Scene {
    MENU,
    GAME,
    HISTORY,
}

// bet loaction names
export const BET_LOCATION_NUMBERS = "BET_LOCATION_NUMBERS";
export const BET_LOCATION_BIG_TRIPLES = "BET_LOCATION_BIG_TRIPLES";
export const BET_LOCATION_DOUBLES = "BET_LOCATION_DOUBLES";
export const BET_LOCATION_ZERO = "BET_LOCATION_ZERO";

//bet colors
export const RED_BETS = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
export const BLACK_BETS = [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26];

//chips
export const CHIP_VALUES = [
    {
        color: "Yellow",
        value: 1,
    },
    {
        color: "White",
        value: 5,
    },
    {
        color: "Red",
        value: 10,
    },
    {
        color: "Purple",
        value: 20,
    },
    {
        color: "Orange",
        value: 50,
    },
    {
        color: "Green",
        value: 100,
    },
    {
        color: "Blue",
        value: 500,
    },
    {
        color: "Black",
        value: 1000,
    },
];
