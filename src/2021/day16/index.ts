import { product, sum } from "../../common";

type Packet = {
    version: number;
    type: number;
    value: number;
    subPackets: Array<Packet>;
};

// Replace with range(0, 15) mapped to hex conversion with padded bits
const hexMap = [
    "0000", // 0
    "0001", // 1
    "0010", // 2
    "0011", // 3
    "0100", // 4
    "0101", // 5
    "0110", // 6
    "0111", // 7
    "1000", // 8
    "1001", // 9
    "1010", // A
    "1011", // B
    "1100", // C
    "1101", // D
    "1110", // E
    "1111", // F
];

const parse = (input: string) => {
    return input
        .split("")
        .map((char) => {
            return hexMap[parseInt(char, 16)];
        })
        .join("")
        .split("");
};

const binToDec = (bin: string) => parseInt(bin, 2);

const parseLiteral = (bits: Array<string>) => {
    let literal = "";
    let leadingBit = bits.splice(0, 1).join("");

    while (leadingBit == "1") {
        const value = bits.splice(0, 4).join("");

        literal += value;

        leadingBit = bits.splice(0, 1).join("");
    }

    literal += bits.splice(0, 4).join("");

    return binToDec(literal);
};

const applyOperator = (type: number, values: Array<number>) => {
    switch (type) {
        case 0:
            return sum(...values);
        case 1:
            return product(...values);
        case 2:
            return Math.min(...values);
        case 3:
            return Math.max(...values);
        case 5:
            return +(values[0] > values[1]);
        case 6:
            return +(values[0] < values[1]);
        case 7:
            return +(values[0] == values[1]);
        default:
            return 0;
    }
};

const parsePacket = (bits: Array<string>) => {
    const version = binToDec(bits.splice(0, 3).join(""));
    const type = binToDec(bits.splice(0, 3).join(""));
    const subPackets: Array<Packet> = [];

    if (type == 4) {
        return {
            version,
            type,
            value: parseLiteral(bits),
            subPackets,
        };
    } else {
        const lengthTypeID = bits.splice(0, 1).join("");

        if (lengthTypeID == "0") {
            const length = binToDec(bits.splice(0, 15).join(""));
            const subBits = bits.splice(0, length);

            while (subBits.length > 0) {
                subPackets.push(parsePacket(subBits));
            }
        } else {
            const length = binToDec(bits.splice(0, 11).join(""));

            for (let i = 0; i < length; ++i) {
                subPackets.push(parsePacket(bits));
            }
        }
    }

    const subValues = subPackets.map((p) => p.value);
    const value = applyOperator(type, subValues);

    return {
        version,
        type,
        value,
        subPackets,
    };
};

const versionSum = (packet: Packet): number => {
    return sum(packet.version, ...packet.subPackets.map((p) => versionSum(p)));
};

export const part1 = (input: string): string => {
    const transmission = parse(input);
    const packet = parsePacket(transmission);

    return versionSum(packet).toString();
};

export const part2 = (input: string): string => {
    const transmission = parse(input);
    const packet = parsePacket(transmission);

    return packet.value.toString();
};
