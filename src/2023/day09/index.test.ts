import { part1, part2 } from ".";

const sampleData = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

describe("2023-09", () => {
  describe("part1", () => {
    it("should solve for sample data", () => {
      const result = part1(sampleData);

      expect(result).toEqual("114");
    });
  });

  describe("part2", () => {
    it("should solve for sample data", () => {
      const result = part2(sampleData);

      expect(result).toEqual("2");
    });
  });
});
