class Input {
    private input: string;

    constructor(input: string) {
        this.input = input.trim();
    }

    asCSV(): Paragraph {
        return new Paragraph(this.input.split(","));
    }

    asLines(): Paragraph {
        return new Paragraph(this.input.split("\n"));
    }

    asParagraphs(): ParagraphList {
        return new ParagraphList(this.input.split("\n\n"));
    }
}

class Line {
    private line: string;

    constructor(line: string) {
        this.line = line;
    }

    asDelimitedString(pattern: RegExp): Array<string> {
        return this.line.split(pattern);
    }

    asFloat(): number {
        return parseFloat(this.line);
    }

    asInteger(): number {
        return parseInt(this.line);
    }

    asString(): string {
        return this.line;
    }
}

class Paragraph {
    private lines: Array<Line>;

    constructor(lines: Array<string>) {
        this.lines = lines.map((p) => new Line(p));
    }

    asFloats() {
        return this.lines.map((l) => l.asFloat());
    }

    asIntegers() {
        return this.lines.map((l) => l.asInteger());
    }

    asStrings() {
        return this.lines.map((l) => l.asString());
    }

    asDelimitedStrings(pattern: RegExp) {
        return this.lines.map(l => l.asDelimitedString(pattern));
    }
}

class ParagraphList {
    private paragraphs: Array<Paragraph>;

    constructor(paragraphs: Array<string>) {
        this.paragraphs = paragraphs.map((p) => new Paragraph(p.split("\n")));
    }

    asStrings(): Array<Array<string>> {
        return this.paragraphs.map((p) => p.asStrings());
    }

    asIntegers(): Array<Array<number>> {
        return this.paragraphs.map((p) => p.asIntegers());
    }

    asFloats(): Array<Array<number>> {
        return this.paragraphs.map((p) => p.asFloats());
    }
}

export default Input;
