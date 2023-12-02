import { sum } from "../../common";

const parse = (input: string) => {
    return input
        .trim()
        .split("\n")
        .map((mass) => parseInt(mass));
};

const calculateFuelRequirements = (mass: number, part: string): number => {
    const initialRequirement = Math.floor(mass / 3) - 2;

    if (part == "p1") {
        return initialRequirement;
    } else {
        // Anything <= 6 returns 0: Math.floor(6 / 3) - 2 == 0
        if (mass > 6) {
            return (
                initialRequirement +
                calculateFuelRequirements(initialRequirement, "p2")
            );
        }
        return 0;
    }
};

export const part1 = (input: string) => {
    const masses = parse(input);
    const requiredFuels = masses.map((mass) =>
        calculateFuelRequirements(mass, "p1"),
    );
    const totalFuel = sum(...requiredFuels);

    return totalFuel.toString();
};

export const part2 = (input: string) => {
    const masses = parse(input);
    const requiredFuels = masses.map((mass) =>
        calculateFuelRequirements(mass, "p2"),
    );
    const totalFuel = sum(...requiredFuels);

    return totalFuel.toString();
};
