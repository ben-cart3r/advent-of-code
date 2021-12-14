type Pair = {
    left: string;
    right: string;
};

const parse = (input: string) => {
    const [template, pairs] = input.split(/\n\n/);

    return {
        template: template.split(""),
        pairs: pairs.split(/\n/).map((line) => {
            const [left, right] = line.split(" -> ");

            return {
                left,
                right,
            } as Pair;
        }),
    };
};

const increment = (
    counter: Map<string, number>,
    key: string,
    value: number
) => {
    if (counter.has(key)) {
        counter.set(key, counter.get(key) + value);
    } else {
        counter.set(key, value);
    }
};

const polymerize = (
    template: Array<string>,
    pairs: Array<Pair>,
    steps: number
) => {
    // Store polymer as count of pairs
    let polymer = new Map<string, number>();

    // Initialise with template
    for (let i = 0; i < template.length - 1; ++i) {
        increment(polymer, `${template[i]}${template[i + 1]}`, 1);
    }

    for (let i = 0; i < steps; ++i) {
        // Hold the next iteration
        const p = new Map<string, number>();

        for (const key of polymer.keys()) {
            // Find char "m" to be inserted between "l" & "r"
            const l = key[0];
            const r = key[1];
            const m = pairs.find((pair) => pair.left == key).right;

            // Count of how many times we've seen lr so far
            const v = polymer.get(key);

            increment(p, `${l}${m}`, v);
            increment(p, `${m}${r}`, v);
        }

        polymer = p;
    }

    // Count occurrences of characters
    const counts = new Map<string, number>();

    for (const key of polymer.keys()) {
        const l = key[0];
        const v = polymer.get(key);

        increment(counts, l, v);
    }

    // Have to add 1 to the final char in initial template
    increment(counts, template[template.length - 1], 1);

    const max = Math.max(...counts.values());
    const min = Math.min(...counts.values());

    return max - min;
};

export const part1 = (input: string): string => {
    const { template, pairs } = parse(input);

    return polymerize(template, pairs, 10).toString();
};

export const part2 = (input: string): string => {
    const { template, pairs } = parse(input);

    return polymerize(template, pairs, 40).toString();
};
