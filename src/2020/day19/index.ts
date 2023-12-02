const parseInput = (input: string) => {
    const parts = input.trim().split("\n\n");
    const rules = parts[0].split("\n");
    const ruleMap = new Map<string, string>();

    for (let i = 0; i < rules.length; ++i) {
        const [id, value] = rules[i].split(": ");
        ruleMap.set(id, value);
    }

    return {
        rules: ruleMap,
        messages: parts[1].split("\n"),
    };
};

const memoized = new Map<string, string>();

const buildRegex = (rules: Map<string, string>, id: string): string => {
    if (memoized.get(id)) {
        return memoized.get(id)!;
    }

    const r = rules.get(id)!;

    if (r == '"a"' || r == '"b"') {
        return r[1];
    } else {
        if (r.includes(id) && id == "8") {
            memoized.set(id, `(${buildRegex(rules, "42")})+`);
        } else {
            const regex = r
                .split(" | ")
                .map((g) => {
                    return g
                        .split(" ")
                        .map((sr) => buildRegex(rules, sr))
                        .join("");
                })
                .join("|");

            if (id == "0") {
                memoized.set(id, `^${regex}$`);
            } else {
                memoized.set(id, `(${regex})`);
            }
        }
        return memoized.get(id)!;
    }
};

const solver1 = (input: string): number => {
    const { rules, messages } = parseInput(input);
    const regex = new RegExp(buildRegex(rules, "0"));

    return messages.reduce((acc, message) => {
        if (regex.test(message)) {
            acc++;
        }
        return acc;
    }, 0);
};

const solver2 = (input: string): number => {
    const { rules, messages } = parseInput(input);

    // Don't carry over memoization from part 1
    memoized.clear();

    // Update rule 8 & rule 11
    rules.set("8", "42 | 42 8");
    rules.set("11", "42 31 | 42 11 31");

    // Can't do recursive regex in native JS, so expand
    rules.set(
        "11",
        "42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31 | 42 42 42 42 42 42 42 31 31 31 31 31 31 31",
    );

    const regex = new RegExp(buildRegex(rules, "0"));

    return messages.reduce((acc, message) => {
        if (regex.test(message)) {
            acc++;
        }
        return acc;
    }, 0);
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
