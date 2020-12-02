import { solver1, solver2 } from "../day01";

const sampleData = [1721, 979, 366, 299, 675, 1456];

describe("day01", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(514579);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(241861950);
        });
    });
});
