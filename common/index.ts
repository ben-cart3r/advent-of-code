import winston from "winston";

export const compareArrays = <T>(a: Array<T>, b: Array<T>): boolean => {
    return a.length === b.length && a.every((item, index) => item === b[index]);
};

export const createLogger = (logLevel: string): winston.Logger => {
    return winston.createLogger({
        level: logLevel,
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            }),
        ],
    });
};

export const difference = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
    return new Set([...set1].filter((item) => !set2.has(item)));
};

export const flatten = <T>(input: Array<Array<T>>): Array<T> => {
    return input.reduce((acc, row) => [...acc, ...row], [] as Array<T>);
};

export const inRange = (x: number, min: number, max: number): boolean => {
    if (isNaN(x)) {
        return false;
    }

    return x >= min && x <= max;
};

export const intersect = <T>(...args: Array<Set<T>>): Set<T> => {
    return args.reduce((acc, set) => {
        if (acc == null) {
            return set;
        }
        return new Set([...acc].filter((item) => set.has(item)));
    }, null as Set<T>);
};

export const isHex = (value: string): boolean => {
    return value.match(/^#(?:[0-9a-fA-F]{6})$/) != null;
};

export const isNumber = (input: string): boolean => {
    return !isNaN(parseInt(input));
};

export const product = (...args: Array<number>): number => {
    return args.reduce((acc, num) => acc * num, 1);
};

export const sum = (...args: Array<number>): number => {
    return args.reduce((acc, num) => acc + num, 0);
};

export const union = <T>(...args: Array<Set<T>>): Set<T> => {
    return args.reduce((acc, set) => new Set([...acc, ...set]), new Set<T>());
};

export const unique = <T>(arr: Array<T>): Array<T> => {
    return [...new Set([...arr])];
};

export const xor = (a: boolean, b: boolean): boolean => {
    return Boolean(+a ^ +b);
};

export const parseAsIntegers = (input: string) => {
    return input.split("\n").map((int) => parseInt(int));
};

export const subset = <T>(arr1: Array<T>, arr2: Array<T>) => {
    return arr1.every((item) => arr2.includes(item));
};

export const count = <T>(arr: Array<T>, item: T) => {
    return arr.filter((i) => i === item).length;
};
