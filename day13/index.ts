const parseInput = (input: string) => {
    const parts = input.trim().split("\n");

    return {
        timestamp: parseInt(parts[0]),
        busIds: parts[1].split(",")
    }
}


const solver1 = (input: string): number => {
    const {timestamp, busIds} = parseInput(input);

    const nextArrivals = busIds.reduce((acc, busId) => {
        if(busId == "x") {
            return acc;
        }
        
        const id = parseInt(busId);
        const t = timestamp - (timestamp % id);

        return [
            ...acc,
            {
                id,
                time: t + id
            }
        ]
    }, []);

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

// Probably works but takes too long
const solver2 = (input: string): number => {
    const {busIds} = parseInput(input);
    let t = 0;
    let valid = false;

    while (!valid) {
        valid = busIds.reduce((acc, busId, idx) => {
            if (busId == "x") {
                return acc;
            }

            const id = parseInt(busId);

            return acc && (t + idx) % id == 0;

        }, true);

        t++;
    }

    return t-1;
    
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
