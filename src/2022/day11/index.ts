import { product } from "../../common";
import Input from "../../common/input";
import { asc } from "../../common/sorting";

type Monkey = {
    items: Array<number>;
    operand: "old" | number;
    operator: "+" | "*";
    test: number;
    truthy: number;
    falsy: number;
    inspected: number;
};

const parse = (input: string): Array<Monkey> => {
    return new Input(input)
        .asParagraphs()
        .asStrings()
        .map((lines) => {
            const [, items] = lines[1].split("Starting items: ");
            const [, operationPart] = lines[2].split("Operation: new = old ");
            const [, divisor] = lines[3].split("Test: divisible by ");
            const [, truthy] = lines[4].split("If true: throw to monkey ");
            const [, falsy] = lines[5].split("If false: throw to monkey ");

            return {
                items: items.split(", ").map(Number),
                operator: operationPart[0] == "*" ? "*" : "+",
                operand:
                    operationPart.substring(1).trim() == "old"
                        ? "old"
                        : parseInt(operationPart.substring(1).trim()),
                test: parseInt(divisor),
                truthy: parseInt(truthy),
                falsy: parseInt(falsy),
                inspected: 0,
            };
        });
};

const worryLevel = (
    item: number,
    operator: "+" | "*",
    operand: "old" | number
) => {
    if (operator == "+") {
        if (operand == "old") {
            return item + item;
        }
        return item + operand;
    }

    if (operand == "old") {
        return item * item;
    }

    return item * operand;
};

const process = (
    monkeys: Array<Monkey>,
    rounds: number,
    reliefFactor: number
) => {
    const normalizer = monkeys.reduce((acc, m) => acc * m.test, 1);

    for (let i = 0; i < rounds; ++i) {
        for (let j = 0; j < monkeys.length; ++j) {
            const monkey = monkeys[j];

            while (monkey.items.length > 0) {
                const item = monkey.items.shift();
                const worry = Math.floor(
                    (worryLevel(item, monkey.operator, monkey.operand) %
                        normalizer) /
                        reliefFactor
                );

                if (worry % monkey.test == 0) {
                    monkeys[monkey.truthy].items.push(worry);
                } else {
                    monkeys[monkey.falsy].items.push(worry);
                }

                monkey.inspected++;
            }
        }
    }

    return product(
        ...monkeys
            .sort((a, b) => asc(a.inspected, b.inspected))
            .slice(0, 2)
            .map((m) => m.inspected)
    );
};

export const part1 = (input: string): string => {
    return process(parse(input), 20, 3).toString();
};

export const part2 = (input: string): string => {
    return process(parse(input), 10000, 1).toString();
};
