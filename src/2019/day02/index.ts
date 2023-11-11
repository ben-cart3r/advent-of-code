import { intcodeComputer } from "../intcode";

const parse = (input: string) => {
    return input
        .trim()
        .split(",")
        .map((instruction) => parseInt(instruction));
};

export const part1 = (input: string) => {
    const instructions = parse(input);

    instructions[1] = 12;
    instructions[2] = 2;

    const output = intcodeComputer(instructions);

    return output.toString();
};

// Search in global space
// Testing just noun get close to the solution
// Testing verb finds the solution
export const part2 = (input: string) => {
    const instructions = parse(input);
    const maxInputValue = 99;
    const target = 19690720;
    let verb = 0;
    let noun = 0;

    for (let i = 0; i < maxInputValue; ++i) {
        const testInstructions = [...instructions];
        testInstructions[1] = i;

        if (intcodeComputer(testInstructions) > target) {
            noun = i - 1;
            break;
        }
    }

    for (let i = 0; i < maxInputValue; ++i) {
        const testInstructions = [...instructions];
        testInstructions[1] = noun;
        testInstructions[2] = i;

        if (intcodeComputer(testInstructions) > target) {
            verb = i - 1;
            break;
        }
    }

    return (100 * noun + verb).toString();
};
