import { intersect, sum } from "../../common";
import Input from "../../common/input";
import { isNotEmptyString, toNumber } from "../../common/string-helpers";

type ScratchCard = {
    id: number;
    winners: Array<number>;
    numbers: Array<number>;
};

const parseLine = (input: string): ScratchCard => {
    const [id, card] = input.split(":");
    const [, shortId] = id.split(" ").filter(isNotEmptyString);
    const [left, right] = card.split("|");

    return {
        id: parseInt(shortId),
        winners: left.trim().split(" ").filter(isNotEmptyString).map(toNumber),
        numbers: right.trim().split(" ").filter(isNotEmptyString).map(toNumber),
    };
};

const parse = (input: string): Array<ScratchCard> => {
    const lines = new Input(input).asLines().asStrings();

    return lines.map(parseLine);
};

const getWinningNumbers = (card: ScratchCard) => {
    return intersect(new Set(card.winners), new Set(card.numbers));
};

const getPoints = (card: ScratchCard) => {
    const winners = getWinningNumbers(card);

    return winners.size == 0 ? 0 : Math.pow(2, winners.size - 1);
};

export const part1 = (input: string): string => {
    const scratchCards = parse(input);
    const points = scratchCards.map(getPoints);
    return sum(...points).toString();
};

export const part2 = (input: string): string => {
    const scratchCards = parse(input);

    const store = scratchCards.reduce(
        (acc, card) => {
            acc[card.id] = 0;
            return acc;
        },
        {} as Record<number, number>,
    );

    for (const card of scratchCards) {
        store[card.id] += 1;

        const nextScratchCards = [...getWinningNumbers(card)].map(
            (_, index) => card.id + index + 1,
        );

        for (const cardId of nextScratchCards) {
            store[cardId] += store[card.id];
        }
    }

    return sum(...Object.values(store)).toString();
};
