const fs = require('node:fs/promises');

let LEFT_NUMS = [];
let RIGHT_NUMS = [];

async function main() {
  await splitNumbers();
  sortSplitNumbers();

  const part1Result = await part1();
  const part2Result = await part2();

  return [part1Result, part2Result];
}

main().then((res) => {
  console.log(`Part 1 answer: ${res[0]}`);
  console.log(`Part 2 answer: ${res[1]}`);
});

async function splitNumbers() {
  let fileHandle;
  try {
    fileHandle = await fs.open('./input.txt');
    for await (const line of fileHandle.readLines()) {
      const result = line.split(' ');
      LEFT_NUMS.push(result[0]);
      RIGHT_NUMS.push(result[result.length - 1]);
    }
  } finally {
    if (fileHandle) await fileHandle.close();
  }
}

function sortSplitNumbers() {
  LEFT_NUMS.sort((a, b) => a - b);
  RIGHT_NUMS.sort((a, b) => a - b);
}

async function part1() {
  let total = 0;

  // lefts and rights are of same length, we can use either of them
  for (let i = 0; i < LEFT_NUMS.length; i++) {
    total += Math.abs(RIGHT_NUMS[i] - LEFT_NUMS[i]);
  }

  return total;
}

async function part2() {
  let total = 0;

  for (const num of LEFT_NUMS) {
    const numTimesAppears = RIGHT_NUMS.filter((n) => n === num).length;
    const similarityScore = num * numTimesAppears;
    total += similarityScore;
  }

  return total;
}
