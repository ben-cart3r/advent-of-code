import { inRange, xor } from "../helpers";

type PasswordPolicy = {
    character: string;
    min: number;
    max: number;
};

const parsePolicy = (input: string): PasswordPolicy => {
    const [range, character] = input.split(" ");
    const [min, max] = range.split("-");

    return {
        character,
        min: parseInt(min),
        max: parseInt(max)
    };
}

const parse = (input: string): Array<[string, PasswordPolicy]> => {
    return input.split("\n").map((line) => {
        const [policy, password] = line.split(": ");

        return [password, parsePolicy(policy)];
    });
}; 

const validatePassword = (password: string, policy: PasswordPolicy, part1: boolean): boolean => {
    if (part1) {
        const matches = password.match(new RegExp(policy.character, "g"));
        const characterCount = matches ? matches.length : 0;
    
        return inRange(characterCount, policy.min, policy.max);
    }
    else {
        const match1 = password[policy.min - 1] == policy.character;
        const match2 = password[policy.max - 1] == policy.character;
    
        return xor(match1, match2);
    }  
}

const solver1 = (input: string): number => {
    const passwords = parse(input);
    const validPasswords = passwords.filter(
        ([password, policy]) => validatePassword(password, policy, true)
    );

    return validPasswords.length;
}

const solver2 = (input: string): number => {
    const passwords = parse(input);
    const validPasswords = passwords.filter(
        ([password, policy]) => validatePassword(password, policy, false)
    );

    return validPasswords.length;
}

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
