import { part1, part2 } from ".";

const sampleData = "^v^v^v^v^v";

describe("2015-03", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("2");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("11");
        });
    });
});
