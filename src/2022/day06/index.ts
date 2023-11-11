const findStartMarker = (packets: Array<string>, distinctChars: number) => {
    for (let i = distinctChars; i < packets.length; ++i) {
        if (
            Array.from(new Set(packets.slice(i - distinctChars, i))).length ==
            distinctChars
        ) {
            return i;
        }
    }

    return Number.NaN;
};

export const part1 = (input: string): string => {
    return findStartMarker(input.split(""), 4).toString();
};

export const part2 = (input: string): string => {
    return findStartMarker(input.split(""), 14).toString();
};
