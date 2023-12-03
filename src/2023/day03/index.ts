import { product, sum } from "../../common";
import { enumerateNeighbours, inBounds } from "../../common/grid-helpers";
import Input from "../../common/input";

type EngineEntity = {
    value: string;
    y: number;
    x: number;
};

const parse = (input: string): Array<Array<string>> => {
    return new Input(input).asLines().asDelimitedStrings(/(?!^)/);
};

const isNumber = (value: string): boolean => {
    return !isNaN(parseInt(value));
};

const parseNumbers = (grid: Array<Array<string>>): Array<EngineEntity> => {
    const numbers: Array<EngineEntity> = [];

    for (let y = 0; y < grid.length; ++y) {
        let buffer: Array<string> = [];
        for (let x = 0; x < grid[y].length; ++x) {
            if (isNumber(grid[y][x])) {
                buffer.push(grid[y][x]);
            } else {
                if (buffer.length > 0) {
                    numbers.push({
                        value: buffer.join(""),
                        y,
                        x: x - buffer.length,
                    });
                    buffer = [];
                }
            }
        }
        numbers.push({
            value: buffer.join(""),
            y,
            x: grid[y].length - buffer.length,
        });
    }

    return numbers;
};

const isSymbol = (char: string) => char != "." && isNaN(parseInt(char));

const parseSymbols = (grid: Array<Array<string>>) => {
    const gears: Array<EngineEntity> = [];

    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[y].length; ++x) {
            if (isSymbol(grid[y][x])) {
                gears.push({
                    value: grid[y][x],
                    y,
                    x,
                });
            }
        }
    }

    return gears;
};

const hasSymbolNeighbour = (
    x: number,
    y: number,
    grid: Array<Array<string>>,
) => {
    return enumerateNeighbours(x, y, true)
        .filter(
            ([nx, ny]) =>
                inBounds(ny, 0, grid.length) && inBounds(nx, 0, grid[y].length),
        )
        .map(([nx, ny]) => grid[ny][nx])
        .some(isSymbol);
};

const isPartNumber = (num: EngineEntity, grid: Array<Array<string>>) => {
    // Check the neighbours of every digit in the number
    return num.value
        .split(/(?!^)/)
        .map((_, index) => [num.x + index, num.y])
        .some(([x, y]) => hasSymbolNeighbour(x, y, grid));
};

const getNumberNeighbours = (
    x: number,
    y: number,
    numbers: Array<EngineEntity>,
) => {
    return numbers.filter((num) => {
        return num.value
            .split(/(?!^)/)
            .map((_, index) => [num.x + index, num.y])
            .some(([cx, cy]) => {
                return enumerateNeighbours(cx, cy, true).some(
                    ([nx, ny]) => nx == x && ny == y,
                );
            });
    });
};

export const part1 = (input: string): string => {
    const grid = parse(input);
    const numbers = parseNumbers(grid);
    const validNumbers = numbers
        .filter((num) => isPartNumber(num, grid))
        .map((num) => parseInt(num.value));

    return sum(...validNumbers).toString();
};

export const part2 = (input: string): string => {
    const grid = parse(input);
    const numbers = parseNumbers(grid);
    const symbols = parseSymbols(grid);

    const gearRatios = symbols
        .filter((symbol) => symbol.value == "*")
        .map((gear) => getNumberNeighbours(gear.x, gear.y, numbers))
        .filter((neighbours) => neighbours.length == 2)
        .map((neighbours) =>
            product(...neighbours.map(({ value }) => parseInt(value))),
        );

    return sum(...gearRatios).toString();
};
