import { flatten, sum } from "../../common";
import Input from "../../common/input";

type IntegerPacket = {
    type: "integer";
    data: number;
};

type ListPacket = {
    type: "list";
    data: Array<IntegerPacket | ListPacket>;
};

type UnknownDimensionalArray = Array<number | UnknownDimensionalArray>;

const convertList = (
    list: UnknownDimensionalArray,
): Array<IntegerPacket | ListPacket> => {
    return list.map((item) => {
        if (typeof item == "number") {
            return {
                type: "integer",
                data: item,
            };
        }
        return {
            type: "list",
            data: convertList(item),
        };
    });
};

const parsePacket = (input: string): ListPacket => {
    return {
        type: "list",
        data: convertList(JSON.parse(input)),
    };
};

const parse = (input: string): Array<[ListPacket, ListPacket]> => {
    return new Input(input)
        .asParagraphs()
        .asStrings()
        .map(([left, right]) => [parsePacket(left), parsePacket(right)]);
};

const compare = (left: ListPacket, right: ListPacket): number => {
    let counter = 0;

    while (counter < left.data.length && counter < right.data.length) {
        const l = left.data[counter];
        const r = right.data[counter];
        let result = 0;

        if (l.type == "integer" && r.type == "integer") {
            result = l.data - r.data;
        }

        if (l.type == "list" && r.type == "list") {
            result = compare(l, r);
        }

        if (l.type == "integer" && r.type == "list") {
            result = compare({ type: "list", data: [l] }, r);
        }

        if (l.type == "list" && r.type == "integer") {
            result = compare(l, { type: "list", data: [r] });
        }

        if (result != 0) {
            return result;
        }

        counter++;
    }

    return left.data.length - right.data.length;
};

export const part1 = (input: string): string => {
    const parsed = parse(input);
    const indices: Array<number> = [];

    for (let i = 0; i < parsed.length; ++i) {
        if (compare(parsed[i][0], parsed[i][1]) < 0) {
            indices.push(i + 1);
        }
    }

    return sum(...indices).toString();
};

export const part2 = (input: string): string => {
    const parsed = parse(input);
    const packets = flatten(parsed);
    const divider1 = parsePacket("[[2]]");
    const divider2 = parsePacket("[[6]]");

    packets.push(divider1);
    packets.push(divider2);

    const sorted = packets.sort((a, b) => compare(a, b));
    const index1 = sorted.findIndex((p) => compare(p, divider1) == 0) + 1;
    const index2 = sorted.findIndex((p) => compare(p, divider2) == 0) + 1;

    return (index1 * index2).toString();
};
