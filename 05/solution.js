const fs = require('node:fs');

main();

function main() {
  const str = fs.readFileSync('./input.txt', 'utf8');
  const splittedText = str.split('\n\n');
  const pageOrderingRules = splittedText[0];
  const updateSequence = splittedText[1];

  const orders = getOrders(pageOrderingRules);
  const updates = getUpdates(updateSequence, orders);

  console.log(`Part 1 answer: ${part1(updates.correct)}`);
  console.log(`Part 2 answer: ${part2(updates.incorrect, orders)}`);
}

function getOrders(pageOrderingRules) {
  let orders = new Map();
  for (const i of pageOrderingRules.split('\n')) {
    const [before, num] = i.split('|');
    if (!orders.has(num)) {
      orders.set(num, [before]);
    } else {
      let befores = orders.get(num);
      befores.push(before);
    }
  }
  return orders;
}

function part1(correctUpdates) {
  let total = 0;

  for (const correctSeq of correctUpdates) {
    const mid = Math.floor(correctSeq.length / 2);
    const num = +correctSeq[mid];
    total += num;
  }

  return total;
}

function part2(incorrectUpdates, orders) {
  let total = 0;
  for (const incorrectSeq of incorrectUpdates) {
    const orderedSeq = reOrder(incorrectSeq, orders);
    const num = +orderedSeq[Math.floor(orderedSeq.length / 2)];
    total += num;
  }
  return total;
}

function getUpdates(updateSequence, orders) {
  let correctUpdates = new Set();
  let incorrectUpdates = new Set();

  for (const i of updateSequence.split('\n')) {
    const sequence = i.split(',');
    if (checkBefores(sequence, orders)) {
      correctUpdates.add(sequence);
    } else {
      incorrectUpdates.add(sequence);
    }
  }

  return { correct: correctUpdates, incorrect: incorrectUpdates };
}

function checkBefores(seq, orders) {
  for (let i = 0; i < seq.length; i++) {
    for (let j = i + 1; j < seq.length; j++) {
      const beforesOfNextItem = orders.get(seq[j]);
      if (!beforesOfNextItem) {
        const beforesOfCurrent = orders.get(seq[i]);
        if (beforesOfCurrent.includes(seq[j])) {
          return false;
        }
      }
      if (beforesOfNextItem && !beforesOfNextItem.includes(seq[i])) {
        return false;
      }
    }
  }

  return true;
}

// Insertion sort
function reOrder(arr, orders) {
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    let j = i;
    while (j > 0 && orders.get(arr[j - 1])?.includes(current)) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = current;
  }

  return arr;
}
