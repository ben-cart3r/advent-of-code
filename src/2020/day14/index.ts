const parseInput = (input: string) => {
    return input
        .trim()
        .split("\n")
        .map((line) => {
            const [type, value] = line.split(" = ");

            if (type.includes("mem")) {
                return {
                    type: "mem",
                    location: type.substring(
                        type.indexOf("[") + 1,
                        type.indexOf("]"),
                    ),
                    value,
                };
            } else {
                return {
                    type: "mask",
                    location: null,
                    value,
                };
            }
        });
};

const toBinary = (dec: number): string => {
    return (dec >>> 0).toString(2);
};

const toDec = (bin: string): number => {
    return parseInt(bin, 2);
};

const applyMask = (val: string, mask: string) => {
    const value = val.padStart(mask.length, "0");
    const out = [];

    for (let i = 0; i < mask.length; ++i) {
        out.push(mask[i] == "X" ? value[i] : mask[i]);
    }

    return out.join("");
};

const applyAddressMask = (val: string, mask: string) => {
    const value = val.padStart(mask.length, "0");
    const out = [];

    for (let i = 0; i < mask.length; ++i) {
        if (mask[i] == "X") {
            out.push("X");
        } else {
            out.push(parseInt(mask[i]) | parseInt(value[i]));
        }
    }

    return out.join("");
};

const getAddresses = (mask: string): Array<number> => {
    if (!mask.includes("X")) {
        return [toDec(mask)];
    } else {
        const tempMask1 = mask.replace("X", "0");
        const tempMask2 = mask.replace("X", "1");

        return [...getAddresses(tempMask1), ...getAddresses(tempMask2)];
    }
};

const solver1 = (input: string): number => {
    const instructions = parseInput(input);
    const memory: { [k: string]: number } = {};
    let mask = "";

    for (let i = 0; i < instructions.length; ++i) {
        const { location, type, value } = instructions[i];

        if (type == "mask") {
            mask = value;
        } else {
            memory[location!] = toDec(
                applyMask(toBinary(parseInt(value)), mask),
            );
        }
    }

    return Object.values(memory).reduce((acc, value) => acc + value, 0);
};

const solver2 = (input: string): number => {
    const instructions = parseInput(input);
    const memory: { [k: string]: number } = {};
    let mask = "";

    for (let i = 0; i < instructions.length; ++i) {
        const { location, type, value } = instructions[i];

        if (type == "mask") {
            mask = value;
        } else {
            const addressMask = applyAddressMask(
                toBinary(parseInt(location!)),
                mask,
            );
            const addresses = getAddresses(addressMask);

            for (let j = 0; j < addresses.length; ++j) {
                memory[addresses[j]] = parseInt(value);
            }
        }
    }

    return Object.values(memory).reduce((acc, value) => acc + value, 0);
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
