import winston from "winston";

export const compareArrays = <T>(a: Array<T>, b: Array<T>): boolean => {
    return a.length === b.length && a.every((item, index) => item === b[index]);
}

export const createLogger = (logLevel: string): winston.Logger => {
    return winston.createLogger({
        level: logLevel,
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            })
        ],
    });
};

export const difference = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
    return new Set([...set1].filter(item => !set2.has(item)));
}

export const intersect = <T>(...args: Array<Set<T>>): Set<T> => {
    return args.reduce(
        (acc, set) => {
            if (acc == null) {
                return set;
            }
            return new Set([...acc].filter(item => set.has(item)))
        }, 
        null as Set<T>
    );
}

export const product = (...args: Array<number>): number => {
    return args.reduce((acc, num) => acc * num, 1);
}

export const sum = (...args: Array<number>): number => {
    return args.reduce((acc, num) => acc + num, 0);
}

export const union = <T>(...args: Array<Set<T>>): Set<T> => {
    return args.reduce(
        (acc, set) => new Set([...acc, ...set]), 
        new Set<T>()
    );
}

export const unique = <T>(arr: Array<T>): Array<T> => {
    return [...(new Set([...arr]))];
}
