import { part1, part2 } from ".";

const sampleData = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const sampleData2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

describe("2023-08", () => {
  describe("part1", () => {
    it("should solve for sample data", () => {
      const result = part1(sampleData);

      expect(result).toEqual("6");
    });
  });

  describe("part2", () => {
    it("should solve for sample data", () => {
      const result = part2(sampleData2);

      expect(result).toEqual("6");
    });
  });
});
