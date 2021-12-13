type Dot = {
    x: number;
    y: number;
};

const parse = (input: string) => {
    const [dots, folds] = input.split(/\n\n/);

    return {
        dots: dots.split(/\n/).map<Dot>((line) => {
            const [x, y] = line.split(",");
            return {
                x: parseInt(x),
                y: parseInt(y),
            };
        }),
        folds: folds.split(/\n/).map((line) => {
            const useful = line.substr(line.lastIndexOf(" ") + 1);
            const [axis, value] = useful.split("=");

            return {
                axis,
                value: parseInt(value),
            };
        }),
    };
};

const exists = (dots: Array<Dot>, dot: Dot) => {
    return dots.find((d) => {
        return d.x == dot.x && d.y == dot.y;
    });
};

const draw = (dots: Array<Dot>) => {
    const maxX = Math.max(...dots.map((dot) => dot.x));
    const maxY = Math.max(...dots.map((dot) => dot.y));

    for (let y = 0; y < maxY + 1; ++y) {
        const line: Array<string> = [];
        for (let x = 0; x < maxX + 1; ++x) {
            line.push(exists(dots, { x, y }) ? "#" : ".");
        }
        console.log(line.join(""));
    }
};

const foldPaper = (dots: Array<Dot>, axis: string, line: number) => {
    return dots.reduce<Array<Dot>>((acc, dot) => {
        const newDot = {
            x: axis == "x" && dot.x > line ? line - (dot.x - line) : dot.x,
            y: axis == "y" && dot.y > line ? line - (dot.y - line) : dot.y,
        };

        if (!exists(acc, newDot)) {
            acc.push(newDot);
        }

        return acc;
    }, []);
};

export const part1 = (input: string): string => {
    const { dots, folds } = parse(input);
    const fold = folds[0];
    const final = foldPaper(dots, fold.axis, fold.value);

    return final.length.toString();
};

// Would be nice to decode the output but not needed
export const part2 = (input: string): void => {
    const { dots, folds } = parse(input);

    const final = folds.reduce((dots, fold) => {
        return foldPaper(dots, fold.axis, fold.value);
    }, dots);

    draw(final);
};
