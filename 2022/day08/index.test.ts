import { part1, part2 } from ".";

const sampleData = `30373
25512
65332
33549
35390`;

describe("2022-08", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("21");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("8");
        });
    });
});
