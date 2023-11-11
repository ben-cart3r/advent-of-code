type Instruction = {
    operation: string;
    argument: string;
};

const parseInstructions = (input: string): Array<Instruction> => {
    return input
        .trim()
        .split("\n")
        .map((instruction) => {
            const [operation, argument] = instruction.split(" ");
            return {
                operation,
                argument,
            };
        });
};

const runInstruction = (
    instructions: Array<Instruction>,
    pointer: number,
    accumulator: number
): [number, number] => {
    switch (instructions[pointer].operation) {
        case "nop":
            pointer++;
            break;
        case "acc":
            accumulator += parseInt(instructions[pointer].argument);
            pointer++;
            break;
        case "jmp":
            pointer += parseInt(instructions[pointer].argument);
            break;
    }

    return [pointer, accumulator];
};

const runProgram = (instructions: Array<Instruction>): [number, number] => {
    const seen = new Set();
    let pointer = 0;
    let accumulator = 0;

    while (pointer < instructions.length) {
        if (seen.has(pointer)) {
            break;
        }

        seen.add(pointer);

        [pointer, accumulator] = runInstruction(
            instructions,
            pointer,
            accumulator
        );
    }

    return [pointer, accumulator];
};

const solver1 = (input: string): number => {
    const instructions = parseInstructions(input);
    const [, accumulator] = runProgram(instructions);

    return accumulator;
};

const solver2 = (input: string): number => {
    const instructions = parseInstructions(input);

    for (let i = 0; i < instructions.length; ++i) {
        const op = instructions[i].operation;

        if (instructions[i].operation == "jmp") {
            instructions[i].operation = "nop";
        } else if (instructions[i].operation == "nop") {
            instructions[i].operation = "jmp";
        }

        const [pointer, accumulator] = runProgram(instructions);

        if (pointer == instructions.length) {
            return accumulator;
        }

        instructions[i].operation = op;
    }

    return 0;
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
