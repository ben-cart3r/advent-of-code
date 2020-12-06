const parsePassport = (input: string): { [k: string]: string } => {
    return input
        .split("\n")
        .join(" ")
        .split(" ")
        .reduce((acc, field) => {
            const [key, value] = field.split(":");

            return {
                ...acc,
                [key]: value,
            };
        }, {});
};

const parsePassports = (input: string): Array<string> => {
    return input.split("\n\n");
};

const parseHeight = (height: string): [string, string] => {
    if (height.indexOf("cm") > -1) {
        return [height.substring(0, height.indexOf("cm")), "cm"];
    } else {
        return [height.substring(0, height.indexOf("in")), "in"];
    }
};

const inRange = (val: string, lLimit: number, uLimit: number) => {
    return parseInt(val) >= lLimit && parseInt(val) <= uLimit;
};

const solver1 = (input: string): number => {
    const passports = parsePassports(input).map(parsePassport);
    const required = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

    return passports.reduce((acc, passport) => {
        const keys = Object.keys(passport);
        const valid = required.every((field) => keys.includes(field));

        return valid ? acc + 1 : acc;
    }, 0);
};

const solver2 = (input: string): number => {
    const passports = parsePassports(input).map(parsePassport);
    const required = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

    return passports.reduce((acc, passport) => {
        const keys = Object.keys(passport);
        const hasRequired = required.every((field) => keys.includes(field));

        // Early return if missing a field
        if (!hasRequired) {
            return acc;
        }

        const validBirthYear = inRange(passport.byr, 1920, 2002);
        const validIssueYear = inRange(passport.iyr, 2010, 2020);
        const validExpiryYear = inRange(passport.eyr, 2020, 2030);

        const [height, unit] = parseHeight(passport.hgt);
        const validHeight =
            unit == "cm" ? inRange(height, 150, 193) : inRange(height, 59, 76);

        const validHairColour =
            passport.hcl.match(/^#(?:[0-9a-fA-F]{6})$/) != null;

        const validEyeColour = [
            "amb",
            "blu",
            "brn",
            "gry",
            "grn",
            "hzl",
            "oth",
        ].includes(passport.ecl);

        const validPassportId =
            !isNaN(parseInt(passport.pid)) && passport.pid.length == 9;

        if (
            validBirthYear &&
            validIssueYear &&
            validExpiryYear &&
            validHeight &&
            validHairColour &&
            validEyeColour &&
            validPassportId
        ) {
            return acc + 1;
        }

        return acc;
    }, 0);
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
