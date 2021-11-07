const parseRange = (range: string): [number, number] => {
    const [min, max] = range.split("-");

    return [parseInt(min), parseInt(max)];
};

const parseRule = (rule: string) => {
    const [name, ranges] = rule.split(":");
    return {
        name,
        ranges: ranges.split(" or ").map(parseRange),
    };
};

type Input = {
    rules: Array<{
        name: string;
        ranges: Array<[number, number]>;
    }>;

    myTicket: Array<number>;

    nearbyTickets: Array<Array<number>>;
};

const parseInput = (input: string) => {
    const acc: Input = {
        rules: [],
        myTicket: [],
        nearbyTickets: [],
    };

    return input
        .trim()
        .split("\n\n")
        .reduce((acc, part, idx) => {
            if (idx == 0) {
                acc.rules = part.split("\n").map(parseRule);
            }

            if (idx == 1) {
                acc.myTicket = part
                    .split("\n")[1]
                    .split(",")
                    .map((n) => parseInt(n));
            }

            if (idx == 2) {
                acc.nearbyTickets = part
                    .split("\n")
                    .slice(1)
                    .map((p) => p.split(",").map((n) => parseInt(n)));
            }

            return acc;
        }, acc);
};

const inRange = (x: number, min: number, max: number): boolean => {
    return x >= min && x <= max;
};

const inRanges = (x: number, ranges: Array<[number, number]>): boolean => {
    let valid = false;
    let counter = 0;

    while (!valid && counter < ranges.length) {
        valid = inRange(x, ranges[counter][0], ranges[counter][1]);
        counter++;
    }

    return valid;
};

const transpose = <T>(array: Array<Array<T>>): Array<Array<T>> => {
    return array[0].map((_, idx) => array.map((r) => r[idx]));
};

const sum = (values: Array<number>) => {
    return values.reduce((acc, val) => acc + val, 0);
};

const flatten = <T>(array: Array<Array<T>>): Array<T> => {
    return array.reduce((acc, v) => [...acc, ...v]);
};

const solver1 = (input: string): number => {
    const { rules, nearbyTickets } = parseInput(input);
    const ranges = flatten(rules.map((r) => r.ranges));

    const invalidValues = nearbyTickets.reduce((acc, ticket) => {
        const values = ticket.filter((val) => {
            return !inRanges(val, ranges);
        });
        return [...acc, ...values];
    }, []);

    return sum(invalidValues);
};

const solver2 = (input: string): number => {
    const { rules, myTicket, nearbyTickets } = parseInput(input);
    const ranges = flatten(rules.map((r) => r.ranges));

    const validTickets = nearbyTickets.filter((ticket) => {
        return ticket.every((x) => inRanges(x, ranges));
    });

    const columns = transpose(validTickets);

    // For each column, find all rules that it satisfies
    const columnMatches = columns.map((column, idx) => {
        const matches = [];
        let counter = 0;

        while (counter < rules.length) {
            const { name, ranges } = rules[counter];
            const valid = column.every((x) => inRanges(x, ranges));

            if (valid) {
                matches.push(name);
            }

            counter++;
        }

        return {
            idx,
            matches,
        };
    });

    // Sort by column with least matches
    const sorted = columnMatches.sort((a, b) => {
        if (a.matches.length > b.matches.length) {
            return 1;
        }
        if (b.matches.length > a.matches.length) {
            return -1;
        }
        return 0;
    });

    // List which column applies to each rule
    const order = Array(sorted.length).map(() => "");

    for (let i = 0; i < sorted.length; i++) {
        let c = 0;
        let added = false;
        while (!added && c < sorted[i].matches.length) {
            if (!order.includes(sorted[i].matches[c])) {
                order[sorted[i].idx] = sorted[i].matches[c];
                added = true;
            }
            c++;
        }
    }

    // Calculate product of departure columns
    return order.reduce((acc, name, idx) => {
        if (name.includes("departure")) {
            acc *= myTicket[idx];
        }
        return acc;
    }, 1);
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
