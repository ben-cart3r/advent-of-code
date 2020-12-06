const diff = (num1: number, num2: number) => {
    return Math.floor((num1 - num2) / 2);
};

const getSeatID = (boardingPass: string) => {
    let rowLower = 0;
    let rowUpper = 127;
    let colLower = 0;
    let colUpper = 7;

    for (let i = 0; i < boardingPass.length; ++i) {
        if (i < boardingPass.length - 3) {
            if (boardingPass[i] == "B") {
                rowLower = rowUpper - diff(rowUpper, rowLower);
            }

            if (boardingPass[i] == "F") {
                rowUpper = rowLower + diff(rowUpper, rowLower);
            }
        } else {
            if (boardingPass[i] == "R") {
                colLower = colUpper - diff(colUpper, colLower);
            }

            if (boardingPass[i] == "L") {
                colUpper = colLower + diff(colUpper, colLower);
            }
        }
    }

    return rowUpper * 8 + colUpper;
};

const solver1 = (input: Array<string>): number => {
    return Math.max(...input.map(getSeatID));
};

const solver2 = (input: Array<string>): number => {
    const rowCount = 127;
    const colCount = 8;
    const allSeatIDs = [...Array(rowCount * colCount).keys()];
    const filledSeatIds = input.map(getSeatID);

    const mySeatID = allSeatIDs.filter((seatID) => {
        return (
            !filledSeatIds.includes(seatID) &&
            filledSeatIds.includes(seatID + 1) &&
            filledSeatIds.includes(seatID - 1)
        );
    });

    return mySeatID[0];
};

export { solver1, solver2 };

export default (rawData: string): string => {
    const input = rawData.split("\n").filter((input) => input.length > 0);

    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
