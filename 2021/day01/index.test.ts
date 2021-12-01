import { part1, part2 } from ".";

const sampleData = `199
200
208
210
200
207
240
269
260
263`;

const sampleData2 = `199  A
200  A B
208  A B C
210    B C D
200  E   C D
207  E F   D
240  E F G
269    F G H
260      G H
263        H`;

describe("2021-01", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("7");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData);

            expect(result).toEqual("5");
        });
    });
});
