import { part1, part2 } from ".";

const sampleData = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe("2023-07", () => {
  describe("part1", () => {
    it("should solve for sample data", () => {
      const result = part1(sampleData);

      expect(result).toEqual("");
    });
  });

  describe("part2", () => {
    it("should solve for sample data", () => {
      const result = part2(sampleData);

      expect(result).toEqual("5905");
    });
  });
});
