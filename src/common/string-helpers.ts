export const isNotEmptyString = (input: string) => {
    return input != "";
};

// Wrap parseInt in a function that can be used in a .map
export const toNumber = (input: string) => {
    return parseInt(input);
};
