import { solver1, solver2 } from ".";

const sampleData = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

describe("day03", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(7);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(336);
        });
    });
});
