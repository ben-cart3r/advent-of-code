import { solver1, solver2 } from "../day06";

const sampleData = `abc

a
b
c

ab
ac

a
a
a
a

b`;

describe("day06", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(11);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(6);
        });
    });
});
