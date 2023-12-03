import fs from "fs/promises";
import path from "path";
import yargs from "yargs";

const runSolution = async (year: number, day: number, fileName: string) => {
    const dirName = day < 10 ? `day0${day}` : `day${day}`;
    const dirPath = `./${year}/${dirName}`;
    const dataPath = path.join(__dirname, `${dirPath}/${fileName}`);

    console.log(`-----------\nYear ${year} Day ${day}\n-----------`);
    console.time("File load time\t\t");
    const data = await fs.readFile(dataPath, "utf8");
    console.timeEnd("File load time\t\t");

    console.time("Solution load time\t");
    const solution = await import(dirPath);
    console.timeEnd("Solution load time\t");

    console.time("Solution run time\t");

    const output1 = solution.part1(data);
    const output2 = solution.part2(data);

    console.timeEnd("Solution run time\t");
    console.log("");
    console.log("Results:");
    console.log(`Part 1 result: ${output1}`);
    console.log(`Part 2 result: ${output2}`);
};

const getActiveYear = () => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // December: return current year
    if (currentMonth == 11) {
        return currentYear.toString();
    }

    // January - November: return last year
    return (currentYear - 1).toString();
};

(async () => {
    const options = yargs(process.argv.slice(2))
        .usage("Usage: $0 -y <year> -d <day>")
        .option("year", {
            alias: "y",
            describe: "Year",
            type: "string",
            default: getActiveYear(),
        })
        .option("day", {
            alias: "d",
            describe: "Day",
            type: "string",
            demandOption: true,
        })
        .option("input", {
            alias: "i",
            describe: "Input File",
            type: "string",
            default: "input.txt",
        })
        .parseSync();

    await runSolution(
        parseInt(options.year),
        parseInt(options.day),
        options.input,
    );
})();
