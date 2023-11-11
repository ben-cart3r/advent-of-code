const parseInput = (input: string): Array<number> => {
    const xs = input
        .trim()
        .split("\n")
        .map((i) => parseInt(i))
        .sort((a, b) => a - b);

    xs.unshift(0);
    xs.push(Math.max(...xs) + 3);

    return xs;
};

const solver1 = (input: string): number => {
    const adaptors = parseInput(input);
    let n1s = 0;
    let n3s = 0;

    for (let i = 1; i < adaptors.length; ++i) {
        if (adaptors[i] - adaptors[i - 1] == 1) {
            n1s++;
        }

        if (adaptors[i] - adaptors[i - 1] == 3) {
            n3s++;
        }
    }

    return n1s * n3s;
};

// Dynamic programming, only solved after looking at other solutions :(
const solver2 = (input: string): number => {
    const adaptors = parseInput(input);
    const seen: { [k: number]: number } = {};

    const dp = (i: number) => {
        if (i == adaptors.length - 1) {
            return 1;
        }

        if (seen[i]) {
            return seen[i];
        }

        let res = 0;

        for (let j = i + 1; j < adaptors.length; ++j) {
            if (adaptors[j] - adaptors[i] <= 3) {
                res += dp(j);
            }
        }

        seen[i] = res;
        return res;
    };

    return dp(0);
};

// Brute force (BFS) - bad, bad, bad. Works for samples but too slow for input
// const solver2BFS = (input: string): number => {
//     const adaptors = parseInput(input);
//     const maxRating = Math.max(...adaptors) + 3;
//     const validPaths: Array<Array<number>> = [];
//     const queue = [[0]];
//     const visited = [[0]];

//     const isVisited = (path: number[]): boolean => {
//         const found = visited.find((testPath) => {
//             return (
//                 testPath.length == path.length &&
//                 testPath.every((val, idx) => val == path[idx])
//             );
//         });
//         return found != undefined;
//     };

//     while (queue.length > 0) {
//         const path = queue.shift();
//         const last = path[path.length - 1];

//         if (last + 3 == maxRating) {
//             validPaths.push(path);
//         } else {
//             for (let i = 0; i < adaptors.length; ++i) {
//                 if (
//                     !path.includes(adaptors[i]) &&
//                     adaptors[i] - last <= 3 &&
//                     adaptors[i] - last >= 0
//                 ) {
//                     if (!isVisited([...path, adaptors[i]])) {
//                         visited.push([...path, adaptors[i]]);
//                         queue.push([...path, adaptors[i]]);
//                     }
//                 }
//             }
//         }
//     }

//     return validPaths.length;
// };

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
