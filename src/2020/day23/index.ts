type Node<T> = {
    data: T;
    next?: Node<T>;
    prev?: Node<T>;
};

class IndexableLinkedList<T> {
    index: Map<T, Node<T>> = new Map();

    append(prev: Node<T>, data: T) {
        if (prev == null) {
            const node: Node<T> = {
                data: data,
                next: undefined,
                prev: undefined,
            };

            node.next = node;
            node.prev = node;

            this.index.set(data, node);
            return node;
        } else {
            const node: Node<T> = {
                data,
                next: prev.next,
                prev: prev,
            };

            prev.next = node;
            node.next!.prev = node;
            this.index.set(data, node);
            return node;
        }
    }

    find(data: T) {
        return this.index.get(data);
    }

    erase(node: Node<T>) {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;

        this.index.delete(node.data);
    }
}

const solver1 = (input: string): string => {
    const list = new IndexableLinkedList<number>();
    const cups = parse(input);

    // Initialise the linked list
    // @ts-expect-error - can be fixed later
    let prev: Node<number> = undefined;
    for (let i = 0; i < cups.length; ++i) {
        prev = list.append(prev, cups[i]);
    }

    let currentValue = cups[0];
    let currentNode = list.find(currentValue);

    for (let i = 0; i < 100; ++i) {
        const picked: Array<number> = [];

        for (let i = 0; i < 3; ++i) {
            picked.push(currentNode!.next!.data);
            list.erase(currentNode!.next!);
        }

        let dest = currentValue == 1 ? cups.length : currentValue - 1;

        while (picked.includes(dest)) {
            dest = dest == 1 ? cups.length : dest - 1;
        }

        //console.log(dest);

        let dest_node = list.find(dest)!;

        for (let i = 0; i < 3; ++i) {
            dest_node = list.append(dest_node, picked[i]);
        }

        currentNode = currentNode!.next;
        currentValue = currentNode!.data;
    }

    let activeNode = list.find(1);
    const out = [];

    while (activeNode!.next!.data != 1) {
        out.push(activeNode!.next!.data);
        activeNode = activeNode!.next;
    }

    return out.join("");
};

const parse = (input: string): Array<number> => {
    return input.split("").map((cup) => parseInt(cup));
};

// Insert array "b" into array "a" at point "index"
const insert = <T>(a: Array<T>, index: number, b: Array<T>): Array<T> => {
    return [...a.slice(0, index), ...b, ...a.slice(index)];
};

// Removes elements from an array, returns removed elements
// Similar to Array.splice
const circularSplice = (
    input: Array<number>,
    start: number,
    length: number,
): Array<number> => {
    const out = [];

    for (let i = 0; i < length; ++i) {
        if (start + 1 < input.length) {
            out.push(...input.splice(start + 1, 1));
        } else {
            out.push(...input.splice(0, 1));
        }
    }

    return out;
};

// Shift array contents left, fallen elements get added to the end
// e.g. shiftLeft([0, 1, 2, 3], 1) => [1, 2, 3, 0]
const shiftLeft = <T>(input: Array<T>, count: number): Array<T> => {
    return [...input.slice(count), ...input.slice(0, count)];
};

// @ts-expect-error - can be fixed later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const solver12 = (input: string): string => {
    let cups = parse(input);

    for (let i = 0; i < 100; ++i) {
        const idx = i % cups.length;
        const activeCup = cups[idx];
        const pickedCups = circularSplice(cups, idx, 3);

        // Insert picked cups in new location
        let inserted = false;
        let insertAttempt = 1;

        while (!inserted) {
            let insertPoint = activeCup - insertAttempt;

            if (insertPoint < Math.min(...cups)) {
                insertPoint = Math.max(...cups);
            }

            const canInsert = cups.indexOf(insertPoint);

            if (canInsert > -1) {
                cups = insert(cups, canInsert + 1, pickedCups);
                inserted = true;
            }

            insertAttempt++;
        }

        // Shfit array left until positions are correct
        while (cups[idx] != activeCup) {
            cups = shiftLeft(cups, 1);
        }
    }

    // Shift cup with label 1 to index 0, remove index 1 and stringify
    const result = shiftLeft(cups, cups.indexOf(1)).slice(1).join("");

    return result;
};

const solver2 = (input: string): number => {
    const list = new IndexableLinkedList<number>();
    const cups = parse(input);

    // Initialise the linked list
    // @ts-expect-error - can be fixed later
    let prev: Node<number> = null;
    for (let i = 0; i < cups.length; ++i) {
        prev = list.append(prev, cups[i]);
    }

    for (let i = 10; i < 1000000; ++i) {
        prev = list.append(prev, i);
    }

    let currentValue = cups[0];
    let currentNode = list.find(currentValue);

    for (let i = 0; i < 10000000; ++i) {
        if (i % 100000 == 0) {
            console.log(i);
        }

        const picked: Array<number> = [];

        for (let i = 0; i < 3; ++i) {
            picked.push(currentNode!.next!.data);
            list.erase(currentNode!.next!);
        }

        let dest = currentValue == 1 ? 1000000 : currentValue - 1;

        while (picked.includes(dest)) {
            dest = dest == 1 ? 1000000 : dest - 1;
        }

        //console.log(dest);

        let dest_node = list.find(dest)!;

        for (let i = 0; i < 3; ++i) {
            dest_node = list.append(dest_node, picked[i]);
        }

        currentNode = currentNode!.next;
        currentValue = currentNode!.data;
    }

    const activeNode = list.find(1);
    return activeNode!.next!.data * activeNode!.next!.next!.data;

    // return out.join("");
};

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};
