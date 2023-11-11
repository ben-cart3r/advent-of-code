import { desc } from "../../common/sorting";
import Input from "../../common/input";

type Blueprint = {
    id: number;
    robots: Array<Robot>;
};

type MaterialType = "ore" | "clay" | "obsidian" | "geode";

type MaterialCost = {
    type: MaterialType;
    amount: number;
};

type Robot = {
    type: MaterialType;
    costs: Array<MaterialCost>;
};

const trimFullStop = (str: string): string => {
    if (str.indexOf(".") > -1) {
        return str.substring(0, str.length - 1);
    }
    return str;
};

const createRobot = (material: string, costs: Array<MaterialCost>): Robot => {
    if (
        material == "ore" ||
        material == "clay" ||
        material == "obsidian" ||
        material == "geode"
    ) {
        return {
            type: material,
            costs,
        };
    }

    throw new Error(`Unknown material type: ${material}`);
};

const createMaterialCost = (material: string, amount: string): MaterialCost => {
    if (
        material == "ore" ||
        material == "clay" ||
        material == "obsidian" ||
        material == "geode"
    ) {
        return {
            type: material,
            amount: parseInt(amount),
        };
    }

    throw new Error(`Unknown material type: ${material}`);
};

const parse = (input: string): Array<Blueprint> => {
    return new Input(input)
        .asLines()
        .asStrings()
        .map((line) => {
            const [blueprint, robots] = line.split(": ");
            const id = blueprint.substring("Blueprint ".length);

            return {
                id: parseInt(id),
                robots: robots.split(". ").map((robot) => {
                    const words = trimFullStop(robot).split(" ");

                    if (words.length == 6) {
                        const materialCost = createMaterialCost(
                            words[5],
                            words[4]
                        );
                        return createRobot(words[1], [materialCost]);
                    } else {
                        const materialCosts = [
                            createMaterialCost(words[5], words[4]),
                            createMaterialCost(words[8], words[7]),
                        ];
                        return createRobot(words[1], materialCosts);
                    }
                }),
            };
        });
};

export const part1 = (input: string): string => {
    const blueprints = parse(input);

    const results = blueprints.slice(0,1).map((blueprint) => {
        let counter = 0;
        const inventory = new Map<MaterialType, number>([
            ["ore", 0],
            ["clay", 0],
            ["obsidian", 0],
            ["geode", 0],
        ]);
        const robots: Array<Robot> = [{ type: "ore", costs: [] }];

        while (counter < 24) {
            console.log(`Turn: ${counter}`)

            const newRobots = blueprint.robots.filter((robot) => {
                const buildable = robot.costs.reduce(
                    (acc, { type, amount }) =>
                        acc && inventory.get(type) >= amount,
                    true
                );

                if (buildable) {
                    for (const { type, amount } of robot.costs) {
                        inventory.set(type, inventory.get(type) - amount);
                    }
                    return true;
                }

                return false;
            });

            for (const robot of robots) {
                // console.log(`Mined 1 of type ${robot.type}`);
                inventory.set(robot.type, inventory.get(robot.type) + 1);
            }

            for (const robot of newRobots) {
                robots.push(robot);
                console.log(`Built robot of type ${robot.type}`);
            }

            counter++;
        }

        console.log(inventory)
        // console.log(blueprint.id);
        // console.log(blueprint.id * inventory.get("geode"));

        return blueprint.id * inventory.get("geode");
    });

    console.log(results);

    return results.sort(desc).at(0).toString();
};

export const part2 = (input: string): string => {
    const parsed = parse(input);
    return "";
};
