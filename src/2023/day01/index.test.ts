import { part1, part2 } from ".";

const sampleData = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const sampleData2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe("2023-01", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1(sampleData);

            expect(result).toEqual("142");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2(sampleData2);

            expect(result).toEqual("281");
        });
    });
});
