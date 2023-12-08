export const newLineRegex = /\n/;
export const paragraphRegex = /\n\n/;
export const whitespaceRegex = /\s+/;
export const charRegex = /(?!^)/;

export const isNotEmptyString = (input: string) => {
  return input != "";
};

export const toNumber = (input: string) => {
  return parseInt(input);
};

export const createSplitter = (regex: RegExp) => (input: string) => {
  return input.split(regex);
};

export const splitByNewLine = createSplitter(newLineRegex);

export const splitByParagraph = createSplitter(paragraphRegex);

export const splitByWhitespace = createSplitter(whitespaceRegex);

export const splitByCharacters = createSplitter(charRegex);
