import { flatten } from "../../common";
import Input from "../../common/input";
import { asc } from "../../common/sorting";

type Point = {
    x: number;
    y: number;
};

const parse = (input: string): Array<Array<Point>> => {
    return new Input(input)
        .asLines()
        .asStrings()
        .map((line) => {
            return line.split(" -> ").map((coord) => {
                const [x, y] = coord.split(",");

                return {
                    x: parseInt(x),
                    y: parseInt(y),
                };
            });
        });
};

const nextMove = ({ x, y }: Point, cave: Map<string, string>) => {
    const movements = [
        [0, 1],
        [-1, 1],
        [1, 1],
    ]
        .map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
        .filter((p) => !cave.has(`${p.x},${p.y}`));

    if (movements.length > 0) {
        return movements[0];
    }

    return null;
};

const expandRockFormations = (
    rockFormations: Array<Array<Point>>
): Map<string, string> => {
    const expanded = new Map<string, string>();

    for (let i = 0; i < rockFormations.length; ++i) {
        for (let j = 0; j < rockFormations[i].length - 1; ++j) {
            const start = rockFormations[i][j];
            const end = rockFormations[i][j + 1];

            expanded.set(`${start.x},${start.y}`, "#");

            for (let k = 0; k < start.x - end.x; ++k) {
                expanded.set(`${start.x - k},${start.y}`, "#");
            }

            for (let k = 0; k < end.x - start.x; ++k) {
                expanded.set(`${end.x - k},${start.y}`, "#");
            }

            for (let k = 0; k < start.y - end.y; ++k) {
                expanded.set(`${start.x},${start.y - k}`, "#");
            }

            for (let k = 0; k < end.y - start.y; ++k) {
                expanded.set(`${start.x},${end.y - k}`, "#");
            }

            expanded.set(`${end.x},${end.y}`, "#");
        }
    }
    return expanded;
};

export const part1 = (input: string): string => {
    const parsed = parse(input);
    const sandOrigin: Point = { x: 500, y: 0 };
    const lowestRock = flatten(parsed).sort((a, b) => asc(a.y, b.y))[0];
    const cave = expandRockFormations(parsed);

    let perpetuallyFalling = false;

    while (!perpetuallyFalling) {
        let sandParticle = { ...sandOrigin };
        let canMove = true;

        while (canMove) {
            const nextPosition = nextMove(sandParticle, cave);

            if (nextPosition == null) {
                cave.set(`${sandParticle.x},${sandParticle.y}`, "o");
                canMove = false;
            } else {
                if (nextPosition.y > lowestRock.y) {
                    canMove = false;
                    perpetuallyFalling = true;
                } else {
                    sandParticle = nextPosition;
                }
            }
        }
    }

    return Array.from(cave.values())
        .filter((v) => v == "o")
        .length.toString();
};

export const part2 = (input: string): string => {
    const parsed = parse(input);
    const sandOrigin: Point = { x: 500, y: 0 };
    const lowestRock = flatten(parsed).sort((a, b) => asc(a.y, b.y))[0];
    const cave = expandRockFormations(parsed);

    let sandCanFall = true;

    while (sandCanFall) {
        let sandParticle = { ...sandOrigin };
        let canMove = true;

        while (canMove) {
            const nextPosition = nextMove(sandParticle, cave);

            if (nextPosition == null) {
                if (sandParticle.x == 500 && sandParticle.y == 0) {
                    sandCanFall = false;
                }

                cave.set(`${sandParticle.x},${sandParticle.y}`, "o");
                canMove = false;
            } else {
                if (nextPosition.y > lowestRock.y + 1) {
                    canMove = false;
                    cave.set(`${sandParticle.x},${sandParticle.y}`, "o");
                } else {
                    sandParticle = nextPosition;
                }
            }
        }
    }

    return Array.from(cave.values())
        .filter((v) => v == "o")
        .length.toString();
};
