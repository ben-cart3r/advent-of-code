import { flatten, sum } from "../../common";
import Input from "../../common/input";

type CubeColour = "red" | "green" | "blue";

type CubeGroup = {
    colour: CubeColour;
    count: number;
};

type Game = {
    id: string;
    turns: Array<CubeGroup>;
};

const parseCubeGroup = (input: string): CubeGroup => {
    const [count, colour] = input.trim().split(" ");

    return {
        colour: colour as CubeColour,
        count: parseInt(count),
    };
};

const parseGameTurn = (input: string): Array<CubeGroup> => {
    return input.split(",").map(parseCubeGroup);
};

const parseGame = (input: string): Game => {
    const [id, turns] = input.split(":");
    const shortId = id.substring(5);

    return {
        id: shortId,
        turns: flatten(turns.split(";").map(parseGameTurn)),
    };
};

const parse = (input: string) => {
    return new Input(input).asLines().asStrings().map(parseGame);
};

const getMaximumDrawnCubes = (game: Game, color: CubeColour) => {
    const occurrences = game.turns
        .filter(({ colour }) => colour == color)
        .map(({ count }) => count);
    return Math.max(...occurrences);
};

const isValidGame = (
    game: Game,
    redThreshold: number,
    greenThreshold: number,
    blueThreshold: number,
) => {
    const maxReds = getMaximumDrawnCubes(game, "red");
    const maxGreens = getMaximumDrawnCubes(game, "green");
    const maxBlues = getMaximumDrawnCubes(game, "blue");

    return (
        maxReds <= redThreshold &&
        maxGreens <= greenThreshold &&
        maxBlues <= blueThreshold
    );
};

const getGameScore = (game: Game) => {
    const maxReds = getMaximumDrawnCubes(game, "red");
    const maxGreens = getMaximumDrawnCubes(game, "green");
    const maxBlues = getMaximumDrawnCubes(game, "blue");

    return maxReds * maxGreens * maxBlues;
};

export const part1 = (input: string): string => {
    const games = parse(input);
    const validGames = games.filter((game) => isValidGame(game, 12, 13, 14));
    const validGameIds = validGames.map(({ id }) => parseInt(id));

    return sum(...validGameIds).toString();
};

export const part2 = (input: string): string => {
    const games = parse(input);
    const scores = games.map(getGameScore);

    return sum(...scores).toString();
};
