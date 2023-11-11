export class Grid<T> {
    private grid: Array<Array<T>>;

    constructor(grid: Array<Array<T>>) {
        this.grid = grid;
    }

    each(callback: (value: T) => void) {
        for (let y = 0; y < this.grid.length; ++y) {
            for (let x = 0; x < this.grid[y].length; ++x) {
                callback(this.get(x, y));
            }
        }
    }

    get(x: number, y: number) {
        return this.grid[y][x];
    }

    neighbours(x: number, y: number) {
        const dy = [-1, 0, 1];
        const dx = [-1, 0, 1];
        const out = [];

        for (let i = 0; i < dy.length; ++i) {
            const ny = y + dy[i];

            if (ny >= 0 && ny < this.grid.length) {
                for (let j = 0; j < dx.length; ++j) {
                    const nx = x + dx[j];

                    if (nx >= 0 && nx < this.grid[0].length) {
                        if (!(dy[i] == 0 && dx[j] == 0)) {
                            out.push(this.get(nx, ny));
                        }
                    }
                }
            }
        }

        return out;
    }
}
