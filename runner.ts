import fs from "fs/promises";
import path from "path";
import yargs from "yargs";

const runSolution = async (year: number, day: number) => {
    const dirName = day < 10 ? `./day0${day}` : `./day${day}`;
    const dirPath = `${year}/${dirName}`;
    const dataPath = path.join(__dirname, `${dirPath}/data.txt`);

    console.log(`-----------\nYear ${year} Day ${day}\n-----------`);
    console.time("File load time");

    const data = await fs.readFile(dataPath, "utf8");
    const solution = await import(dirPath);

    console.timeEnd("File load time");
    console.time("Solution run time");

    const output = solution.default(data);

    console.timeEnd("Solution run time");
    console.log("Results:");
    console.log(output);
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
        }).argv;

    await runSolution(parseInt(options.year), parseInt(options.day));
})();
