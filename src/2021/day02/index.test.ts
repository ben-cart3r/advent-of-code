import { part1, part2 } from ".";

const sampleData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

describe("2021-02", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("150");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("900");
        });
    });
});
