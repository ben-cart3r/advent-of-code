import { part1, part2 } from ".";

const sampleData = `12
14
1969
100756
`;

describe("2019-01", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("34241");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("51316");
        });
    });
});
