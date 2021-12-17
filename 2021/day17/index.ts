type Target = {
    x: {
        min: number;
        max: number;
    };
    y: {
        min: number;
        max: number;
    };
};

const parse = (input: string): Target => {
    const right = input.substring(input.indexOf(":") + 1);
    const [xpart, ypart] = right.split(", ");
    const [xmin, xmax] = xpart.split("..");
    const [ymin, ymax] = ypart.split("..");

    return {
        x: {
            min: parseInt(xmin.substring(3)),
            max: parseInt(xmax),
        },
        y: {
            min: parseInt(ymin.substring(2)),
            max: parseInt(ymax),
        },
    };
};

type Point = {
    x: number;
    y: number;
};

const inTarget = (point: Point, target: Target) => {
    return (
        point.x >= target.x.min &&
        point.x <= target.x.max &&
        point.y >= target.y.min &&
        point.y <= target.y.max
    );
};

const exceedsTarget = (point: Point, target: Target) => {
    return point.x >= target.x.max || point.y <= target.y.min;
};

const testTrajectory = (vx: number, vy: number, target: Target) => {
    const points: Array<Point> = [{ x: 0, y: 0 }];

    while (!exceedsTarget(points[points.length - 1], target)) {
        points.push({
            x: points[points.length - 1].x + vx,
            y: points[points.length - 1].y + vy,
        });

        if (inTarget(points[points.length - 1], target)) {
            return true;
        }

        vx = vx - 1 >= 0 ? vx - 1 : 0;
        vy = vy - 1;
    }

    return false;
};

export const part1 = (input: string): string => {
    const target = parse(input);
    const maximumY =
        (Math.abs(target.y.min) * (Math.abs(target.y.min) - 1)) / 2;

    return maximumY.toString();
};

export const part2 = (input: string): string => {
    const target = parse(input);

    let count = 0;

    for (let x = 1; x < target.x.max + 1; ++x) {
        for (let y = target.y.min; y < -target.y.min; ++y) {
            count += +testTrajectory(x, y, target);
        }
    }

    return count.toString();
};
