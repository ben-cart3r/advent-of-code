type Instruction = {
    operation: string;
    argument: string;
    visits: number;
}

const parseInstructions = (input: string): Array<Instruction> => {
    return input.trim().split("\n").map((instruction) => {
        const [operation, argument] = instruction.split(" ");
        return {
            operation,
            argument,
            visits: 0
        };
    });
}

const solver1 = (input: string): number => {
    const instructions = parseInstructions(input);
    let counter = 0;
    let accumulator = 0;

    while (counter < instructions.length && instructions[counter].visits == 0) {
        instructions[counter].visits += 1;

        switch (instructions[counter].operation) {
            case "nop":
                counter++;
                break;
            case "acc":
                accumulator += parseInt(instructions[counter].argument);
                counter++;
                break;
            case "jmp":
                counter += parseInt(instructions[counter].argument);
                break;
        }
    }


    return accumulator;
};

// Ugly brute force - maybe it can be done better
const solver2 = (input: string): number => {
    const instructions = parseInstructions(input);

    for (let i = 0; i < instructions.length; ++i) {        
        // Reset instructions
        for (let j = 0; j < instructions.length; ++j) {
            instructions[j].visits = 0;
        }

        if (["jmp", "nop"].includes(instructions[i].operation)) {
            const origOp = instructions[i].operation;
            let idx = 0;
            let accumulator = 0;
            
            // Switch operation
            if (instructions[i].operation == "jmp") {
                instructions[i].operation = "nop";
            }
            else {
                instructions[i].operation = "jmp";
            }

            // Test
            while (idx < instructions.length && instructions[idx].visits == 0) {
                instructions[idx].visits += 1;

                switch (instructions[idx].operation) {
                    case "nop":
                        idx++;
                        break;
                    case "acc":
                        accumulator += parseInt(instructions[idx].argument);
                        idx++;
                        break;
                    case "jmp":
                        idx += parseInt(instructions[idx].argument);
                        break;
                }
            }

            if (idx == instructions.length) {
                return accumulator;
            }

            instructions[i].operation = origOp;
        }        
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
