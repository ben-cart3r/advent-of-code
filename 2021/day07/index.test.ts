import { part1, part2 } from ".";

const sampleData = "16,1,2,0,4,2,7,1,2,14";

describe("2021-07", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("37");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("168");
        });
    });
});
