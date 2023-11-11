import { part1, part2 } from ".";

const sampleData = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

describe("2022-day", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("7");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("19");
        });
    });
});