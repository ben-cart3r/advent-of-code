import { sum } from ".";

export class Quadrilateral {
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

export class Cuboid {
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

    faces(): Array<Quadrilateral> {
        return [
            new Quadrilateral(this.length, this.width),
            new Quadrilateral(this.length, this.height),
            new Quadrilateral(this.width, this.length),
            new Quadrilateral(this.width, this.height),
            new Quadrilateral(this.height, this.length),
            new Quadrilateral(this.height, this.width),
        ];
    }
}