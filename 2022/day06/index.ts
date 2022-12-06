import Input from "../../common/input";

const parse = (input: string): Array<string> => {
    return input.split("");
}

export const part1 = (input: string): string => {
    const chars = parse(input);
    const queue = chars.slice(0, 3);

    for (let i = 3; i < chars.length; ++i) {
        queue.push(chars[i]);
        const unique = new Set(chars);

        if (Array.from(unique).length == 4) {
            return i.toString();
        }

        queue.shift()
    }
    return "";
};

export const part2 = (input: string): string => {
    const parsed = parse(input);
    return "";
};
