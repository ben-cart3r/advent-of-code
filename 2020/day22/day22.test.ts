import { solver1, solver2 } from "../day22";

const sampleData = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

describe("day22", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(306);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(291);
        });
    });
});
