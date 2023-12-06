import { product, range, zip } from "../../common";
import { toNumber } from "../../common/string-helpers";

type Race = [duration: number, recordDistance: number];

const parseNumbersFromLine = (input: string) => {
  return input.split(":").at(1)!.trim().split(/\s+/).map(toNumber);
};

const parse = (input: string): Array<Race> => {
  const [times, distances] = input.split("\n");

  return zip(parseNumbersFromLine(times), parseNumbersFromLine(distances)) as Array<Race>;
};

const calcTravelDistance = (raceDuration: number, pressDuration: number) => {
  return (raceDuration - pressDuration) * pressDuration;
};

const calcWinningScenarios = ([raceDuration, recordDistance]: Race) => {
  return range(0, raceDuration).filter(
    pressDuration => calcTravelDistance(raceDuration, pressDuration) > recordDistance,
  ).length;
};

export const part1 = (input: string): string => {
  const races = parse(input);
  const winningScenarios = races.map(calcWinningScenarios).filter(wins => wins > 0);

  return product(...winningScenarios).toString();
};

export const part2 = (input: string): string => {
  const races = parse(input);
  const duration = races.map(([duration]) => duration.toString()).join("");
  const distance = races.map(([, distance]) => distance.toString()).join("");
  const winningScenarios = calcWinningScenarios([parseInt(duration), parseInt(distance)]);

  return winningScenarios.toString();
};
