import { sum } from "../../common";

const parse = (input: string) => {
    return input.split(",").map((item) => parseInt(item));
};

const simulate = (fishes: Array<number>, days: number) => {
    // Count fishes by days until reproduction
    const gestationPeriods = fishes.reduce(
        (acc, fish) => {
            acc[fish] += 1;
            return acc;
        },
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    );

    for (let i = 0; i < days; ++i) {
        // Pop from front of array
        const newFishes = gestationPeriods.shift()!;

        // Reset fishes that reproduced
        gestationPeriods[6] += newFishes;

        // Create new fishes
        gestationPeriods.push(newFishes);
    }

    return sum(...gestationPeriods);
};

export const part1 = (input: string): string => {
    const timers = parse(input);
    const fishCount = simulate(timers, 80);

    return fishCount.toString();
};

export const part2 = (input: string): string => {
    const timers = parse(input);
    const fishCount = simulate(timers, 256);

    return fishCount.toString();
};
