const config = [
    {
        opcode: 1,
        args: 3,
    },
    {
        opcode: 2,
        args: 3,
    },
    {
        opcode: 99,
        args: 0,
    },
];

const getInstructionConfig = (opcode: number) => {
    return config.filter((conf) => conf.opcode == opcode)[0];
};

export const intcodeComputer = (memory: number[]) => {
    let instructionPointer = 0;
    let terminate = false;

    while (!terminate) {
        const opcode = memory[instructionPointer];
        const conf = getInstructionConfig(opcode);
        const args = [];

        //console.log(opcode);

        for (let i = 0; i < conf.args; ++i) {
            instructionPointer++;
            args.push(memory[instructionPointer]);
        }

        switch (opcode) {
            case 1: {
                const address1 = args[0];
                const address2 = args[1];
                const address3 = args[2];

                memory[address3] = memory[address1] + memory[address2];
                break;
            }
            case 2: {
                const address1 = args[0];
                const address2 = args[1];
                const address3 = args[2];

                memory[address3] = memory[address1] * memory[address2];
                break;
            }
            case 99: {
                terminate = true;
                break;
            }
        }

        instructionPointer++;
    }

    return memory[0];
};
