export class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
            this.tail.next = this.head;
        }
        this.size++;
    }

    remove(data) {
        if (!this.head) return;

        let current = this.head;
        let previous = null;

        do {
            if (current.data === data) {
                if (current === this.head) {
                    this.head = this.head.next;
                    this.tail.next = this.head;
                } else if (current === this.tail) {
                    this.tail = previous;
                    this.tail.next = this.head;
                } else {
                    previous.next = current.next;
                }
                this.size--;
                return;
            }
            previous = current;
            current = current.next;
        } while (current !== this.head);
    }

    getNext(currentNode) {
        return currentNode.next;
    }

    getSize() {
        return this.size;
    }
}