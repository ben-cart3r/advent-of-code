import { transpose } from "../../common";
import Input from "../../common/input";

const parse = (input: string) => {
    return new Input(input).asLines().asDelimitedStrings(/(?!^)/);
};

const isEdge = (grid: Array<Array<string>>, x: number, y: number) => {
    return x == 0 || x == grid.length - 1 || y == 0 || y == grid[x].length - 1;
};

const isVisible = (grid: Array<Array<string>>, x: number, y: number) => {
    const tree = grid[x][y];

    if (isEdge(grid, x, y)) {
        return true;
    }

    const visibleUp = transpose(grid)
        [y].slice(0, x)
        .every((t) => t < tree);

    const visibleDown = transpose(grid)
        [y].slice(x + 1)
        .every((t) => t < tree);

    const visibleRight = grid[x].slice(y + 1).every((t) => t < tree);
    const visibleLeft = grid[x].slice(0, y).every((t) => t < tree);

    return visibleUp || visibleDown || visibleLeft || visibleRight;
};

const calcPartialScenicScore = (trees: Array<string>, tree: string) => {
    return trees.reduce<[number, boolean]>(
        ([score, visible], t) => {
            if (visible && t >= tree) {
                return [score + 1, false];
            }

            if (visible && t <= tree) {
                return [score + 1, visible];
            }

            return [score, visible];
        },
        [0, true]
    );
};

const calcScenicScore = (grid: Array<Array<string>>, x: number, y: number) => {
    const tree = grid[x][y];

    if (isEdge(grid, x, y)) {
        return 0;
    }

    const treesUp = transpose(grid)[y].slice(0, x).reverse();
    const scoreUp = calcPartialScenicScore(treesUp, tree)[0];
    const treesDown = transpose(grid)[y].slice(x + 1);
    const scoreDown = calcPartialScenicScore(treesDown, tree)[0];

    const treesLeft = grid[x].slice(0, y).reverse();
    const scoreLeft = calcPartialScenicScore(treesLeft, tree)[0];

    const treesRight = grid[x].slice(y + 1);
    const scoreRight = calcPartialScenicScore(treesRight, tree)[0];

    return scoreDown * scoreUp * scoreLeft * scoreRight;
};

export const part1 = (input: string): string => {
    const grid = parse(input);

    let visible = 0;

    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid.length; ++j) {
            if (isVisible(grid, i, j)) {
                visible++;
            }
        }
    }

    return visible.toString();
};

export const part2 = (input: string): string => {
    const grid = parse(input);

    let score = 0;

    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid.length; ++j) {
            score = Math.max(score, calcScenicScore(grid, i, j));
        }
    }

    return score.toString();
};
