import { part1, part2 } from ".";

const sampleData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe("2022-01", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("24000");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("45000");
        });
    });
});
