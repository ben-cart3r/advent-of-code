<div align="center">
  <a href="https://github.com/ben-cart3r/advent-of-code-2020">
    <img src="docs/aoc.png" alt="advent-of-code-logo" width="80" height="80">
  </a>

  <h3 align="center">advent-of-code</h3>

  <p align="center">
    Solutions to the Advent of Code yearly puzzles.
    <br />
  </p>
</div>

<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#pre-commit">Pre-commit</a></li>
        <li><a href="#linting">Linting</a></li>
        <li><a href="#testing">Testing</a></li>
        <li><a href="#solution-template">Solution template</a></li>
        <li><a href="#running-solutions">Running solutions</a></li>
      </ul>
    </li>
  </ol>
</details>

## About the project

The repository contains my solutions to the Advent of Code yearly puzzles. My motivation for completing the puzzles is to practice solving complex problems that my day job doesn't always provide. It also provides a place to experiment with some GitHub actions.

### Built With

-   [TypeScript](https://www.typescriptlang.org/)
-   [Jest](https://jestjs.io/)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)

## Getting Started

### Prerequisites

-   Node.js

    ```shell
    brew install node@16
    ```

-   Pre-commit

    ```shell
    brew install pre-commit
    ```

### Installation

-   Install pre-commit hooks

    ```shell
    pre-commit install
    ```

-   Install NPM dependencies

    ```shell
    npm install
    ```

## Usage

### Pre-commit

-   Running pre-commit hooks independently

    ```shell
    pre-commit run --all-files
    ```

-   Bypass pre-commit hooks

    ```shell
    git commit --no-verify
    ```

### Linting

-   Check code format

    ```shell
    npm run format:check
    ```

-   Fix code format

    ```shell
    npm run format:fix
    ```

-   Perform static analysis (eslint)

    ```shell
    npm run lint
    ```

### Testing

-   Run all unit tests for all solutions

    ```shell
    npm run test
    ```

-   Run all unit tests for a single day's puzzles

    ```shell
    npm run test -- <year>/<day>
    ```

    e.g.

    ```shell
    npm run test -- 2020/day01
    ```

-   Run a single unit test

    ```shell
    npm run test -- <year>/<day> -t <test>
    ```

    e.g.

    ```shell
    npm run test -- 2020/day01 -t part1
    ```

### Bootstrapping

-   Create a new directory for the specified year and skeleton solution / test files

    ```shell
    ./bootstrap/bootstrap.sh 2023
    ```

### Running solutions

To run a solution for each day, make sure that the input for that days puzzles has been downloaded to the directory for that day. Make sure to save it as data.txt so that it is excluded from source control.

```shell
npm run start -- --year 2020 --day 01
```
