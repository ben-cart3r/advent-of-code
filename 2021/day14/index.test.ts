import { part1, part2 } from ".";

const sampleData = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

describe("2021-14", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("1588");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("");
        });
    });
});
