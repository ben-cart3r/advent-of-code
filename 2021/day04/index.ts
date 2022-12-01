import { difference, subset, sum } from "../../common";

const x = /\s+/;

export const parse = (input: string) => {
    const sections = input.split("\n\n");

    // Inputs to the bingo game
    const inputs = sections[0].split(",").map((item) => parseInt(item));

    const boards = sections.slice(1).map((board) => {
        return board
            .trim()
            .split(/\s+/)
            .map((tile) => parseInt(tile));
    });

    return {
        inputs,
        boards,
    };
};

const isBingo = (board: Array<number>, drawn: Array<number>) => {
    const tiles = board;

    for (let i = 0; i < 5; i++) {
        const row = tiles.slice(i * 5, i * 5 + 5);

        if (subset(row, drawn)) {
            return true;
        }

        const column = [
            tiles[0 * 5 + i],
            tiles[1 * 5 + i],
            tiles[2 * 5 + i],
            tiles[3 * 5 + i],
            tiles[4 * 5 + i],
        ];

        if (subset(column, drawn)) {
            return true;
        }
    }

    return false;
};

export const part1 = (input: string) => {
    const { inputs, boards } = parse(input);

    // Game state
    let counter = 0;
    let winningBoardIndex = null;

    while (counter < inputs.length && !winningBoardIndex) {
        // Draw a new number each game loop
        const drawn = inputs.slice(0, counter);

        // Check every board until first bingo found
        for (let i = 0; i < boards.length; ++i) {
            if (isBingo(boards[i], drawn)) {
                winningBoardIndex = i;
            }
        }

        counter++;
    }

    // Final State
    const drawn = inputs.slice(0, counter - 1);
    const lastDrawn = drawn[drawn.length - 1];
    const winningBoard = boards[winningBoardIndex];

    // Find all unmarked tiles on board
    const unmarked = [...difference(new Set(winningBoard), new Set(drawn))];
    const boardScore = sum(...unmarked) * lastDrawn;

    return boardScore.toString();
};

export const part2 = (input: string) => {
    const { inputs, boards } = parse(input);

    // Ordered list of board indexes by winning order
    const winningBoards: Array<number> = [];

    let counter = 0;

    while (counter < inputs.length && winningBoards.length != boards.length) {
        // Draw a new number each game loop
        const drawn = inputs.slice(0, counter);

        // Check every board until all boards have 1 bingo
        for (let i = 0; i < boards.length; ++i) {
            // Only check boards without a bingo
            if (!winningBoards.includes(i)) {
                if (isBingo(boards[i], drawn)) {
                    winningBoards.push(i);
                }
            }
        }

        counter++;
    }

    // Final State
    const drawn = inputs.slice(0, counter - 1);
    const lastDrawn = drawn[drawn.length - 1];
    const losingBoard = boards[winningBoards[winningBoards.length - 1]];

    // Find all unmarked tiles on board
    const unmarked = [...difference(new Set(losingBoard), new Set(drawn))];
    const boardScore = sum(...unmarked) * lastDrawn;

    return boardScore.toString();
};
