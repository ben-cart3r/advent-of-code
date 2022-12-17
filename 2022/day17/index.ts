import { inRange } from "../../common";

type Shape = {
    blocks: Array<[number, number]>;
    miny: number;
};

type Rock = {
    id: number;
    x: number;
    y: number;
};

const rocks: Array<Shape> = [
    {
        blocks: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
        miny: 0,
    },
    {
        blocks: [
            [1, 1],
            [0, 0],
            [1, 0],
            [2, 0],
            [1, -1],
        ],
        miny: -1,
    },
    {
        blocks: [
            [0, 0],
            [1, 0],
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        miny: 0,
    },
    {
        blocks: [
            [0, -3],
            [0, -2],
            [0, -1],
            [0, 0],
        ],
        miny: -3,
    },
    {
        blocks: [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
        ],
        miny: 0,
    },
];

const parse = (input: string): Array<[number, number]> => {
    return input.split("").map((char) => (char == "<" ? [-1, 0] : [1, 0]));
};

const createRock = (id: number, y: number): Rock => {
    const shape = rocks[id];

    return {
        id,
        x: 2,
        y: y - shape.miny,
    };
};

const moveRock = ({ id, x, y }: Rock, dx: number, dy: number): Rock => {
    const shape = rocks[id];
    const willExceedBounds = shape.blocks.some(
        ([bx]) => !inRange(x + bx + dx, 0, 6)
    );

    return {
        id,
        x: willExceedBounds ? x : x + dx,
        y: y + dy,
    };
};

const canMove = (
    grid: Map<string, string>,
    rock: Rock,
    dx: number,
    dy: number
) => {
    const shape = rocks[rock.id];

    return shape.blocks
        .map(([x, y]) => [rock.x + x + dx, rock.y + y + dy])
        .reduce((acc, [x, y]) => acc && !grid.has(`${x},${y}`), true);
};

const draw = (grid: Map<string, string>): string => {
    const out: Array<string> = [];
    for (let y = 20; y >= 0; --y) {
        const line = [y < 10 ? `0${y}` : y, y == 0 ? "+" : "|"];
        for (let x = 0; x < 7; ++x) {
            if (grid.has(`${x},${y}`)) {
                line.push(grid.get(`${x},${y}`));
            } else {
                line.push(" ");
            }
        }
        line.push(y == 0 ? "+" : "|");
        out.push(line.join(" "));
    }
    return out.join("\n");
};

function* direction(directions: Array<[number, number]>) {
    let counter = 0;
    let dirCounter = 0;

    while(true) {
        if (counter % 2 == 0) {
            yield directions[dirCounter % directions.length];
            dirCounter++;
        } else {
            yield [0, -1];
            
        }
        counter++;
    }

    return [0, 0];
}

export const part1 = (input: string): string => {
    const directions = parse(input);
    const moves = 2022;
    const grid = new Map<string, string>([
        ["0,0", "-"],
        ["1,0", "-"],
        ["2,0", "-"],
        ["3,0", "-"],
        ["4,0", "-"],
        ["5,0", "-"],
        ["6,0", "-"],
    ]);
    const directiongenerator = direction(directions);

    let maxy = 0;

    for (let i = 0; i < moves; ++i) {
        let rock = createRock(i % rocks.length, maxy + 4);
        let falling = true;

        while (falling) {
            const [dx, dy] = directiongenerator.next().value

            if (canMove(grid, rock, dx, dy)) {
                rock = moveRock(rock, dx, dy);
            } else {
                if (dy == -1) {
                    falling = false;
                }
            }
        }

        const blocks = rocks[rock.id].blocks.map(([x, y]) => [
            rock.x + x,
            rock.y + y,
        ]);

        for (const [bx, by] of blocks) {
            maxy = Math.max(maxy, by);
            grid.set(`${bx},${by}`, "#");
        }
    }

    return maxy.toString();
};

export const part2 = (input: string): string => {
    return "";
};
