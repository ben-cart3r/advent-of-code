import { parseAsIntegers, sum } from "../../common";
import { asc } from "../../common/sorting";

const parse = (input: string) => {
    return input.split("\n\n").map(parseAsIntegers);
};

export const part1 = (input: string): string => {
    const elvesInventories = parse(input);
    const calorieCounts = elvesInventories.map((inventory) => sum(...inventory));

    return Math.max(...calorieCounts).toString();
};

export const part2 = (input: string): string => {
    const elvesInventories = parse(input);
    const calorieCounts = elvesInventories.map((inventory) => sum(...inventory));
    const sorted = calorieCounts.sort(asc);

    return sum(...sorted.slice(0, 3)).toString();
};
