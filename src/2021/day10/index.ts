import { median, sum } from "../../common";

const parse = (input: string) => {
    return input.split(/\n/).map((line) => line.split(""));
};

// Define these once, order is important!
const openChars = ["(", "[", "{", "<"];
const closeChars = [")", "]", "}", ">"];
const points = [3, 57, 1197, 25137];

// Custom data structure to make life easier
class Token {
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    mirrors(token: Token) {
        const index = openChars.findIndex((c) => c == this.value);
        const expected = closeChars[index];

        return token.value == expected;
    }

    score() {
        const index = closeChars.findIndex((c) => c == this.value);
        return points[index];
    }
}

class OpenToken extends Token {}
class CloseToken extends Token {}

const tokens = function* (input: Array<string>) {
    let idx = 0;

    while (idx < input.length) {
        if (openChars.includes(input[idx])) {
            yield new OpenToken(input[idx]);
        } else {
            yield new CloseToken(input[idx]);
        }

        idx++;
    }

    return;
};

export const part1 = (input: string): string => {
    const lines = parse(input);
    const incorrectTokens: Array<Token> = [];

    for (const line of lines) {
        const stack: Array<Token> = [];

        for (const token of tokens(line)) {
            if (token instanceof OpenToken) {
                stack.push(token);
            } else {
                if (!stack.pop()!.mirrors(token)) {
                    incorrectTokens.push(token);
                }
            }
        }
    }

    const scores = incorrectTokens.map((token) => token.score());

    return sum(...scores).toString();
};

export const part2 = (input: string): string => {
    const lines = parse(input);
    const scores: Array<number> = [];

    for (const line of lines) {
        const stack: Array<Token> = [];
        let valid = true;

        for (const token of tokens(line)) {
            if (token instanceof OpenToken) {
                stack.push(token);
            } else {
                valid = valid && stack.pop()!.mirrors(token);
            }
        }

        if (valid) {
            const score = stack.reverse().reduce((acc, token) => {
                const index = openChars.findIndex(
                    (char) => char == token.value,
                );
                return acc * 5 + index + 1;
            }, 0);

            scores.push(score);
        }
    }

    return median(scores).toString();
};
