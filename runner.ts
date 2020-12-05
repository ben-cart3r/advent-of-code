import fs from "fs/promises";
import path from "path";
import yargs from "yargs";

import day01 from "./day01";
import day02 from "./day02";
import day03 from "./day03";
import day04 from "./day04";
import day05 from "./day05";

const solutions = [day01, day02, day03, day04, day05];

const loadData = async (rawDay: number): Promise<string> => {
    const day = rawDay < 10 ? `0${rawDay}` : rawDay;
    const filePath = path.join(__dirname, `day${day}/data.txt`);
    return await fs.readFile(filePath, { encoding: "utf8" });
};

(async () => {
    const options = yargs(process.argv.slice(2))
        .usage("Usage: $0 -d <day>")
        .option("day", {
            alias: "d",
            describe: "Day",
            type: "string",
            demandOption: true,
        }).argv;

    const day = parseInt(options.day);
    const rawData = await loadData(day);
    const solution = solutions[day - 1];

    console.log(`Running Day ${day} solutions`);
    console.time(`Day ${day} complete, elapsed time`);

    solution(rawData);

    console.timeEnd(`Day ${day} complete, elapsed time`);
})();
