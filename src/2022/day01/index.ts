import { sum } from "../../common";
import Input from "../../common/input";
import { asc } from "../../common/sorting";

type ElfFood = {
    calories: number;
};

type Elf = {
    inventory: {
        food: Array<ElfFood>;
    };
};

const parse = (input: string): Array<Elf> => {
    return new Input(input)
        .asParagraphs()
        .asIntegers()
        .map((calorieCounts) => ({
            inventory: {
                food: calorieCounts.map((calories) => ({ calories })),
            },
        }));
};

const calculateCalorieTotal = (elf: Elf): number => {
    return sum(...elf.inventory.food.map((item) => item.calories));
};

export const part1 = (input: string): string => {
    const elves = parse(input);
    const calorieCounts = elves.map(calculateCalorieTotal);

    return Math.max(...calorieCounts).toString();
};

export const part2 = (input: string): string => {
    const elves = parse(input);
    const calorieCounts = elves.map(calculateCalorieTotal);
    const sorted = calorieCounts.sort(asc);

    return sum(...sorted.slice(0, 3)).toString();
};
