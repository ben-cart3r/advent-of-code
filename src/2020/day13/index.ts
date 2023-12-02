const parseInput = (input: string) => {
    const parts = input.trim().split("\n");

    return {
        timestamp: parseInt(parts[0]),
        busIds: parts[1].split(","),
    };
};

const solver1 = (input: string): number => {
    const { timestamp, busIds } = parseInput(input);

    const nextArrivals = busIds.reduce(
        (acc, busId) => {
            if (busId == "x") {
                return acc;
            }

            const id = parseInt(busId);
            const t = timestamp - (timestamp % id);

            return [
                ...acc,
                {
                    id,
                    time: t + id,
                },
            ];
        },
        [] as Array<{ id: number; time: number }>,
    );

    const nextArrival = nextArrivals.sort((a, b) => {
        if (a.time > b.time) {
            return 1;
        }

        if (b.time > a.time) {
            return -1;
        }

        return 0;
    })[0];

    return (nextArrival.time - timestamp) * nextArrival.id;
};

/*
    Chinese remainder theorem:
        Let N be the product of the bus IDs.
        There is exactly 1 timestamp where 0<=t<=N that satisfies the constraints.
            e.g.
            (t + 1) % 67 == 0
            (t + 2) % 7 == 0
            (t + 3) % 59 == 0
            (t + 4) % 61 == 0

        Solve for x where "x % ni == ai" for all i
*/

const modInverse = (a: bigint, mod: bigint) => {
    a %= mod;
    for (let i = BigInt("1"); i < mod; ++i) {
        if ((a * i) % mod == BigInt("1")) {
            return i;
        }
    }
    return BigInt("0");
};

const solver2 = (input: string): bigint => {
    const { busIds } = parseInput(input);

    const initial: Array<[number, number]> = [];

    const numbers = busIds.reduce<Array<[number, number]>>((acc, id, i) => {
        if (id == "x") {
            return acc;
        }
        const bus = parseInt(id);
        const idx = i % bus;
        return [
            ...acc,
            [
                bus,
                //modulo(-i, bus)
                (bus - idx) % bus,
            ],
        ];
    }, initial);

    // Product of bus ids
    const N = numbers.reduce((acc, bus) => (acc *= BigInt(bus[0])), BigInt(1));
    let ans = BigInt("0");

    for (let i = 0; i < numbers.length; ++i) {
        const [bus, idx] = numbers[i];
        const ni = N / BigInt(bus);
        const mi = modInverse(ni, BigInt(bus));
        ans += BigInt(idx) * mi * ni;
    }

    return ans % BigInt(N);
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1.toString()}
    \t Part 2 result: ${result2.toString()}`;
};
