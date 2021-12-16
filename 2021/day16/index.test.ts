import { part1, part2 } from ".";

describe("2021-16", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = part1("A0016C880162017C3686B18A3D4780");

            expect(result).toEqual("31");
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = part2("9C0141080250320F1802104A08");

            expect(result).toEqual("1");
        });
    });
});
