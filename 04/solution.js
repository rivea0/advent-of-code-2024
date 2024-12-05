const fs = require('node:fs');

main();

function main() {
  const grid = getGrid();

  console.log(`Part 1 answer: ${part1(grid)}`);
  console.log(`Part 2 answer: ${part2(grid)}`);
}

function getGrid() {
  const str = fs.readFileSync('./input.txt', 'utf8');

  return str.split('\n');
}

function part1(grid) {
  let total = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let horizontal;
      let vertical;
      let diagonalToRightBottom;
      let diagonalToLeftBottom;
      if (j + 3 < grid[i].length && j + 3 >= 0) {
        horizontal = grid[i].slice(j, j + 4);
      }
      if (i + 3 < grid.length && i + 3 >= 0) {
        vertical = `${grid[i][j]}${grid[i + 1][j]}${grid[i + 2][j]}${
          grid[i + 3][j]
        }`;
      }
      if (
        i + 3 < grid.length &&
        i + 3 >= 0 &&
        j + 3 < grid[i].length &&
        j + 3 >= 0
      ) {
        diagonalToRightBottom = `${grid[i][j]}${grid[i + 1][j + 1]}${
          grid[i + 2][j + 2]
        }${grid[i + 3][j + 3]}`;
      }

      if (
        i + 3 < grid.length &&
        i + 3 >= 0 &&
        j - 3 < grid[i].length &&
        j - 3 >= 0
      ) {
        diagonalToLeftBottom = `${grid[i][j]}${grid[i + 1][j - 1]}${
          grid[i + 2][j - 2]
        }${grid[i + 3][j - 3]}`;
      }

      if (horizontal && (horizontal === 'XMAS' || horizontal === 'SAMX')) {
        total++;
      }
      if (vertical && (vertical === 'XMAS' || vertical === 'SAMX')) {
        total++;
      }

      if (
        diagonalToLeftBottom &&
        (diagonalToLeftBottom === 'XMAS' || diagonalToLeftBottom === 'SAMX')
      ) {
        total++;
      }

      if (
        diagonalToRightBottom &&
        (diagonalToRightBottom === 'XMAS' || diagonalToRightBottom === 'SAMX')
      ) {
        total++;
      }
    }
  }

  return total;
}

function part2(grid) {
  let total = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'A') {
        let topLeft;
        let topRight;
        let bottomLeft;
        let bottomRight;
        let option1;
        let option2;
        let option3;
        let option4;
        if (
          i - 1 < grid.length &&
          i - 1 >= 0 &&
          j - 1 < grid[i].length &&
          j - 1 >= 0
        ) {
          topLeft = grid[i - 1][j - 1];
        }
        if (
          i - 1 < grid.length &&
          i - 1 >= 0 &&
          j + 1 < grid[i].length &&
          j + 1 >= 0
        ) {
          topRight = grid[i - 1][j + 1];
        }
        if (
          i + 1 < grid.length &&
          i + 1 >= 0 &&
          j - 1 < grid[i].length &&
          j - 1 >= 0
        ) {
          bottomLeft = grid[i + 1][j - 1];
        }
        if (
          i + 1 < grid.length &&
          i + 1 >= 0 &&
          j + 1 < grid[i].length &&
          j + 1 >= 0
        ) {
          bottomRight = grid[i + 1][j + 1];
        }

        if (topLeft && bottomRight && topRight && bottomLeft) {
          option1 =
            topLeft === 'M' &&
            bottomRight === 'S' &&
            topRight === 'S' &&
            bottomLeft === 'M';
          option2 =
            topLeft === 'S' &&
            bottomRight === 'M' &&
            topRight === 'M' &&
            bottomLeft === 'S';
          option3 =
            topLeft === 'S' &&
            bottomRight === 'M' &&
            topRight === 'S' &&
            bottomLeft === 'M';
          option4 =
            topLeft === 'M' &&
            bottomRight === 'S' &&
            topRight === 'M' &&
            bottomLeft === 'S';
        }

        if (option1 || option2 || option3 || option4) {
          total++;
        }
      }
    }
  }

  return total;
}
