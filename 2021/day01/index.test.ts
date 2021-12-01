import { part1, part2 } from ".";

const sampleData = `199
200
208
210
200
207
240
269
260
263`;

describe("2021-01", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("7");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("5");
        });
    });
});
