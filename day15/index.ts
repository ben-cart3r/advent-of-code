const parseInput = (input: string) => {
    return input
        .trim()
        .split(",")
        .map((n) => parseInt(n));
};

const run = (input: string, target: number) => {
    const xs = parseInput(input);
    const ages: { [k: number]: [number, number] } = {};
    let turn = 0;
    let last = xs[0];

    while (turn < target) {
        if (turn < xs.length) {
            last = xs[turn];
        } else {
            if (ages[last][0] == 0 && ages[last][1] == turn) {
                last = 0;
            } else {
                last = turn - ages[last][0];
            }
        }

        if (ages[last]) {
            ages[last] = [ages[last][1], turn + 1];
        } else {
            ages[last] = [0, turn + 1];
        }
        turn++;
    }

    return last;
};

const solver1 = (input: string): number => {
    return run(input, 2020);
};

const solver2 = (input: string): number => {
    return run(input, 30000000);
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
