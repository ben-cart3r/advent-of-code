import { solver1 } from ".";

const sampleData = `0,3,6`;

describe("day15", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(436);
        });
    });

    // Slow
    // describe("part2", () => {
    //     it("should solve for sample data", () => {
    //         const result = solver2(sampleData);

    //         expect(result).toEqual(175594);
    //     });
    // });
});
