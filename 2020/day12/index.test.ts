import { solver1, solver2 } from ".";

const sampleData = `F10
N3
F7
R90
F11`;

describe("day12", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(25);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(286);
        });
    });
});
