import { count } from "../../common";

const parse = (input: string) => {
    return input.split("\n");
};

export const part1 = (input: string): string => {
    const numbers = parse(input);
    const limit = numbers[0].length;

    let counter = 0;
    let gamma = "";
    let epsilon = "";

    while (counter < limit) {
        const bits = numbers.map((num) => num[counter]);
        const count0 = count(bits, "0");
        const count1 = count(bits, "1");

        gamma += count1 > count0 ? "1" : "0";
        epsilon += count1 > count0 ? "0" : "1";

        counter++;
    }

    // Convert binary to decimal
    const g = parseInt(gamma, 2);
    const e = parseInt(epsilon, 2);

    return (g * e).toString();
};

export const part2 = (input: string): string => {
    let numbers1 = parse(input);
    let numbers2 = [...numbers1];

    let counter = 0;
    const limit = numbers1[0].length;

    while ((numbers1.length > 1 || numbers2.length > 1) && counter < limit) {
        const bits1 = numbers1.map((num) => num[counter]);
        const bits2 = numbers2.map((num) => num[counter]);

        const count1_0 = count(bits1, "0");
        const count1_1 = count(bits1, "1");
        const count2_0 = count(bits2, "0");
        const count2_1 = count(bits2, "1");

        // Filter by most common
        numbers1 = numbers1.filter(
            (num) => num[counter] == (count1_1 >= count1_0 ? "1" : "0"),
        );

        // Filter by least common
        if (numbers2.length > 1) {
            numbers2 = numbers2.filter(
                (num) => num[counter] == (count2_0 <= count2_1 ? "0" : "1"),
            );
        }

        counter++;
    }

    // Convert binary to decimal
    const o2 = parseInt(numbers1[0], 2);
    const co2 = parseInt(numbers2[0], 2);

    return (o2 * co2).toString();
};
