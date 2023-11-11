const asc = <T>(a: T, b: T): number => (a < b ? 1 : a > b ? -1 : 0);
const desc = <T>(a: T, b: T): number => (a > b ? 1 : a < b ? -1 : 0);

export { asc, desc };
