type Tile = {
    id: number;
    content: string;
    sides: Array<string>;
    reversedSides: Array<string>;
    neighbours: Array<Tile>;
};

const reverseString = (str: string): string => {
    return str.split("").reverse().join("");
};

const parse = (input: string): Array<Tile> => {
    return input.split("\n\n").map((tileStr) => {
        const rows = tileStr.split("\n");

        // Parse id from first row of tile
        const idStr = rows.shift()!;
        const id = parseInt(idStr.substring(5, 4)); // e.g. Tile xxxx:

        // Parse 4 sides of tile
        const top = rows[0];
        const bottom = rows[rows.length - 1];
        const left = rows.map((row) => row[0]).join("");
        const right = rows.map((row) => row[row.length - 1]).join("");

        return {
            id,
            content: rows.join("\n"),
            sides: [top, bottom, left, right],
            reversedSides: [
                reverseString(top),
                reverseString(bottom),
                reverseString(left),
                reverseString(right),
            ],
            neighbours: [],
        };
    });
};

// Check if 2 tiles have a matching side
const hasMatchingSide = (tile1: Tile, tile2: Tile): boolean => {
    for (let i = 0; i < tile1.sides.length; ++i) {
        // Check if sides match when rearranged
        if (tile2.sides.includes(tile1.sides[i])) {
            return true;
        }

        // Check if sides match when rotated / flipped
        if (tile2.sides.includes(tile1.reversedSides[i])) {
            return true;
        }
    }

    return false;
};

const solver1 = (input: string): number => {
    // Count how many tiles match at least 1 side of a tile
    const countMatchingSides = (tile: Tile, tiles: Array<Tile>): number => {
        return tiles.reduce((acc, testTile) => {
            if (tile.id == testTile.id) {
                return acc;
            }

            if (hasMatchingSide(tile, testTile)) {
                return acc + 1;
            }

            return acc;
        }, 0);
    };

    // If a tile matches exactly 2 other tiles then it must be a corner
    const isCorner = (tile: Tile, tiles: Array<Tile>) => {
        return countMatchingSides(tile, tiles) == 2;
    };

    const tiles = parse(input);
    const corners = tiles.filter((t) => isCorner(t, tiles));
    const result = corners.reduce((acc, tile) => acc * tile.id, 1);

    return result;
};

const solver2 = (input: string) => {
    const findNeighbours = (tile: Tile, tiles: Array<Tile>): Tile => {
        const neighbours = tiles.filter((testTile) => {
            if (tile.id == testTile.id) {
                return false;
            }

            if (hasMatchingSide(tile, testTile)) {
                return true;
            }

            return false;
        });

        return {
            ...tile,
            neighbours: neighbours,
        };
    };

    const tiles = parse(input);
    const tilesWithNeighbours = tiles.map((t) => findNeighbours(t, tiles));
    const corners = tilesWithNeighbours.filter((t) => t.neighbours.length == 2);

    // console.log(corners[0].content);
    // console.log()
    // console.log(corners[0].neighbours[0].content);

    const r1 = corners[0].content.split("\n");
    const r2 = corners[0].neighbours[0].content.split("\n");

    for (let i = 0; i < r1.length; ++i) {
        console.log(r1[i] + " " + r2[i]);
    }

    console.log(corners[0].neighbours[1].content);

    // const grid: Array<Array<Tile>> = Array(12).fill(null).map(_ => Array(12));

    // grid[0][0] = corners[0];

    // //grid[0][1] = corners[0].neighbours[0];
    // grid[1][0] = corners[0].neighbours[1];

    // console.log(grid[0][0].id);

    return 0;
};

export { solver1, solver2 };

export default (): string => {
    const sample = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

    solver2(sample);

    return "";

    // const result1 = solver1(input);
    // const result2 = solver2(input);

    // return `\t Part 1 result: ${result1}
    // \t Part 2 result: ${result2}`;
};
