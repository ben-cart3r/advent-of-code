const parse = (input: string) => {
    return input.split("\n").map((line) => {
        const [dir, len] = line.split(" ");

        return {
            dir,
            len: parseInt(len),
        };
    });
};

export const part1 = (input: string) => {
    const commands = parse(input);

    const [horizontal, depth] = commands.reduce(
        ([h, d], command) => {
            const { dir, len } = command;

            switch (dir) {
                case "forward":
                    h += len;
                    break;
                case "up":
                    d -= len;
                    break;
                case "down":
                    d += len;
                    break;
            }

            return [h, d];
        },
        [0, 0],
    );

    return (horizontal * depth).toString();
};

export const part2 = (input: string) => {
    const commands = parse(input);

    const [horizontal, depth] = commands.reduce(
        ([h, d, a], command) => {
            const { dir, len } = command;

            switch (dir) {
                case "forward":
                    h += len;
                    d += a * len;
                    break;
                case "up":
                    a -= len;
                    break;
                case "down":
                    a += len;
                    break;
            }

            return [h, d, a];
        },
        [0, 0, 0],
    );

    return (horizontal * depth).toString();
};
