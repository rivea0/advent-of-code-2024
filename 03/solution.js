const fs = require('node:fs');

async function main() {
  const str = fs.readFileSync('./input.txt', 'utf8');

  return [part1(str), part2(str)];
}

main().then((res) => {
  console.log(`Part 1 answer: ${res[0]}`);
  console.log(`Part 2 answer: ${res[1]}`);
});

function part1(str) {
  const reg = /mul\(\d+,\d+\)/g;
  let total = 0;

  const exps = str.match(reg);

  for (const exp of exps) {
    total += multNumbers(exp);
  }

  return total;
}

function part2(str) {
  const reg = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
  let total = 0;

  const exps = str.match(reg);

  let enabled = true;
  for (const exp of exps) {
    if (exp === 'do()') {
      enabled = true;
    }
    if (exp === "don't()") {
      enabled = false;
    }

    if (enabled && exp.startsWith('mul')) {
      total += multNumbers(exp);
    }
  }

  return total;
}

function multNumbers(expression) {
  const numbers = expression.match(/\d+/g);
  return +numbers[0] * +numbers[1];
}
