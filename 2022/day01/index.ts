import { sum } from "../../common";
import Input from "../../common/input";
import { asc } from "../../common/sorting";

const parse = (input: string) => {
    return new Input(input).asParagraphs().asIntegers();
};

export const part1 = (input: string): string => {
    const elvesInventories = parse(input);
    const calorieCounts = elvesInventories.map((inventory) =>
        sum(...inventory)
    );

    return Math.max(...calorieCounts).toString();
};

export const part2 = (input: string): string => {
    const elvesInventories = parse(input);
    const calorieCounts = elvesInventories.map((inventory) =>
        sum(...inventory)
    );
    const sorted = calorieCounts.sort(asc);

    return sum(...sorted.slice(0, 3)).toString();
};
