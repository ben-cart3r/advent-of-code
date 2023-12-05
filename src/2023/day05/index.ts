import { chunks, inRange } from "../../common";
import { toNumber } from "../../common/string-helpers";

const parseSeeds = (input: string) => {
  const [, numbers] = input.split(":");

  return numbers.trim().split(" ").map(toNumber);
};

const parseMap = (input: string) => {
  const [header, ...maps] = input.split("\n");
  const headerParts = header.split(" ").at(0)!.split("-");

  return {
    from: headerParts[0],
    to: headerParts[2],
    maps: maps.map(line => line.split(" ").map(toNumber)),
  };
};

const parseMaps = (inputs: Array<string>) => {
  return inputs.map(parseMap);
};

const parse = (input: string) => {
  const [seeds, ...maps] = input.trim().split("\n\n");

  return {
    seeds: parseSeeds(seeds),
    maps: parseMaps(maps),
  };
};

export const part1 = (input: string): string => {
  const parsed = parse(input);

  const values = parsed.seeds.map(seed => {
    let type = "seed";
    while (type != "location") {
      let hasChanged = false;
      const mapper = parsed.maps.find(map => map.from == type)!;

      // console.log(`From: ${mapper.from}, To: ${mapper.to}`);
      for (const [dest, source, range] of mapper.maps) {
        // console.log(`From: ${source}, To: ${source + range}, value: ${seed}`);
        if (inRange(seed, source, source + range) && !hasChanged) {
          // inclusive or exclusive?
          // console.log(`New Value: ${dest + (seed - source)}`);
          seed = dest + (seed - source);
          hasChanged = true;
        }
      }

      type = mapper.to;
    }
    // console.log("");
    return seed;
  });

  return Math.min(...values).toString();
};

export const part2 = (input: string): string => {
  const parsed = parse(input);
  const ranges = chunks(parsed.seeds, 2);

  const values = ranges.map(([min, range]) => {
    console.log(`Seed Range: ${min} - ${min + range}`);
    const seeds = Array.from({ length: range }, (_, i) => i + min);
    console.log(`Created array`);
    const v = seeds.map(seed => {
      let type = "seed";
      while (type != "location") {
        let hasChanged = false;
        const mapper = parsed.maps.find(map => map.from == type)!;

        // console.log(`From: ${mapper.from}, To: ${mapper.to}`);
        for (const [dest, source, range] of mapper.maps) {
          // console.log(`From: ${source}, To: ${source + range}, value: ${seed}`);
          if (inRange(seed, source, source + range) && !hasChanged) {
            // inclusive or exclusive?
            // console.log(`New Value: ${dest + (seed - source)}`);
            seed = dest + (seed - source);
            hasChanged = true;
          }
        }

        type = mapper.to;
      }

      // console.log("");
      return seed;
    });

    return Math.min(...v);
  });

  return Math.min(...values).toString();
};
