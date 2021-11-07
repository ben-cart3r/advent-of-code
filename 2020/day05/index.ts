const parse = (input: string): Array<string> => {
    return input.split("\n");
};

// Boarding pass -> binary -> integer
const getSeatID = (pass: string): number => {
    const binary = [...pass]
        .map((char) => [0, 1, 0, 1]["FBLR".indexOf(char)])
        .join("");

    return parseInt(binary, 2);
};

const solver1 = (input: string): number => {
    const boardingPasses = parse(input);
    const seatIDs = boardingPasses.map((pass) => getSeatID(pass));

    return Math.max(...seatIDs);
};

const solver2 = (input: string): number => {
    const boardingPasses = parse(input);
    const seatIDs = boardingPasses.map((pass) => getSeatID(pass));
    const maxSeatID = Math.max(...seatIDs);
    const minSeatID = Math.min(...seatIDs);

    for (let i = minSeatID; i < maxSeatID; ++i) {
        if (
            !seatIDs.includes(i) &&
            seatIDs.includes(i + 1) &&
            seatIDs.includes(i - 1)
        ) {
            return i;
        }
    }
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
