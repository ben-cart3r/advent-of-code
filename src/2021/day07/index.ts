import { sum } from "../../common";

const parse = (input: string) => {
    return input
        .trim()
        .split(",")
        .map((item) => parseInt(item));
};

const triangleNum = (n: number) => (n * (n + 1)) / 2;

export const part1 = (input: string): string => {
    const crabs = parse(input);

    const scores = crabs.map((_, idx) =>
        sum(...crabs.map((crab) => Math.abs(crab - idx))),
    );

    return Math.min(...scores).toString();
};

export const part2 = (input: string): string => {
    const crabs = parse(input);

    const scores = crabs.map((_, idx) =>
        sum(...crabs.map((crab) => triangleNum(Math.abs(crab - idx)))),
    );

    return Math.min(...scores).toString();
};
