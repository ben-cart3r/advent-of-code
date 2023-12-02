const parse = (input: string) => {
    return input.split(/\n/).map((line) => line.split("-"));
};

const isLowerCase = (input: string) => {
    return input.toLowerCase() == input;
};

const countLowerVertices = (path: Array<string>) => {
    return path.reduce<Map<string, number>>((acc, v) => {
        if (isLowerCase(v)) {
            if (acc.has(v)) {
                acc.set(v, acc.get(v)! + 1);
            } else {
                acc.set(v, 1);
            }
        }
        return acc;
    }, new Map());
};

const edges = (graph: Array<Array<string>>, vertex: string) => {
    // Find any node containing the vertex
    // Flatten nodes to vertices
    // Remove original vertex
    return graph
        .filter((node) => node.includes(vertex))
        .reduce<Array<string>>((acc, node) => [...acc, ...node], [])
        .filter((v) => v != vertex);
};

const isDiscovered = (path: Array<string>, vertex: string, part1: boolean) => {
    if (part1) {
        return isLowerCase(vertex) && path.includes(vertex);
    } else {
        if (vertex == "start") {
            return true;
        }

        if (!isLowerCase(vertex)) {
            return false;
        }

        const lowerVerticesCount = countLowerVertices(path);

        // If one node had been visited 2 times,
        // any vertex is "discovered" if it is in the path
        if ([...lowerVerticesCount.values()].includes(2)) {
            // Can be added to path if not in path already i.e. count == 0
            return lowerVerticesCount.get(vertex)! > 0;
        }

        // No vertex has been visited twice, so all can be visited again
        return false;
    }
};

const dfs = (
    data: Array<Array<string>>,
    path: Array<string>,
    paths: Array<Array<string>>,
    part1: boolean,
) => {
    const vertex = path[path.length - 1];

    if (vertex == "end") {
        paths.push(path);
    } else {
        for (const v of edges(data, vertex)) {
            if (!isDiscovered(path, v, part1)) {
                const newPath = [...path, v];
                paths = dfs(data, newPath, paths, part1);
            }
        }
    }

    return paths;
};

export const part1 = (input: string): string => {
    const map = parse(input);
    const allPaths = dfs(map, ["start"], [], true);

    return allPaths.length.toString();
};

export const part2 = (input: string): string => {
    const map = parse(input);
    const allPaths = dfs(map, ["start"], [], false);

    return allPaths.length.toString();
};
