import { solver1, solver2 } from ".";

const sampleData = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

describe("day08", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(5);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(8);
        });
    });
});
