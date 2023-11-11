import { part1, part2 } from ".";

const sampleData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe("year-day", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("198");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("230");
        });
    });
});
