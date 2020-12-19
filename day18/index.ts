const parseInput = (input: string): Array<Array<string>> => {
    return input
        .trim()
        .split("\n")
        .map((line) =>
            line
                .trim()
                .split("")
                .filter((token) => token != " ")
        );
};

const infixToPostfix = (
    tokens: Array<string>,
    precedence: { [k: string]: number }
): Array<string> => {
    const postfix: Array<string> = [];
    const stack: Array<string> = [];

    while (tokens.length > 0) {
        const token = tokens.shift();

        if (!isNaN(parseInt(token))) {
            postfix.push(token);
        } else if (token == "(") {
            stack.push(token);
        } else if (token == ")") {
            while (stack.length > 0 && stack[stack.length - 1] != "(") {
                postfix.push(stack.pop());
            }

            // Remove "("
            stack.pop();
        } else {
            while (
                stack.length > 0 &&
                precedence[token] <= precedence[stack[stack.length - 1]]
            ) {
                postfix.push(stack.pop());
            }
            stack.push(token);
        }
    }

    while (stack.length > 0) {
        postfix.push(stack.pop());
    }

    return postfix;
};

const evaluatePostfix = (tokens: Array<string>): number => {
    const stack: Array<number> = [];

    while (tokens.length > 0) {
        const token = tokens.shift();

        if (!isNaN(parseInt(token))) {
            stack.push(parseInt(token));
        } else if (token == "*") {
            const v1 = stack.pop();
            const v2 = stack.pop();

            stack.push(v1 * v2);
        } else if (token == "+") {
            const v1 = stack.pop();
            const v2 = stack.pop();

            stack.push(v1 + v2);
        }
    }

    return stack.pop();
};

const solver1 = (input: string): number => {
    const lines = parseInput(input);

    return sum(
        lines.map((tokens) =>
            evaluatePostfix(
                infixToPostfix(tokens, {
                    "+": 1,
                    "*": 1,
                })
            )
        )
    );
};

const sum = (xs: Array<number>): number => xs.reduce((acc, x) => acc + x, 0);

const solver2 = (input: string): number => {
    const lines = parseInput(input);

    return sum(
        lines.map((tokens) =>
            evaluatePostfix(
                infixToPostfix(tokens, {
                    "+": 2,
                    "*": 1,
                })
            )
        )
    );
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
