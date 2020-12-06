import fs from "fs/promises";
import path from "path";
import yargs from "yargs";

const runSolution = async (day: number) => {
    const dirPath = day < 10 ? `./day0${day}` : `./day${day}`;
    const dataPath = path.join(__dirname, `${dirPath}/data.txt`);

    console.log(`-----------\nDay ${day}\n-----------`);
    console.time("File load time");

    const data = await fs.readFile(dataPath, "utf8");
    const solution = await import(dirPath);

    console.timeEnd("File load time");
    console.time("Solution run time");

    const output = solution.default(data);

    console.timeEnd("Solution run time");
    console.log("Results:");
    console.log(output);
}

(async () => {
    const options = yargs(process.argv.slice(2))
        .usage("Usage: $0 -d <day>")
        .option("day", {
            alias: "d",
            describe: "Day",
            type: "string",
            demandOption: true,
        }).argv;

    await runSolution(parseInt(options.day));
})();
