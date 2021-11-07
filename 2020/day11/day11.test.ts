import { solver1, solver2 } from "../day11";

const sampleData = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

describe("day11", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(37);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(26);
        });
    });
});
