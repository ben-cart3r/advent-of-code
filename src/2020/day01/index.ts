import { product, sum } from "../../common";

const parse = (input: string): Array<number> => {
    return input.split("\n").map((row) => parseInt(row));
};

const solver1 = (input: string): number => {
    const entries = parse(input);

    for (const num1 of entries) {
        for (const num2 of entries) {
            if (sum(num1, num2) == 2020) {
                return product(num1, num2);
            }
        }
    }
};

const solver2 = (input: string): number => {
    const entries = parse(input);

    for (const num1 of entries) {
        for (const num2 of entries) {
            for (const num3 of entries) {
                if (sum(num1, num2, num3) == 2020) {
                    return product(num1, num2, num3);
                }
            }
        }
    }
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
