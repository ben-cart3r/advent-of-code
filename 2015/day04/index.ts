import md5 from "md5";

const bruteforce = (input: string, leadingZeroCount: number): string => {
    let i = 0;
    let found = false;

    while (i < 10000000 && !found) {
        const hash = md5(`${input}${i}`);
        let match = true;

        for (let j = 0; j < leadingZeroCount; ++j) {
            if (hash.charAt(j) != "0") {
                match = false
            }
        }

        if (match) {
            found = true;
        }
        else {
            i++;
        }
    }

    return i.toString()
}

export const part1 = (input: string): string => {
    return bruteforce(input, 5);
};

export const part2 = (input: string): string => {
    return bruteforce(input, 6);
};
