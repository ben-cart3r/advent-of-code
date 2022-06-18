import { part1, part2 } from ".";

const sampleData = `)())())`;
const sampleData2 = `()())`

describe("2015-01", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("-3");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData2);

            expect(result).toEqual("5");
        });
    });
});
