const parsePassword = (password: string) => {
    const [definition, pwd] = password.split(":");
    const [range, letter] = definition.split(" ");
    const [min, max] = range.split("-");

    return {
        letter,
        min: parseInt(min),
        max: parseInt(max),
        pwd,
    };
};

const solver1 = (input: Array<string>): number => {
    return input.reduce((acc, password) => {
        const { letter, min, max, pwd } = parsePassword(password);

        const matches = pwd.match(new RegExp(letter, "g"));
        const count = matches ? matches.length : 0;

        if (count >= min && count <= max) {
            return acc + 1;
        }

        return acc;
    }, 0);
};

const solver2 = (input: Array<string>): number => {
    return input.reduce((acc, password) => {
        const { letter, min, max, pwd } = parsePassword(password);

        const firstMatch = pwd[min] == letter;
        const secondMatch = pwd[max] == letter;

        // XOR
        if (+firstMatch ^ +secondMatch) {
            return acc + 1;
        }

        return acc;
    }, 0);
};

export { solver1, solver2 };

export default (rawData: string): void => {
    const input = rawData.split("\n");

    const result1 = solver1(input);
    const result2 = solver2(input);

    console.log(`\t Part 1 result: ${result1}`);
    console.log(`\t Part 2 result: ${result2}`);
};
