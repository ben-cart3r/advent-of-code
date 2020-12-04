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

const parseHeight = (height: string): [number, string] => {
    if (height.indexOf("cm") > -1) {
        return [parseInt(height.substring(0, height.indexOf("cm"))), "cm"];
    } else {
        return [parseInt(height.substring(0, height.indexOf("in"))), "in"];
    }
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

        const validBirthYear =
            parseInt(passport.byr) >= 1920 && parseInt(passport.byr) <= 2002;

        const validIssueYear =
            parseInt(passport.iyr) >= 2010 && parseInt(passport.iyr) <= 2020;

        const validExpiryYear =
            parseInt(passport.eyr) >= 2020 && parseInt(passport.eyr) <= 2030;

        const [height, unit] = parseHeight(passport.hgt);
        const validHeight =
            unit == "cm"
                ? height >= 150 && height <= 193
                : height >= 59 && height <= 76;

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

export default (input: string): void => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    console.log(`\t Part 1 result: ${result1}`);
    console.log(`\t Part 2 result: ${result2}`);
};
