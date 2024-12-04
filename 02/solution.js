const fs = require('node:fs/promises');

async function main() {
  let numSafeReports = 0;
  let numSafeReportsTolerated = 0;

  let fileHandle;
  try {
    fileHandle = await fs.open('./input.txt');

    for await (const line of fileHandle.readLines()) {
      const nums = line.split(' ').map((n) => +n);

      if (isLevelSafe(nums)) {
        numSafeReports++;
      }

      let safeRevert;
      for (let i = 0; i < nums.length; i++) {
        if (isLevelSafe([...nums.slice(0, i), ...nums.slice(i + 1)])) {
          safeRevert = true;
        }
      }
      if (isLevelSafe(nums) || safeRevert) {
        numSafeReportsTolerated++;
      }
    }
  } finally {
    if (fileHandle) await fileHandle.close();
  }

  return [numSafeReports, numSafeReportsTolerated];
}

main().then((res) => {
  console.log(`Part 1 answer: ${res[0]}`);
  console.log(`Part 2 answer: ${res[1]}`);
});

function isLevelSafe(level) {
  let isIncreasing;
  for (let i = 0; i < level.length - 1; i++) {
    if (level[i] < level[i + 1]) {
      if (isIncreasing !== undefined && !isIncreasing) {
        return false;
      }
      isIncreasing = true;
    } else if (level[i] > level[i + 1]) {
      if (isIncreasing !== undefined && isIncreasing) {
        return false;
      }
      isIncreasing = false;
    } else {
      return false;
    }

    if (!hasValidDiff(level[i], level[i + 1])) {
      return false;
    }
  }

  return true;
}

function hasValidDiff(n1, n2) {
  let diff = Math.abs(n1 - n2);
  if (diff >= 1 && diff <= 3) {
    return true;
  }

  return false;
}
