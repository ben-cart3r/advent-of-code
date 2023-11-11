import { part1, part2 } from ".";

const sampleData = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

describe("year-day", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("10");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("36");
        });
    });
});
