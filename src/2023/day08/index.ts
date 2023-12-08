import { lcm } from "../../common";
import { newLineRegex, paragraphRegex } from "../../common/string-helpers";

type Node = {
  id: string;
  left: string;
  right: string;
};

const parseNode = (input: string) => {
  const [id, neighbours] = input.split(" = ");
  const [left, right] = neighbours.substring(1, neighbours.length - 1).split(", ");

  return {
    id,
    left,
    right,
  };
};

const parseNodes = (input: string) => {
  return input.split(newLineRegex).map(parseNode);
};

const parse = (input: string) => {
  const [directions, nodes] = input.trim().split(paragraphRegex);

  return { directions, nodes: parseNodes(nodes) };
};

const findNode = (nodes: Array<Node>, id: string) => {
  return nodes.find(n => n.id == id)!;
};

const getNextNode = (nodes: Array<Node>, node: Node, direction: string) => {
  return direction == "L" ? findNode(nodes, node.left) : findNode(nodes, node.right);
};

const getStepsToFinalPosition = (
  nodes: Array<Node>,
  directions: string,
  currentNode: Node,
  isTerminalNode: (node: Node) => boolean,
): number => {
  let counter = 0;

  while (!isTerminalNode(currentNode)) {
    const direction = directions[counter % directions.length];
    currentNode = getNextNode(nodes, currentNode, direction);
    counter++;
  }

  return counter;
};

export const part1 = (input: string): string => {
  const { directions, nodes } = parse(input);

  return getStepsToFinalPosition(
    nodes,
    directions,
    findNode(nodes, "AAA"),
    node => node.id == "ZZZ",
  ).toString();
};

export const part2 = (input: string): string => {
  const { directions, nodes } = parse(input);

  const values = nodes
    .filter(node => node.id.substring(2) == "A")
    .map(node =>
      getStepsToFinalPosition(nodes, directions, node, node => node.id.substring(2) == "Z"),
    );

  return lcm(...values).toString();
};
