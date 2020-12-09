import { solver1, solver2 } from "../day09";

const sampleData = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

describe("day09", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData, 5);

            expect(result).toEqual(127);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData, 5);

            expect(result).toEqual(62);
        });
    });
});
