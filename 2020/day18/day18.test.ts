import { solver1, solver2 } from "../day18";

describe("day18", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1("1 + 2 * 3 + 4 * 5 + 6");

            expect(result).toEqual(71);
        });

        it("should solve for sample data 2", () => {
            const result = solver1("1 + (2 * 3) + (4 * (5 + 6))");

            expect(result).toEqual(51);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2("1 + 2 * 3 + 4 * 5 + 6");

            expect(result).toEqual(231);
        });

        it("should solve for sample data 2", () => {
            const result = solver2("1 + (2 * 3) + (4 * (5 + 6))");

            expect(result).toEqual(51);
        });
    });
});
