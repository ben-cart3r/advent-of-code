import Input from "../../common/input";

type Sensor = {
    x: number;
    y: number;
    beacon: {
        x: number;
        y: number;
    };
    dist: number;
};

const parse = (input: string): Array<Sensor> => {
    return new Input(input)
        .asLines()
        .asStrings()
        .map((line) => {
            const [, sx, sy, bx, by] = line.match(
                /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
            );

            return {
                x: parseInt(sx),
                y: parseInt(sy),
                beacon: {
                    x: parseInt(bx),
                    y: parseInt(by),
                },
                dist: manhattan(
                    parseInt(sx),
                    parseInt(sy),
                    parseInt(bx),
                    parseInt(by)
                ),
            };
        });
};

const manhattan = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

export const part1 = (input: string, y = 2000000): string => {
    const sensors = parse(input);
    const invalid = new Set<string>();

    for (const sensor of sensors) {
        if (sensor.y - sensor.dist < y && sensor.y + sensor.dist > y) {
            for (
                let x = sensor.x - sensor.dist;
                x < sensor.x + sensor.dist;
                ++x
            ) {
                const distToPoint = manhattan(sensor.x, sensor.y, x, y);

                if (distToPoint < sensor.dist + 1) {
                    if (!(x == sensor.beacon.x && y == sensor.beacon.y)) {
                        invalid.add(`${x},${y}`);
                    }
                }
            }
        }
    }

    return Array.from(invalid).length.toString();
};

export const part2 = (input: string, limit = 4000000): string => {
    const sensors = parse(input);
    const sets: Array<Set<string>> = [];

    for (const sensor of sensors) {
        const nearby = new Set<string>();

        const xmin = Math.max(0, sensor.x - sensor.dist - 1);
        const xmax = Math.min(limit, sensor.x + sensor.dist + 1);

        const ymin = Math.max(0, sensor.y - sensor.dist - 1);
        const ymax = Math.min(limit, sensor.y + sensor.dist + 1);

        for (let i = 0; i <= sensor.dist; ++i) {
            if (sensor.y - i >= ymin) {
                nearby.add(`${xmin + i},${sensor.y - i}`);
            }
            if (sensor.y + i <= ymax) {
                nearby.add(`${xmin + i},${sensor.y + i}`);
            }
        }

        for (let i = 0; i <= sensor.dist; ++i) {
            if (sensor.y - i >= ymin) {
                nearby.add(`${xmax - i},${sensor.y - i}`);
            }
            if (sensor.y + i <= ymax) {
                nearby.add(`${xmax - i},${sensor.y + i}`);
            }
        }

        sets.push(nearby);
    }

    let distressBeacon: number = null;

    for (const set of sets) {
        for (const coord of set) {
            const [x, y] = coord.split(",");

            let valid = true;
            for (const sensor of sensors) {
                valid =
                    valid &&
                    manhattan(sensor.x, sensor.y, parseInt(x), parseInt(y)) >
                        sensor.dist;
            }
            if (valid) {
                distressBeacon = parseInt(x) * 4000000 + parseInt(y);
                break;
            }
        }
    }

    return distressBeacon.toString();
};

// node --max-old-space-size=8192 dist/runner.js -y 2022 -d 15
