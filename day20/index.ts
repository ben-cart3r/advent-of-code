
type Tile = {
    id: number;
    sides: Array<string>
    reversedSides: Array<string>
}

const reverseString = (str: string): string => {
    return str.split("").reverse().join("")
} 

const parse = (input: string): Array<Tile> => {
    return input.split("\n\n").map((tileStr) => {
        const rows = tileStr.split("\n");

        // Parse id from first row of tile
        const idStr = rows.shift();
        const id = parseInt(idStr.substr(5, 4)) // e.g. Tile xxxx:

        // Parse 4 sides of tile
        const top = rows[0];
        const bottom = rows[rows.length - 1]
        const left = rows.map((row) => row[0]).join("");
        const right = rows.map((row) => row[row.length - 1]).join("");

        return {
            id,
            sides: [
                top,
                bottom,
                left,
                right
            ],
            reversedSides: [
                reverseString(top),
                reverseString(bottom),
                reverseString(left),
                reverseString(right),
            ]
        };
    });
}

const solver1 = (input: string): number => {
    
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
    }

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
    }

    // If a tile matches exactly 2 other tiles then it must be a corner
    const isCorner = (tile: Tile, tiles: Array<Tile>) => {
        return countMatchingSides(tile, tiles) == 2;
    }

    const tiles = parse(input);
    const corners = tiles.filter((t) => isCorner(t, tiles));
    const result = corners.reduce((acc, tile) => acc * tile.id , 1);

    return result;
}

const solver2 = (input: string) => {
    return 0;
}

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};