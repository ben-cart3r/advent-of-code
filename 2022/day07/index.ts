import { sum } from "../../common";
import Input from "../../common/input";
import { desc } from "../../common/sorting";

type File = {
    type: "file";
    name: string;
    size: number;
};

type Directory = {
    type: "directory";
    name: string;
    children: Array<File | Directory>;
    parent: Directory;
};

type Command = {
    type: "command";
    command: string;
    args: string;
};

const createFile = (name: string, size: number): File => ({
    type: "file",
    name,
    size,
});

const createDirectory = (name: string): Directory => ({
    type: "directory",
    name,
    children: [],
    parent: null,
});

const createCommand = (command: string, args: string): Command => ({
    type: "command",
    command,
    args,
});

const parse = (input: string): Array<Command | Directory | File> => {
    return new Input(input)
        .asLines()
        .asStrings()
        .map((line) => {
            const segments = line.split(" ");

            if (segments[0] == "$") {
                return createCommand(segments[1], segments[2]);
            } else if (segments[0] == "dir") {
                return createDirectory(segments[1]);
            } else {
                return createFile(segments[1], parseInt(segments[0]));
            }
        });
};

const findDirectories = (dir: Directory): Array<Directory> => {
    return [
        dir,
        ...dir.children.reduce(
            (acc, child) =>
                child.type == "directory"
                    ? [...acc, ...findDirectories(child)]
                    : acc,
            [] as Array<Directory>
        ),
    ];
};

const calculateDirectorySize = (dir: Directory): number => {
    return sum(
        ...dir.children.map((child) =>
            child.type == "directory"
                ? calculateDirectorySize(child)
                : child.size
        )
    );
};

const generateFileTree = (lines: Array<Command | Directory | File>) => {
    const root: Directory = {
        type: "directory",
        name: "/",
        children: [],
        parent: null,
    };
    let currentDirectory = root;

    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i];

        if (line.type == "command" && line.command == "cd") {
            if (line.args == "..") {
                currentDirectory = currentDirectory.parent;
            } else if (line.args != "/") {
                currentDirectory = currentDirectory.children.find(
                    (f): f is Directory =>
                        f.type === "directory" && f.name == line.args
                );
            }
        } else if (line.type == "directory") {
            line.parent = currentDirectory;
            currentDirectory.children.push(line);
        } else if (line.type == "file") {
            currentDirectory.children.push(line);
        }
    }

    return root;
};

export const part1 = (input: string): string => {
    const lines = parse(input);
    const tree = generateFileTree(lines);
    const directories = findDirectories(tree);

    return sum(
        ...directories
            .map((f) => calculateDirectorySize(f))
            .filter((s) => s <= 100000)
    ).toString();
};

export const part2 = (input: string): string => {
    const lines = parse(input);
    const tree = generateFileTree(lines);

    const totalSize = 70000000;
    const requiredSize = 30000000;
    const used = calculateDirectorySize(tree);
    const free = totalSize - used;

    const possibleDeletions = findDirectories(tree)
        .map((f) => calculateDirectorySize(f))
        .filter((s) => free + s > requiredSize);

    return possibleDeletions.sort(desc).at(0).toString();
};
