import { inRange, sum } from "../../common";
import { Queue } from "../../common/data-types/queue";
import Input from "../../common/input";

type Cube = {
    id: string;
    x: number;
    y: number;
    z: number;
};

type Grid = Set<string>;

const parse = (input: string): Array<Cube> => {
    return new Input(input)
        .asLines()
        .asDelimitedStrings(/,/)
        .map(([x, y, z]) => ({
            id: `${x},${y},${z}`,
            x: parseInt(x),
            y: parseInt(y),
            z: parseInt(z),
        }));
};

const createCube = (x: number, y: number, z: number): Cube => ({
    id: `${x},${y},${z}`,
    x: x,
    y: y,
    z: z,
});

const sides = ({ x, y, z }: Cube) => {
    return [
        [0, 1, 0],
        [0, -1, 0],
        [1, 0, 0],
        [-1, 0, 0],
        [0, 0, 1],
        [0, 0, -1],
    ]
        .map(([dx, dy, dz]) => createCube(x + dx, y + dy, z + dz))
        .filter(
            ({ x, y, z }) =>
                inRange(x, -5, 30) && inRange(y, -5, 30) && inRange(z, -5, 30)
        );
};

const visibleFaces = (grid: Grid, cube: Cube) => {
    return sides(cube).filter(({ id }) => !grid.has(id)).length;
};

export const part1 = (input: string): string => {
    const cubes = parse(input);
    const grid = new Set<string>();

    for (const { id } of cubes) {
        grid.add(id);
    }

    return sum(...cubes.map((cube) => visibleFaces(grid, cube))).toString();
};

export const part2 = (input: string): string => {
    const cubes = parse(input);
    const grid = new Set<string>();

    for (const { id } of cubes) {
        grid.add(id);
    }

    // Fill the water around the lava
    const queue = new Queue<Cube>();
    const visited = new Set<string>();
    const steam = new Set<string>();

    queue.push({ id: "0,0,0", x: 0, y: 0, z: 0 });

    while (!queue.empty()) {
        const cube = queue.pop();

        if (!grid.has(`${cube.x},${cube.y},${cube.z}`)) {
            steam.add(`${cube.x},${cube.y},${cube.z}`);

            for (const side of sides(cube)) {
                if (!visited.has(`${side.x},${side.y},${side.z}`)) {
                    queue.push(side);
                    visited.add(`${side.x},${side.y},${side.z}`);
                }
            }
        }
    }

    // Count faces touching the steam
    return sum(
        ...cubes.map(
            (cube) =>
                sides(cube).filter((side) =>
                    steam.has(`${side.x},${side.y},${side.z}`)
                ).length
        )
    ).toString();
};
