import { solver1 } from "../day05";

const sampleData = ["BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"];

describe("day05", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(820);
        });
    });
});
