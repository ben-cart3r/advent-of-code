const parse = (input: string): Array<string> => {
    return input.split('');
}

export const part1 = (input: string): string => {
    const chars = parse(input);
    
    const leftParenthesisCount = chars.filter((c) => c == '(').length;
    const rightParenthesisCount = chars.length - leftParenthesisCount;

    return (leftParenthesisCount - rightParenthesisCount).toString();
}

export const part2 = (input: string): string => {
    const chars = parse(input);

    let floor = 0;
    let position = 0;

    while (floor >= 0 && position < chars.length) {
        if (chars[position] == '(') {
            floor++;
        }
        else {
            floor--;
        }

        position++;
    }

    return position.toString();
};
