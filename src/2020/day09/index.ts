const sum = (numbers: Array<number>) => {
    return numbers.reduce((acc, number) => acc + number, 0);
};

class XMASDecoder {
    preamble: number;
    numbers: Array<number>;

    constructor(input: string, preamble: number) {
        this.preamble = preamble;
        this.numbers = input
            .trim()
            .split("\n")
            .map((num) => parseInt(num));
    }

    findWeakPoint(): number {
        const preamble = this.preamble;
        const numbers = this.numbers;
        for (let i = this.preamble; i < numbers.length; ++i) {
            const target = numbers[i];
            const previous = numbers.slice(i - preamble, i);

            let valid = false;

            for (let j = 0; j < previous.length; ++j) {
                for (let k = 0; k < previous.length; ++k) {
                    if (j != k) {
                        valid = valid || previous[j] + previous[k] == target;
                    }
                }
            }

            if (!valid) {
                return target;
            }
        }
        return 0;
    }

    findEncryptionWeakness(): number {
        const numbers = this.numbers;
        const weakPoint = this.findWeakPoint();

        let idx = 0;
        let step = 0;
        let total = 0;

        while (idx < numbers.length) {
            step = 0;
            total = 0;

            const range = [];

            while (idx + step < numbers.length && total <= weakPoint) {
                total += numbers[idx + step];
                range.push(numbers[idx + step]);
                step++;
            }

            range.pop();

            if (sum(range) == weakPoint) {
                return Math.min(...range) + Math.max(...range);
            }

            idx++;
        }
        return 0;
    }
}

const solver1 = (input: string, preamble: number): number => {
    const xmasDecoder = new XMASDecoder(input, preamble);

    return xmasDecoder.findWeakPoint();
};

const solver2 = (input: string, preamble: number): number => {
    const xmasDecoder = new XMASDecoder(input, preamble);

    return xmasDecoder.findEncryptionWeakness();
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input, 25);
    const result2 = solver2(input, 25);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
