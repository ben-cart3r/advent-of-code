import { solver1, solver2 } from "../day14";

const sampleData = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const sampleData2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

describe("day14", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(165);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData2);

            expect(result).toEqual(208);
        });
    });
});
