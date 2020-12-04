type Map = {
    height: number;
    map: Array<string>;
    width: number;
};

const parseMap = (rawMap: string): Map => {
    const rows = rawMap.split("\n");
    const map = rows.reduce(
        (acc, row) => [...acc, ...row.split("")],
        [] as Array<string>
    );
    const width = rows[0].length;
    const height = rows.length;

    return {
        height,
        map,
        width,
    };
};

const traverseMap = (input: Map, pattern: [number, number]): number => {
    let x = 0;
    let y = 0;
    const { height, map, width } = input;
    let treesHit = 0;

    while (y < height) {
        x += pattern[0];
        y += pattern[1];

        const location = map[y * width + (x % width)];

        if (location == "#") {
            treesHit++;
        }
    }

    return treesHit;
};

const solver1 = (input: string): number => {
    const map = parseMap(input);
    return traverseMap(map, [3, 1]);
};

const solver2 = (input: string): number => {
    const traversalPatterns: Array<[number, number]> = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];
    const map = parseMap(input);
    return traversalPatterns.reduce((acc, pattern) => {
        return acc * traverseMap(map, pattern);
    }, 1);
};

export { solver1, solver2 };

export default (rawData: string): void => {
    const result1 = solver1(rawData);
    const result2 = solver2(rawData);

    console.log(`\t Part 1 result: ${result1}`);
    console.log(`\t Part 2 result: ${result2}`);
};
