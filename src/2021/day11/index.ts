import { Grid } from "../../common/grid";

type Octopus = {
    x: number;
    y: number;
    val: number;
    flashed: boolean;
};

const parse = (input: string): Array<Array<Octopus>> => {
    return input.split(/\n/).map((line, y) =>
        line.split("").map((item, x) => ({
            x,
            y,
            val: parseInt(item),
            flashed: false,
        })),
    );
};

export const part1 = (input: string): string => {
    const grid = new Grid(parse(input));
    const generations = 100;
    let flashes = 0;

    for (let i = 0; i < generations; ++i) {
        const toFlash: Array<Octopus> = [];

        grid.each((octopus) => {
            octopus.val++;

            if (octopus.val > 9) {
                toFlash.push(octopus);
            }
        });

        while (toFlash.length > 0) {
            const octopus = toFlash.pop()!;
            const neighbours = grid.neighbours(octopus.x, octopus.y);

            if (!octopus.flashed) {
                octopus.flashed = true;
                flashes++;

                for (const neighbour of neighbours) {
                    neighbour.val++;
                    if (neighbour.val > 9 && !neighbour.flashed) {
                        toFlash.push(neighbour);
                    }
                }
            }
        }

        grid.each((octopus) => {
            if (octopus.flashed) {
                octopus.val = 0;
                octopus.flashed = false;
            }
        });
    }

    return flashes.toString();
};

export const part2 = (input: string): string => {
    const grid = new Grid(parse(input));
    let generation = 0;
    let allFlashed = false;

    while (!allFlashed) {
        const toFlash: Array<Octopus> = [];
        let flashes = 0;

        grid.each((octopus) => {
            octopus.val++;

            if (octopus.val > 9) {
                toFlash.push(octopus);
            }
        });

        while (toFlash.length > 0) {
            const octopus = toFlash.pop()!;
            const neighbours = grid.neighbours(octopus.x, octopus.y);

            if (!octopus.flashed) {
                octopus.flashed = true;
                flashes++;

                for (const neighbour of neighbours) {
                    neighbour.val++;
                    if (neighbour.val > 9 && !neighbour.flashed) {
                        toFlash.push(neighbour);
                    }
                }
            }
        }

        grid.each((octopus) => {
            if (octopus.flashed) {
                octopus.val = 0;
                octopus.flashed = false;
            }
        });

        if (flashes == 100) {
            allFlashed = true;
        }

        generation++;
    }

    return generation.toString();
};
