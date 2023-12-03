export type Vector = [x: number, y: number];

export const directionVectors: Array<Vector> = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

export const directionVectorsWithDiagonals: Array<Vector> = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];

export const enumerateNeighbours = (
    x: number,
    y: number,
    includeDiagonals: boolean,
) => {
    if (includeDiagonals) {
        return directionVectorsWithDiagonals.map(([dx, dy]) => [
            x + dx,
            y + dy,
        ]);
    }
    return directionVectors.map(([dx, dy]) => [x + dx, y + dy]);
};

export const inBounds = (val: number, minVal: number, maxVal: number) => {
    return val >= minVal && val < maxVal;
};
