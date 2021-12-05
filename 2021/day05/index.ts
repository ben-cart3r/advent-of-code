type Point = {
    x: number;
    y: number;
};

const parse = (input: string): Array<Array<Point>> => {
    return input.split("\n").map((line) => {
        const [p1, p2] = line.split(" -> ");
        const [p1x, p1y] = p1.split(",");
        const [p2x, p2y] = p2.split(",");

        return [
            {
                x: parseInt(p1x),
                y: parseInt(p1y),
            },
            {
                x: parseInt(p2x),
                y: parseInt(p2y),
            },
        ];
    });
};

// Get all discrete points on a 45deg diagonal line
const expandDiagonal = (p1: Point, p2: Point) => {
    const max = Math.max(p1.x, p2.x);
    const min = Math.min(p1.x, p2.x);
    const out = [];

    for (let i = 0; i < max - min; ++i) {
        const x = p1.x > p2.x ? p1.x - i : p1.x + i;
        const y = p1.y > p2.y ? p1.y - i : p1.y + i;

        out.push(`${x},${y}`);
    }

    return out;
};

// Get all discrete points on a horizontal line
const expandHorizontal = (p1: Point, p2: Point) => {
    const max = Math.max(p1.x, p2.x);
    const min = Math.min(p1.x, p2.x);
    const out = [];

    for (let i = min; i <= max; ++i) {
        out.push(`${i},${p1.y}`);
    }

    return out;
};

// Get all discrete points on a vertical line
const expandVertical = (p1: Point, p2: Point) => {
    const max = Math.max(p1.y, p2.y);
    const min = Math.min(p1.y, p2.y);
    const out = [];

    for (let i = min; i <= max; ++i) {
        out.push(`${p1.x},${i}`);
    }

    return out;
};

// Get all discrete points on a line
const expandLine = (p1: Point, p2: Point, expandDiagonals: boolean) => {
    if (p1.x != p2.x && p1.y != p2.y) {
        if (expandDiagonals) {
            return expandDiagonal(p1, p2);
        }

        return [];
    }

    if (p1.x == p2.x) {
        return expandVertical(p1, p2);
    }

    return expandHorizontal(p1, p2);
};

export const part1 = (input: string): string => {
    const vents = parse(input);

    // Expand each vent to all of its points and count occurrences
    const store = vents.reduce((acc, [p1, p2]) => {
        const points = expandLine(p1, p2, false);

        for (let i = 0; i < points.length; ++i) {
            const point = points[i];

            if (acc.has(point)) {
                acc.set(point, acc.get(point) + 1);
            } else {
                acc.set(point, 1);
            }
        }

        return acc;
    }, new Map<string, number>());

    const dangerous = [...store.keys()].filter((key) => store.get(key) > 1);

    return dangerous.length.toString();
};

export const part2 = (input: string): string => {
    const vents = parse(input);

    // Expand each vent to all of its points and count occurrences
    const store = vents.reduce((acc, [p1, p2]) => {
        const points = expandLine(p1, p2, true);

        for (let i = 0; i < points.length; ++i) {
            const point = points[i];

            if (acc.has(point)) {
                acc.set(point, acc.get(point) + 1);
            } else {
                acc.set(point, 1);
            }
        }

        return acc;
    }, new Map<string, number>());

    const dangerous = [...store.keys()].filter((key) => store.get(key) > 1);

    return dangerous.length.toString();
};
