import { sum } from "../../common";
import Input from "../../common/input";

const digitTokens = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const stringTokens = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];

const tokenize = (input: string, validTokens: Array<string>) => {
    const tokens: Array<string> = [];

    for (let i = 0; i < input.length; ++i) {
        for (const token of validTokens) {
            if (input.substring(i).startsWith(token)) {
                tokens.push(token);
            }
        }
    }

    return tokens;
};

const translate = (tokens: Array<string>) => {
    const map: Record<string, string> = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };

    return tokens.map((token) => {
        if (map[token]) {
            return map[token];
        }
        return token;
    });
};

const parse = (
    input: string,
    replaceStringRepresentation: boolean
): Array<Array<string>> => {
    const lines = new Input(input).asLines().asStrings();
    const tokens = replaceStringRepresentation
        ? [...digitTokens, ...stringTokens]
        : digitTokens;
    const tokenised = lines.map((line) => tokenize(line, tokens));
    const translated = tokenised.map((line) => translate(line));

    return translated;
};

const getCalibrationValue = (line: Array<string>) =>
    parseInt(line[0] + line[line.length - 1]);

export const part1 = (input: string): string => {
    const lines = parse(input, false);
    const values = lines.map(getCalibrationValue);
    return sum(...values).toString();
};

export const part2 = (input: string): string => {
    const lines = parse(input, true);
    const values = lines.map(getCalibrationValue);
    return sum(...values).toString();
};
