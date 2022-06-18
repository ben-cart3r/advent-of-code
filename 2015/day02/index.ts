import { sum } from "../../common";

class CubeFace {
    private length: number;
    private width: number;

    constructor(length: number, width: number) {
        this.length = length;
        this.width = width;
    }

    area(): number {
        return this.length * this.width;
    }

    perimeter(): number {
        return 2 * (this.length + this.width);
    }
}

class Cube {
    private length: number;
    private width: number;
    private height: number;

    constructor(length: number, width: number, height: number) {
        this.length = length;
        this.width = width;
        this.height = height;
    }

    surfaceArea(): number {
        return sum(...this.faces().map((face) => face.area()));
    }

    volume(): number {
        return this.length * this.width * this.height;
    }

    faces(): Array<CubeFace> {
        return [
            new CubeFace(this.length, this.width),
            new CubeFace(this.length, this.height),
            new CubeFace(this.width, this.length),
            new CubeFace(this.width, this.height),
            new CubeFace(this.height, this.length),
            new CubeFace(this.height, this.width),
        ];
    }
}

const parse = (input: string) => {
    const lines = input.split("\n");
    const cubes = lines.map((line) => {
        const [l, w, h] = line.split("x").map((side) => parseInt(side));
        return new Cube(l, w, h);
    });

    return cubes;
};

const calcRequiredWrappingPaper = (cube: Cube) => {
    const surfaceArea = cube.surfaceArea();
    const slack = Math.min(...cube.faces().map((face) => face.area()));

    return surfaceArea + slack;
};

const calcRequiredRibbon = (cube: Cube) => {
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
