const headings = ["^", ">", "v", "<"];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const parse = (input: string): Array<string> => {
    return input.split("");
};

export const part1 = (input: string): string => {
    const directions = parse(input);
    const visited: Array<string> = ["0-0"];
    let currentX = 0;
    let currentY = 0;

    for (const direction of directions) {
        currentX += dx[headings.indexOf(direction)];
        currentY += dy[headings.indexOf(direction)];

        if (!visited.includes(`${currentX}-${currentY}`)) {
            visited.push(`${currentX}-${currentY}`);
        }
    }

    return visited.length.toString();
};

export const part2 = (input: string): string => {
    const directions = parse(input);
    const visited: Array<string> = ["0-0"];

    const currentX = [0, 0]; // santa, robo-santa
    const currentY = [0, 0];

    for (const [index, direction] of directions.entries()) {
        const agent = index % 2;

        currentX[agent] += dx[headings.indexOf(direction)];
        currentY[agent] += dy[headings.indexOf(direction)];

        if (!visited.includes(`${currentX[agent]}-${currentY[agent]}`)) {
            visited.push(`${currentX[agent]}-${currentY[agent]}`);
        }
    }

    return visited.length.toString();
};
