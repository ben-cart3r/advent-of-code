const parseInput = (input: string) => {
    const rows = input.trim().split("\n");
    const seats = rows.join("").split("");

    return {
        width: rows[0].length,
        height: rows.length,
        seats,
    };
};

const compare = (res: Array<string>, res1: Array<string>) => {
    return (
        res.length == res1.length && res.every((val, idx) => val == res1[idx])
    );
};

const directions: Array<[number, number]> = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
];

const inRange = (x: number, min: number, max: number): boolean => {
    return x >= min && x <= max;
};

const adjacent = (
    area: Array<string>,
    seatId: number,
    width: number,
    height: number
): Array<[number, number]> => {
    const row = Math.floor(seatId / width);
    const col = seatId % width;

    return directions.filter(([dx, dy]) => {
        const x = col + dx;
        const y = row + dy;

        if (inRange(x, 0, width - 1) && inRange(y, 0, height)) {
            return area[y * width + x] == "#";
        }

        return false;
    });
};

const nearAdjacent = (
    area: Array<string>,
    seatId: number,
    width: number,
    height: number
): Array<[number, number]> => {
    const row = Math.floor(seatId / width);
    const col = seatId % width;

    return directions.filter(([dx, dy]) => {
        let counter = 1;
        let found = false;
        let occupied = false;
        let x = col + dx * counter;
        let y = row + dy * counter;

        while (
            !found &&
            inRange(x, 0, width - 1) &&
            inRange(y, 0, height - 1)
        ) {
            if (area[y * width + x] == "L") {
                found = true;
            }

            if (area[y * width + x] == "#") {
                found = true;
                occupied = true;
            }

            counter++;

            y = row + dy * counter;
            x = col + dx * counter;
        }

        return occupied;
    });
};

const solver1 = (input: string): number => {
    const { height, seats, width } = parseInput(input);
    let prev: Array<string> = [];
    let next = [...seats];

    while (!compare(prev, next)) {
        prev = [...next];
        next = [...next];

        for (let i = 0; i < seats.length; ++i) {
            const occupied = adjacent(prev, i, width, height).length;

            if (next[i] == "L" && occupied == 0) {
                next[i] = "#";
            } else if (next[i] == "#" && occupied >= 4) {
                next[i] = "L";
            }
        }
    }

    return next.filter((seat) => seat == "#").length;
};

const solver2 = (input: string): number => {
    const { height, seats, width } = parseInput(input);
    let prev: Array<string> = [];
    let next = [...seats];

    while (!compare(prev, next)) {
        prev = [...next];
        next = [...next];

        for (let i = 0; i < seats.length; ++i) {
            const occupied = nearAdjacent(prev, i, width, height).length;

            if (next[i] == "L" && occupied == 0) {
                next[i] = "#";
            } else if (next[i] == "#" && occupied >= 5) {
                next[i] = "L";
            }
        }
    }

    return next.filter((seat) => seat == "#").length;
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
