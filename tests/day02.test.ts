import { solver1, solver2 } from "../day02";

const sampleData = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

describe("day02", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(2);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(1);
        });
    });
});
