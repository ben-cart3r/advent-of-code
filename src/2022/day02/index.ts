import Input from "../../common/input";

const win = 6;
const draw = 3;
const loss = 0;

const scores = new Map([
    ["X", 1], // rock
    ["Y", 2], // paper
    ["Z", 3], // scissor
]);
const wins = new Map([
    ["A", "Y"], // paper beats rock
    ["B", "Z"], // scissor beats paper
    ["C", "X"], // rock beats scissor
]);
const draws = new Map([
    ["A", "X"],
    ["B", "Y"],
    ["C", "Z"],
]);
const losses = new Map([
    ["A", "Z"],
    ["B", "X"],
    ["C", "Y"],
]);

const isWin = (p1: string, p2: string) => wins.get(p1) == p2;

const isDraw = (p1: string, p2: string) => draws.get(p1) == p2;

const calculateScore = (p1: string, p2: string) =>
    (isWin(p1, p2) ? win : isDraw(p1, p2) ? draw : loss) + scores.get(p2);

const parse = (input: string): Array<Array<string>> => {
    return new Input(input).asLines().asDelimitedStrings(/ /);
};

export const part1 = (input: string): string => {
    const rounds = parse(input);
    const score = rounds.reduce(
        (acc, [p1, p2]) => acc + calculateScore(p1, p2),
        0
    );

    return score.toString();
};

export const part2 = (input: string): string => {
    const rounds = parse(input);

    const score = rounds.reduce(
        (acc, [p1, p2]) =>
            acc +
            (p2 == "Y"
                ? draw + scores.get(draws.get(p1))
                : p2 == "X"
                ? scores.get(losses.get(p1))
                : win + scores.get(wins.get(p1))),
        0
    );

    return score.toString();
};
