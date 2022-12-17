import { part1, part2 } from ".";

const sampleData = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

describe("2022-17", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("3068");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("");
        });
    });
});
