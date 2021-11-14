import { part1, part2 } from ".";

const sampleData = "1,1,1,4,99,5,6,0,99";

describe("2019-02", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("30");
        });
    });
});
