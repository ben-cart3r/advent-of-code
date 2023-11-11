import { part1, part2 } from ".";

const sampleData = "3,4,3,1,2";

describe("2021-06", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("5934");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("26984457539");
        });
    });
});
