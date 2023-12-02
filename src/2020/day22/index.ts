import { compareArrays, createLogger } from "../../common";

const logger = createLogger("info");

type Deck = Array<number>;
type DeckTuple = [Deck, Deck];
type DeckStore = Array<DeckTuple>;

const parse = (input: string): DeckTuple => {
    const decks = input.split("\n\n").map((deck) => {
        const [, ...tail] = deck.split("\n");

        return tail.map((card) => parseInt(card));
    });

    return [decks[0], decks[1]];
};

const calcDeckScore = (deck: Deck): number => {
    return deck.reduce((acc, card, idx) => {
        return acc + card * (deck.length - idx);
    }, 0);
};

const isPreviousState = (
    previousRounds: DeckStore,
    deck1: Deck,
    deck2: Deck,
): boolean => {
    for (let i = 0; i < previousRounds.length; ++i) {
        if (
            compareArrays(deck1, previousRounds[i][0]) &&
            compareArrays(deck2, previousRounds[i][1])
        ) {
            return true;
        }
    }
    return false;
};

const solver1 = (input: string): number => {
    const [deck1, deck2] = parse(input);

    while (deck1.length > 0 && deck2.length > 0) {
        const card1 = deck1.shift()!;
        const card2 = deck2.shift()!;

        if (card1 > card2) {
            deck1.push(card1);
            deck1.push(card2);
        } else {
            deck2.push(card2);
            deck2.push(card1);
        }
    }

    return calcDeckScore(deck1.length > 0 ? deck1 : deck2);
};

// This solution works but only after converting to JS and running with a larger heap size
// Need to investigate mem usage
// node --max-old-space-size=7168 runner.js --day 22
const solver2 = (input: string): number => {
    const [deck1, deck2] = parse(input);
    let gameId = 0;

    const play = (deck1: Deck, deck2: Deck) => {
        if (gameId > 24334) {
            throw "Stop";
        }

        const thisGameId = ++gameId;
        const previousRounds: DeckStore = [];

        logger.debug(`\n=== Game ${thisGameId} ===`);

        while (deck1.length > 0 && deck2.length > 0) {
            // Check if state appeared previously
            if (isPreviousState(previousRounds, deck1, deck2)) {
                // Player 1 wins
                return [deck1, []];
            }

            // Push a shallow copy of the current decks to previous state store
            previousRounds.push([[...deck1], [...deck2]]);

            logger.debug(
                `-- Round ${previousRounds.length} (Game ${thisGameId}) --`,
            );
            logger.debug(
                `Player 1's deck (${deck1.length}): ${deck1.join(",")}`,
            );
            logger.debug(
                `Player 2's deck (${deck2.length}): ${deck2.join(",")}`,
            );

            const card1 = deck1.shift()!;
            const card2 = deck2.shift()!;

            logger.debug(`Player 1 plays: ${card1}`);
            logger.debug(`Player 2 plays: ${card2}`);

            if (card1 <= deck1.length && card2 <= deck2.length) {
                const newD1 = deck1.filter((_, idx) => idx < card1);
                const newD2 = deck2.filter((_, idx) => idx < card2);
                const [d1] = play(newD1, newD2);

                if (d1.length > 0) {
                    deck1.push(card1);
                    deck1.push(card2);
                    logger.debug(
                        `Player 1 wins round ${previousRounds.length} of game ${thisGameId}!`,
                    );
                } else {
                    deck2.push(card2);
                    deck2.push(card1);
                    logger.debug(
                        `Player 2 wins round ${previousRounds.length} of game ${thisGameId}!`,
                    );
                }
            } else {
                if (card1 > card2) {
                    deck1.push(card1);
                    deck1.push(card2);
                    logger.debug(
                        `Player 1 wins round ${previousRounds.length} of game ${thisGameId}!`,
                    );
                } else {
                    deck2.push(card2);
                    deck2.push(card1);
                    logger.debug(
                        `Player 2 wins round ${previousRounds.length} of game ${thisGameId}!`,
                    );
                }
            }
        }

        return [deck1, deck2];
    };

    const [d1, d2] = play(deck1, deck2);

    if (d1.length > 0) {
        return calcDeckScore(d1);
    } else {
        return calcDeckScore(d2);
    }
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
