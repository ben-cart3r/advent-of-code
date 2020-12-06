// Count unique chars
const uniqChars = (input: string): number => {
    return new Set(input.split("\n").join("")).size;
};

const solver1 = (input: string): number => {
    const groups = input.split("\n\n");
    return groups.reduce((acc, group) => {
        return acc + uniqChars(group);
    }, 0);
};

const solver2 = (input: string): number => {
    const groups = input.trim().split("\n\n");

    return groups.reduce((acc, group) => {
        const people = group.split("\n").length;
        const questions = group.split("\n")[0].split("");

        const allAnswered = questions.filter((question) => {
            const matches = group.match(new RegExp(question, "g"));
            return matches && matches.length == people;
        });

        return acc + allAnswered.length;
    }, 0);
};

export { solver1, solver2 };

export default (input: string): void => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    console.log(`\t Part 1 result: ${result1}`);
    console.log(`\t Part 2 result: ${result2}`);
};
