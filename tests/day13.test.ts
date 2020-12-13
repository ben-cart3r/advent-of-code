import { solver1, solver2 } from "../day13";

const sampleData = `939
7,13,x,x,59,x,31,19`;

const sampleData2 = `939
67,7,59,61`

describe("day13", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(295);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData2);

            expect(result).toEqual(754018);
        });
    });
});
