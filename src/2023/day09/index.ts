import { last, sum } from "../../common";
import { newLineRegex, splitByWhitespace, toNumbers } from "../../common/string-helpers";

type Sequence = {
  numbers: Array<number>;
  differences: Array<Array<number>>;
};

const getDifferences = (sequence: Array<number>): Array<Array<number>> => {
  const layer = sequence.reduce((acc, value, index) => {
    if (index != sequence.length - 1) {
      acc.push(sequence[index + 1] - value);
    }
    return acc;
  }, [] as Array<number>);

  if (layer.every(value => value == 0)) {
    return [layer];
  }

  return [layer, ...getDifferences(layer)];
};

const parseSequence = (numbers: Array<number>): Sequence => {
  return {
    numbers,
    differences: getDifferences(numbers),
  };
};

const parse = (input: string) => {
  return input.trim().split(newLineRegex).map(splitByWhitespace).map(toNumbers).map(parseSequence);
};

const forecast = (sequence: Sequence): number => {
  let delta = 0;

  for (let i = sequence.differences.length - 1; i >= 0; --i) {
    delta += last(sequence.differences[i]);
  }

  return last(sequence.numbers) + delta;
};

const backcast = (sequence: Sequence): number => {
  let delta = 0;

  for (let i = sequence.differences.length - 2; i >= 0; --i) {
    delta = sequence.differences[i][0] - delta;
  }

  return sequence.numbers[0] - delta;
};

export const part1 = (input: string): string => {
  const parsed = parse(input);
  const predictions = parsed.map(forecast);

  return sum(...predictions).toString();
};

export const part2 = (input: string): string => {
  const parsed = parse(input);
  const predictions = parsed.map(backcast);

  return sum(...predictions).toString();
};
