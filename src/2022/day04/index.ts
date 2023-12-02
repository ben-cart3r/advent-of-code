import Input from "../../common/input";

type Range = {
    min: number;
    max: number;
};

const parse = (input: string): Array<[Range, Range]> => {
    return new Input(input)
        .asLines()
        .asDelimitedStrings(/(\d+)-(\d+),(\d+)-(\d+)/)
        .map((line) => line.slice(1, 5).map((val) => parseInt(val)))
        .map((values) => [
            { min: values[0], max: values[1] },
            { min: values[2], max: values[3] },
        ]);
};

const contains = (range1: Range, range2: Range): boolean => {
    return range2.min >= range1.min && range2.max <= range1.max;
};

const overlap = (range1: Range, range2: Range): boolean => {
    return (
        (range2.min <= range1.max && range2.max >= range1.min) ||
        (range2.max >= range1.min && range2.min <= range1.min)
    );
};

export const part1 = (input: string): string => {
    const parsed = parse(input);
    const filtered = parsed.filter(
        (pair) => contains(pair[0], pair[1]) || contains(pair[1], pair[0]),
    );

    return filtered.length.toString();
};

export const part2 = (input: string): string => {
    const parsed = parse(input);
    const filtered = parsed.filter((pair) => overlap(pair[0], pair[1]));

    return filtered.length.toString();
};
