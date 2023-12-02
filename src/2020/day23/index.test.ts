import { solver1 } from ".";

const sampleData = `389125467`;

describe("day23", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual("67384529");
        });
    });

    describe("part2", () => {
        // it("should solve for sample data", () => {
        //     const result = solver2(sampleData);
        //     expect(result).toEqual(291);
        // });
    });
});
