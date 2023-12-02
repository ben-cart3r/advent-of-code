import { compareArrays, inRange, isHex, isNumber } from "../../common";

type Passport = Map<string, string>;

const passportFields = ["byr", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];
const eyeColours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const parse = (input: string): Array<Passport> => {
    return input.split("\n\n").map((data) => {
        return data.split(/\s+/).reduce((acc, prop) => {
            const [key, value] = prop.split(":");

            if (key != "cid") {
                acc.set(key, value);
            }

            return acc;
        }, new Map() as Passport);
    });
};

const validateHeight = (height: string): boolean => {
    if (height.includes("cm")) {
        return inRange(
            parseInt(height.substring(0, height.indexOf("cm"))),
            150,
            193,
        );
    } else {
        return inRange(
            parseInt(height.substring(0, height.indexOf("in"))),
            59,
            76,
        );
    }
};

const validatePassport = (passport: Passport, part2: boolean): boolean => {
    const valid = compareArrays([...passport.keys()].sort(), passportFields);

    if (!part2 || !valid) {
        return valid;
    }

    if (!inRange(parseInt(passport.get("byr")!), 1920, 2002)) {
        return false;
    }

    if (!inRange(parseInt(passport.get("iyr")!), 2010, 2020)) {
        return false;
    }

    if (!inRange(parseInt(passport.get("eyr")!), 2020, 2030)) {
        return false;
    }

    if (!validateHeight(passport.get("hgt")!)) {
        return false;
    }

    if (!isHex(passport.get("hcl")!)) {
        return false;
    }

    if (!eyeColours.includes(passport.get("ecl")!)) {
        return false;
    }

    if (!(isNumber(passport.get("pid")!) && passport.get("pid")!.length == 9)) {
        return false;
    }

    return true;
};

const solver1 = (input: string): number => {
    const passports = parse(input);
    const validPassports = passports.filter((passport) =>
        validatePassport(passport, false),
    );

    return validPassports.length;
};

const solver2 = (input: string): number => {
    const passports = parse(input);
    const validPassports = passports.filter((passport) =>
        validatePassport(passport, true),
    );

    return validPassports.length;
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
