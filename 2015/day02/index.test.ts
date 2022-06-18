import { part1, part2 } from ".";

const sampleData = "2x3x4";

describe("2015-02", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("58");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("34");
        });
    });
});
