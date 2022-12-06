/**
 * Transform the input into a group of numeric calories by inventory.
 */

function parseInput(input: string) {
  return input
    .split("\n\n")
    .map((inventories) => inventories.split("\n"))
    .map((inventories) =>
      inventories.map((calories) => Number(calories))
    ) as number[][];
}

/**
 * Sum the array of numbers.
 */

function sumNumbers(numbers: number[]) {
  return numbers.reduce((sum, number) => sum + number);
}

/**
 * Sum the calory inventory groups.
 */

function sumInventoryCaloryGroups(inventories: number[][]) {
  return inventories.map((calories) => sumNumbers(calories));
}

/**
 * Sort the array of numbers immutably in descending order.
 */

function sortNumbersDescending(numbers: number[]) {
  return [...numbers].sort((numberA, numberB) => numberB - numberA);
}

/**
 * Get the sum of the n most calorific inventories.
 */

function getSumOfNMostCalorificInventories(
  inventoryCaloryGroups: number[][],
  n: number
) {
  const summedInventoryCaloryGroups = sumInventoryCaloryGroups(
    inventoryCaloryGroups
  );

  const sortedSummedInventoryCaloryGroups = sortNumbersDescending(
    summedInventoryCaloryGroups
  );

  const nMostCalorificInventorySums = sortedSummedInventoryCaloryGroups.slice(
    0,
    n
  );

  const sumOfNMostCalorificInventorySums = sumNumbers(
    nMostCalorificInventorySums
  );

  return sumOfNMostCalorificInventorySums;
}

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const inventoryCaloryGroups = parseInput(input);

const GROUP_SIZE = 3;

const sumOfThreeMostCalorificInventories = getSumOfNMostCalorificInventories(
  inventoryCaloryGroups,
  GROUP_SIZE
);

console.log(sumOfThreeMostCalorificInventories);
