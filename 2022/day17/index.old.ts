import { sum } from "../../common";
import { asc } from "../../common/sorting";

const rocks = [
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
    ],
    [
        [1, 1],
        [0, 0],
        [1, 0],
        [2, 0],
        [1, -1],
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    [
        [0, -3],
        [0, -2],
        [0, -1],
        [0, 0],
    ],
    [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
    ],
];

const parse = (input: string) => {
    return input.split("");
};

export const part1 = (input: string): string => {
    const directions = parse(input);
    const moves = 2022;
    const grid = new Map<string, string>([
        ["0,0", "-"],
        ["1,0", "-"],
        ["2,0", "-"],
        ["3,0", "-"],
        ["4,0", "-"],
        ["5,0", "-"],
        ["6,0", "-"],
    ]);

    let maxY = 0;
    let dirCounter = 0;

    for (let i = 0; i < moves; ++i) {
        const rock = rocks[i % 5];
        const bottom = rock.sort(([, y], [, y2]) => asc(y2, y))[0];

        let counter = 0;
        let falling = true;
        let x = 2;
        let y = maxY + 4 - bottom[1];

        while (falling) {
            //&& counter < (i == 3 ? 0 : 20)) {
            if (counter % 2 == 0) {
                if (directions[dirCounter % directions.length] == "<") {
                    // console.log(`Moving rock ${i} left`);
                    let valid = true;
                    for (const rockPart of rock) {
                        valid = valid && x + rockPart[0] - 1 >= 0;
                        valid =
                            valid &&
                            !grid.has(
                                `${x + rockPart[0] - 1},${y + rockPart[1]}`
                            );
                    }
                    if (valid) {
                        x--;
                    }
                } else {
                    // console.log(`Moving rock ${i} right`);
                    let valid = true;
                    for (const rockPart of rock) {
                        valid = valid && x + rockPart[0] + 1 < 7;
                        valid =
                            valid &&
                            !grid.has(
                                `${x + rockPart[0] + 1},${y + rockPart[1]}`
                            );
                    }
                    if (valid) {
                        x++;
                    }
                }
                dirCounter++;
            } else {
                // console.log(`Moving rock ${i} down`);
                y--;
                for (const rockPart of rock) {
                    if (grid.has(`${x + rockPart[0]},${y + rockPart[1]}`)) {
                        falling = false;
                        y++;
                    }
                }
            }

            if (falling) {
                counter++;
            }
        }

        for (const rockPart of rock) {
            maxY = Math.max(maxY, y + rockPart[1]);
            grid.set(`${x + rockPart[0]},${y + rockPart[1]}`, "#");
        }
    }

    // for (let y = 20; y >= 0; --y) {
    //     const line = ["|"];
    //     for (let x = 0; x < 7; ++x) {
    //         if (grid.has(`${x},${y}`)) {
    //             line.push(grid.get(`${x},${y}`));
    //         } else {
    //             line.push(" ");
    //         }
    //     }
    //     line.push("|");
    //     console.log(line.join(""));
    // }

    return maxY.toString();
};

export const part2 = (input: string): string => {
    const directions = parse(input);
    const moves = 20000;
    const grid = new Map<string, string>([
        ["0,0", "-"],
        ["1,0", "-"],
        ["2,0", "-"],
        ["3,0", "-"],
        ["4,0", "-"],
        ["5,0", "-"],
        ["6,0", "-"],
    ]);

    let maxY = 0;
    let dirCounter = 0;

    for (let i = 0; i < moves; ++i) {
        const rock = rocks[i % 5];
        const bottom = rock.sort(([, y], [, y2]) => asc(y2, y))[0];

        let counter = 0;
        let falling = true;
        let x = 2;
        let y = maxY + 4 - bottom[1];

        while (falling) {
            //&& counter < (i == 3 ? 0 : 20)) {
            if (counter % 2 == 0) {
                if (directions[dirCounter % directions.length] == "<") {
                    // console.log(`Moving rock ${i} left`);
                    let valid = true;
                    for (const rockPart of rock) {
                        valid = valid && x + rockPart[0] - 1 >= 0;
                        valid =
                            valid &&
                            !grid.has(
                                `${x + rockPart[0] - 1},${y + rockPart[1]}`
                            );
                    }
                    if (valid) {
                        x--;
                    }
                } else {
                    // console.log(`Moving rock ${i} right`);
                    let valid = true;
                    for (const rockPart of rock) {
                        valid = valid && x + rockPart[0] + 1 < 7;
                        valid =
                            valid &&
                            !grid.has(
                                `${x + rockPart[0] + 1},${y + rockPart[1]}`
                            );
                    }
                    if (valid) {
                        x++;
                    }
                }
                dirCounter++;
            } else {
                // console.log(`Moving rock ${i} down`);
                y--;
                for (const rockPart of rock) {
                    if (grid.has(`${x + rockPart[0]},${y + rockPart[1]}`)) {
                        falling = false;
                        y++;
                    }
                }
            }

            if (falling) {
                counter++;
            }
        }

        for (const rockPart of rock) {
            maxY = Math.max(maxY, y + rockPart[1]);
            grid.set(`${x + rockPart[0]},${y + rockPart[1]}`, "#");
        }

        if (i == 1010) {
            console.log(maxY);
        }

        // const pattern = [16, 74, 62, 34, 131, 158, 389, 204, 270, 679, 263, 273, 185];
        // const moves =   [13, 64, 109, 133, 209, 310, 543, 677, 854, 1280, 1445, 1623, 1745];

        // for (let a = 0; a < pattern.length; ++a) {
        //     const p = pattern[a]
        //     const cum = sum(...pattern.slice(0, a + 1));
        //     if (maxY >= 244 + cum && maxY < 244 + cum + 4) {
        //         console.log(`move = ${i - 163}, maxY=${maxY}, ${p}`)
        //     }
        // }

        // if (maxY >= 244 && maxY < 244 + 4) {
        //     console.log(`move = ${i}, maxY=${maxY}`)
        // }

        // if (maxY >= 2982 && maxY < 2982 + 4) {
        //     console.log(`move = ${i}, maxY=${maxY}`)
        // }

        // if (maxY >= 5720 && maxY < 5720 + 4) {
        //     console.log(`move = ${i}, maxY=${maxY}`)
        // }

        // if (maxY >= 8458 && maxY < 8458 + 4) {
        //     console.log(`move = ${i}, maxY=${maxY}`)
        // }
    }

    // for (let y = 20; y >= 0; --y) {
    //     const line = ["|"];
    //     for (let x = 0; x < 7; ++x) {
    //         if (grid.has(`${x},${y}`)) {
    //             line.push(grid.get(`${x},${y}`));
    //         } else {
    //             line.push(" ");
    //         }
    //     }
    //     line.push("|");
    //     console.log(line.join(""));
    // }

    const flats = [0];
    for (let y = 0; y < 20000; ++y) {
        let line = 0;
        for (let x = 0; x < 7; ++x) {
            if (grid.has(`${x},${y}`)) {
                line++;
            }
        }
        if (line == 7) {
            flats.push(y);
        }
    }

    for (let i = 0; i < flats.length - 1; i++) {
        // console.log(`${flats[i]} -> ${flats[i + 1]} = ${flats[i+1]-flats[i]}`);
    }

    // We know the pattern repeats every 1745 moves after the first 163 moves, height grows by 2738
    // height is 195 after 163 moves
    // answer should be sum of pattern under 1000000000000 + height of y at move 847?

    // let y = 195;
    // for (let i = 163; i < 1000000000000; i += 1745) {
    //     y += 2738
    // }

    const yIncrease = [
        16,
        74,
        62,
        34,
        131,
        158,
        389,
        204,
        270,
        679,
        263,
        273,
        185,
    ];
    const moveIncrease = [
        13,
        51,
        45,
        24,
        76,
        101,
        233,
        134,
        177,
        426,
        165,
        178,
        122,
    ];

    let counter = 0;
    let move = 163;
    let y = 195;

    while (move < 1000000000000) {
        y += 2738;
        move += 1745;
    }

    move -= 1745;
    y -= 2738;

    //1568 - 195

    console.log(1000000000000 - move);
    console.log(y + 1373 - 1);

    // while (move < 1000000000000) {
    //     y += yIncrease[counter % moveIncrease.length];
    //     move += moveIncrease[counter % moveIncrease.length];
    //     counter++;
    // }

    // console.log(counter);
    // console.log(moveIncrease[(counter - 1) % moveIncrease.length])

    // console.log(move - moveIncrease[(counter - 1) % moveIncrease.length]);
    // console.log(y - yIncrease[(counter - 1) % moveIncrease.length]);

    return maxY.toString();
};
