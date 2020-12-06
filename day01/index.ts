const solver1 = (input: Array<number>): number => {
    for (let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input.length; ++j) {
            if (i != j && input[i] + input[j] == 2020) {
                return input[i] * input[j];
            }
        }
    }

    return null;
};

const solver2 = (input: Array<number>): number => {
    for (let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input.length; ++j) {
            for (let k = 0; k < input.length; ++k) {
                if (
                    i != j &&
                    i != k &&
                    j != k &&
                    input[i] + input[j] + input[k] == 2020
                ) {
                    return input[i] * input[j] * input[k];
                }
            }
        }
    }

    return null;
};

export { solver1, solver2 };

export default (rawData: string): string => {
    const input = rawData.split("\n").map((e) => parseInt(e));

    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
