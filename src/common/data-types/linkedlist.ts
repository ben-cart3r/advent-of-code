const inspect = Symbol.for("nodejs.util.inspect.custom");

type ListNode<T> = {
    value: T;
    next: ListNode<T>;
    prev: ListNode<T>;
};

export default class LinkedList<T> {
    private _head: ListNode<T>;
    private _tail: ListNode<T>;

    constructor() {
        this._head = null;
        this._tail = null;
    }

    clear(): void {
        this._head = null;
    }

    head(): ListNode<T> {
        return this._head;
    }

    empty(): boolean {
        return this._head == null;
    }

    insert(value: T): void {
        if (this._tail == null) {
            this.insertFront(value);
        } else {
            this.insertAfter(this._tail, value);
        }
    }

    insertAfter(node: ListNode<T>, value: T): void {
        const newNode: ListNode<T> = {
            value,
            next: null,
            prev: node,
        };

        if (node.next == null) {
            newNode.next = null;
            this._tail = newNode;
        } else {
            newNode.next = node.next;
            node.next.prev = newNode;
        }

        node.next = newNode;
    }

    insertBefore(node: ListNode<T>, value: T): void {
        const newNode: ListNode<T> = {
            value,
            next: node,
            prev: null,
        };

        if (node.prev == null) {
            newNode.prev = null;
            this._head = newNode;
        } else {
            newNode.prev = node.prev;
            node.prev.next = newNode;
        }

        node.prev = newNode;
    }

    insertFront(value: T): void {
        const newNode: ListNode<T> = {
            value,
            next: null,
            prev: null,
        };

        if (this._tail == null) {
            this._head = newNode;
            this._tail = newNode;
        } else {
            this.insertBefore(this._head, value);
        }
    }

    remove(node: ListNode<T>): void {
        if (node.prev == null) {
            this._head = node.next;
        } else {
            node.prev.next = node.next;
        }

        if (node.next == null) {
            this._tail = node.prev;
        } else {
            node.next.prev = node.prev;
        }
    }

    tail(): ListNode<T> {
        return this._tail;
    }

    [inspect](): Array<T> {
        const out = [];
        let node = this._head;

        while (node && node.next) {
            out.push(node.value);
            node = node.next;
        }

        out.push(node.value);

        return out;
    }
}
