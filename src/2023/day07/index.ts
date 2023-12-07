import { frequencies, sum } from "../../common";
import Input from "../../common/input";

const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"] as const;

type Card = (typeof cards)[number];

type PokerHand = {
  cards: Array<Card>;
  bet: number;
  strength: number;
};
type CardStrengthCalculator = (card: Card) => number;
type HandStrengthCalculator = (cards: Array<Card>) => number;

const calcHandStrength = (cards: Array<Card>): number => {
  const cardCounts = frequencies(cards);
  const uniqueCards = Object.keys(cardCounts).length;

  let card: Card;
  for (card in cardCounts) {
    if (cardCounts[card] == 5) {
      return 7; // five of a kind
    }

    if (cardCounts[card] == 4) {
      return 6; // four of a kind
    }

    if (cardCounts[card] == 3 && uniqueCards == 2) {
      return 5; // full house
    }

    if (cardCounts[card] == 3 && uniqueCards == 3) {
      return 4; // three of a kind
    }

    if (cardCounts[card] == 2 && uniqueCards == 3) {
      return 3; // two pair
    }

    if (cardCounts[card] == 2 && uniqueCards == 4) {
      return 2; // pair
    }
  }

  return 1; // high card
};

const calculateCardStrength = (useJokers: boolean) => (card: Card) => {
  return useJokers && card == "J" ? -1 : cards.indexOf(card);
};

const calcBestScore = (cards: Array<Card>): number => {
  if (cards.includes("J")) {
    const index = cards.indexOf("J");
    const scores = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2"].map(card => {
      const newCards = [...cards];
      newCards.splice(index, 1, card as Card);
      return calcBestScore(newCards);
    });
    return Math.max(...scores);
  }
  return calcHandStrength(cards);
};

const parse = (input: string, calculateStrength: HandStrengthCalculator): Array<PokerHand> => {
  return new Input(input)
    .asLines()
    .asStrings()
    .map(line => {
      const [cards, bet] = line.split(/\s+/);
      const characters = cards.split("");

      return {
        cards: characters as Array<Card>,
        bet: parseInt(bet),
        strength: calculateStrength(characters as Array<Card>),
      };
    });
};

const tieBreaker = (hand1: PokerHand, hand2: PokerHand, calculateStrength: CardStrengthCalculator): number => {
  for (let i = 0; i < hand1.cards.length; ++i) {
    const card1Strength = calculateStrength(hand1.cards[i]);
    const card2Strength = calculateStrength(hand2.cards[i]);
    if (card1Strength > card2Strength) {
      return 1;
    }
    if (card1Strength < card2Strength) {
      return -1;
    }
  }

  return 0;
};

const comparePokerHands = (hand1: PokerHand, hand2: PokerHand, calculateCardStrength: CardStrengthCalculator) => {
  if (hand1.strength == hand2.strength) {
    return tieBreaker(hand1, hand2, calculateCardStrength);
  }

  return hand1.strength > hand2.strength ? 1 : hand1.strength < hand2.strength ? -1 : 0;
};

export const part1 = (input: string): string => {
  const parsed = parse(input, calcHandStrength);
  const sorted = parsed.sort((a, b) => comparePokerHands(a, b, calculateCardStrength(false)));
  const values = sorted.map((hand, index) => hand.bet * (index + 1));

  return sum(...values).toString();
};

export const part2 = (input: string): string => {
  const parsed = parse(input, calcBestScore);
  const sorted = parsed.sort((a, b) => comparePokerHands(a, b, calculateCardStrength(true)));
  const values = sorted.map((hand, index) => hand.bet * (index + 1));

  return sum(...values).toString();
};
