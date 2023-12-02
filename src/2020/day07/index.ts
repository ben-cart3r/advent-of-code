type Rule = {
    name: string;

    contents: Array<{
        name: string;
        amount: number;
    }>;
};

const parseRule = (rule: string): Rule => {
    const [name, contents] = rule.split("contain");

    const formattedName = name.substring(0, name.indexOf(" bags"));

    if (rule.includes("contain no other bags.")) {
        return {
            name: formattedName,
            contents: [],
        };
    }

    const types = contents.split(",").map((bagType) => {
        const [quantity, ...nameParts] = bagType.trim().split(" ");
        const name = nameParts.join(" ");
        return {
            amount: parseInt(quantity),
            name: name.substring(0, name.indexOf(" bag")),
        };
    });

    return {
        name: formattedName,
        contents: types,
    };
};

const parseRules = (input: string) => {
    return input.trim().split("\n").map(parseRule);
};

const solver1 = (input: string): number => {
    const rules = parseRules(input);

    // Recursively search for a bag type
    const checkBag = (bagType: string): boolean => {
        const rule = rules.find((rule) => rule.name == bagType)!;

        // Exit condition, stop when "shiny gold" bag is found
        if (rule.contents.find((bagType) => bagType.name == "shiny gold")) {
            return true;
        }

        return rule.contents.reduce((acc, rule) => {
            return acc || checkBag(rule.name);
        }, false);
    };

    // Count number of bags containing a "shiny gold" bag
    return rules.reduce((acc, rule) => {
        if (checkBag(rule.name)) {
            return acc + 1;
        }

        return acc;
    }, 0);
};

const solver2 = (input: string): number => {
    const rules = parseRules(input);

    // Recursively count bags inside a "shiny gold" bag
    const countBags = (bagType: string): number => {
        const rule = rules.find((rule) => rule.name == bagType)!;

        // Exit condition, return 0 if no more "inner" bags
        if (rule.contents.length == 0) {
            return 0;
        }

        return rule.contents.reduce((acc, bagType) => {
            return (
                acc + bagType.amount + bagType.amount * countBags(bagType.name)
            );
        }, 0);
    };

    return countBags("shiny gold");
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
