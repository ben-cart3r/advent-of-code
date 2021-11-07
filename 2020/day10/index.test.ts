import { solver1, solver2 } from ".";

const sampleData = `16
10
15
5
1
11
7
19
6
12
4`;

const sampleData2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

describe("day10", () => {
    describe("part1", () => {
        it("should solve for sample data", () => {
            const result = solver1(sampleData);

            expect(result).toEqual(35);
        });
    });

    describe("part2", () => {
        it("should solve for sample data", () => {
            const result = solver2(sampleData);

            expect(result).toEqual(8);
        });

        it("should solve for sample data 2", () => {
            const result = solver2(sampleData2);

            expect(result).toEqual(19208);
        });
    });
});
