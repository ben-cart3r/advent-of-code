const parseInput = (input: string): Array<[string, number]> => {
    return input.trim().split("\n").map((row) => {
        const dir = row.substring(0,1);
        const amount = parseInt(row.substring(1));

        return [dir, amount]
    });
}


const solver1 = (input: string): number => {
    const directions = parseInput(input);
    let heading = 90;
    let north = 0;
    let east = 0;

    const rotate = (amount: number) => {
        heading += amount;

        if(heading < 0) {
            heading = 360 + heading;
        }

        heading = heading % 360;
    }

    const forward = (amount: number) => {
        if(heading == 90) {
            east += amount;
        }

        if(heading == 180) {
            north -= amount;
        }

        if(heading == 270) {
            east -= amount;
        }

        if(heading == 0) {
            north += amount;
        }
    }

    for (let i = 0; i < directions.length; ++i) {
        switch(directions[i][0]) {
            case "N":
                north += directions[i][1];
                break;
            case "S":
                north -= directions[i][1];
                break;
            case "E":
                east += directions[i][1];
                break;
            case "W":
                east -= directions[i][1];
                break;
            case "L":
                rotate(-directions[i][1]);
                break;
            case "R":
                rotate(directions[i][1]);
                break;
            case "F":
                forward(directions[i][1]);
                break;
        }
    }

    return Math.abs(north) + Math.abs(east);
};

const solver2 = (input: string): number => {
    const directions = parseInput(input);
    const s = {x: 0, y: 0};
    const wp = {x: 10, y:1 };
    
    const rotate = (angle: number) => {
        const sin = Math.sin(angle * Math.PI / 180);
        const cos = Math.cos(angle * Math.PI / 180);
      
        // rotate point
        const wpx = wp.x * cos - wp.y * sin;
        const wpy = wp.x * sin + wp.y * cos;
      
        // translate point back:
        wp.x = Math.round(wpx);
        wp.y = Math.round(wpy);
    }

    const forward = (amount: number) => {
        s.x += wp.x * amount;
        s.y += wp.y * amount;
    }

    for (let i = 0; i < directions.length; ++i) {
        switch(directions[i][0]) {
            case "N":
                wp.y += directions[i][1];
                break;
            case "S":
                wp.y -= directions[i][1];
                break;
            case "E":
                wp.x += directions[i][1];
                break;
            case "W":
                wp.x -= directions[i][1];
                break;
            case "L":
                rotate(directions[i][1]);
                break;
            case "R":
                rotate(-directions[i][1]);
                break;
            case "F":
                forward(directions[i][1]);
                break;
        }
    }

    return Math.abs(s.x) + Math.abs(s.y);
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
