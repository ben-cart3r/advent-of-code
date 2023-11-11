import { part1, part2 } from ".";

const sampleData = "target area: x=20..30, y=-10..-5";

describe("2021-17", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("45");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("112");
        });
    });
});
