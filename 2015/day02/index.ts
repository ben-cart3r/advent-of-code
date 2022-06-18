import { sum } from "../../common";
import { Cuboid } from "../../common/shapes";

const parse = (input: string) => {
    const lines = input.split("\n");
    const cubes = lines.map((line) => {
        const [l, w, h] = line.split("x").map((side) => parseInt(side));
        return new Cuboid(l, w, h);
    });

    return cubes;
};

const calcRequiredWrappingPaper = (cube: Cuboid) => {
    const surfaceArea = cube.surfaceArea();
    const slack = Math.min(...cube.faces().map((face) => face.area()));

    return surfaceArea + slack;
};

const calcRequiredRibbon = (cube: Cuboid) => {
    const volume = cube.volume();
    const slack = Math.min(...cube.faces().map((face) => face.perimeter()));

    return volume + slack;
};

export const part1 = (input: string): string => {
    const cubes = parse(input);
    const requiredWrappingPaper = sum(
        ...cubes.map((c) => calcRequiredWrappingPaper(c))
    );

    return requiredWrappingPaper.toString();
};

export const part2 = (input: string): string => {
    const cubes = parse(input);
    const requiredRibbon = sum(...cubes.map((c) => calcRequiredRibbon(c)));

    return requiredRibbon.toString();
};
