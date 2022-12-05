import LinkedList from "./linkedlist";

const inspect = Symbol.for("nodejs.util.inspect.custom");

export class Deque<T> {
    private _list: LinkedList<T>;

    constructor() {
        this._list = new LinkedList();
    }

    peek(): T {
        if (this._list.head() == null) {
            throw new Error("Underflow Exception");
        }

        return this._list.head().value;
    }

    popBack(): T {
        const tail = this._list.tail();

        if (tail == null) {
            throw new Error("Underflow Exception");
        }

        this._list.remove(tail);

        return tail.value;
    }

    popFront(): T {
        const head = this._list.head();

        if (head == null) {
            throw new Error("Underflow Exception");
        }

        this._list.remove(head);

        return head.value;
    }

    pushBack(value: T): void {
        this._list.insert(value);
    }

    pushFront(value: T): void {
        this._list.insertFront(value);
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
