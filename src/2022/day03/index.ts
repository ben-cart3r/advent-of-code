import { chunks, intersect, sum } from "../../common";
import Input from "../../common/input";

const parse = (input: string): Array<Array<string>> => {
    return new Input(input).asLines().asDelimitedStrings(/(?!^)/);
};

const charValue = (char: string) => {
    return char > "Z" ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38;
};

export const part1 = (input: string): string => {
    const parsed = parse(input);
    const errors = parsed.map((rucksack) => {
        const top = new Set(rucksack.slice(0, rucksack.length / 2));
        const bottom = new Set(rucksack.slice(rucksack.length / 2));
        return charValue(Array.from(intersect(top, bottom))[0]);
    });

    return sum(...errors).toString();
};

export const part2 = (input: string): string => {
    const parsed = parse(input);
    const groups = chunks(parsed, 3);
    const badges = groups.map((group) => {
        const common = intersect(...group.map((bag) => new Set(bag)));
        const badge = Array.from(common)[0];
        return charValue(badge);
    });

    return sum(...badges).toString();
};
