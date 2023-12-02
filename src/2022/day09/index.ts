import Input from "../../common/input";

const parse = (input: string): Array<[string, number]> => {
    return new Input(input)
        .asLines()
        .asStrings()
        .map((l) => (l.match(/([RLUD]) (\d+)/) || []).slice(1, 3))
        .map(([dir, count]) => [dir, parseInt(count)]);
};

const moves = new Map<string, [number, number]>([
    ["U", [0, 1]],
    ["D", [0, -1]],
    ["R", [1, 0]],
    ["L", [-1, 0]],
]);

const processMotions = (motions: Array<[string, number]>, knots: number) => {
    const knotPositions = Array.from({ length: knots }, () => [0, 0]);
    const visited = new Set<string>();

    for (const [dir, count] of motions) {
        const move = moves.get(dir);

        for (let i = 0; i < count; ++i) {
            const [hx, hy] = knotPositions[0];

            knotPositions[0] = [hx + move![0], hy + move![1]];

            for (let j = 1; j < knots; ++j) {
                const [px, py] = knotPositions[j - 1];
                let [kx, ky] = knotPositions[j];
                const dx = kx - px;
                const dy = ky - py;
                const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

                if (dist > 1.5) {
                    if (Math.abs(dx) >= 2 && Math.abs(dy) >= 2) {
                        if (dx > 1) {
                            kx = px + 1;
                        } else {
                            kx = px - 1;
                        }
                        if (dy > 1) {
                            ky = py + 1;
                        } else {
                            ky = py - 1;
                        }
                    } else if (Math.abs(dx) >= 2) {
                        ky = py;
                        if (dx > 1) {
                            kx = px + 1;
                        } else {
                            kx = px - 1;
                        }
                    } else if (Math.abs(dy) >= 2) {
                        kx = px;
                        if (dy > 1) {
                            ky = py + 1;
                        } else {
                            ky = py - 1;
                        }
                    }
                }

                knotPositions[j] = [kx, ky];

                if (j == knots - 1) {
                    visited.add(`${kx},${ky}`);
                }
            }
        }
    }
    return Array.from(visited).length;
};

export const part1 = (input: string): string => {
    const instructions = parse(input);

    return processMotions(instructions, 2).toString();
};

export const part2 = (input: string): string => {
    const instructions = parse(input);

    return processMotions(instructions, 10).toString();
};
