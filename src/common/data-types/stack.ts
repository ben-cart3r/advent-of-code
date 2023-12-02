import LinkedList from "./linkedlist";

const inspect = Symbol.for("nodejs.util.inspect.custom");

export class Stack<T> {
    private _list: LinkedList<T>;

    constructor() {
        this._list = new LinkedList();
    }

    empty(): boolean {
        return this._list.empty();
    }

    peek(): T {
        if (this._list.head() == null) {
            throw new Error("Underflow Exception");
        }

        return this._list.head().value;
    }

    pop(): T {
        const head = this._list.head();

        if (head == null) {
            throw new Error("Underflow Exception");
        }

        this._list.remove(head);

        return head.value;
    }

    push(value: T): void {
        this._list.insertFront(value);
    }

    [Symbol.iterator](): Iterator<T> {
        return {
            // @ts-expect-error - can be fixed later
            next: () => {
                return {
                    done: this.empty(),
                    value: this.empty() ? null : this.pop(),
                };
            },
        };
    }

    [inspect](): Array<T> {
        const out = [];
        let node = this._list.head();

        if (node) {
            while (node && node.next) {
                out.push(node.value);
                node = node.next;
            }

            out.push(node.value);
        }

        return out;
    }
}
