import { parseAsIntegers, sum } from "../../common";

export const part1 = (input: string) => {
    const depths = parseAsIntegers(input);

    // Count windows which are larger than the previous
    return depths
        .reduce((acc, depth, index) => {
            if (index > 0 && depth > depths[index - 1]) {
                return acc + 1;
            }
            return acc;
        }, 0)
        .toString();
};

export const part2 = (input: string) => {
    const depths = parseAsIntegers(input);

    // Group and sum the depths into "windows"
    const windows = depths.reduce((acc, _, index) => {
        if (index < depths.length - 2) {
            acc.push(sum(...depths.slice(index, index + 3)));
        }
        return acc;
    }, [] as Array<number>);

    // Count windows which are larger than the previous
    return windows
        .reduce((acc, window, index) => {
            if (index > 0 && window > windows[index - 1]) {
                return acc + 1;
            }
            return acc;
        }, 0)
        .toString();
};
