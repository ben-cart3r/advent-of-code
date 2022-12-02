import { part1, part2 } from ".";

const sampleData = `A Y
B X
C Z`;

describe("2022-02", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("15");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("12");
        });
    });
});
