type RucksackItemTypesGroup = string[][];

/**
 * Group the array by the given group size.
 */

function groupArrayBySize<TType>(array: TType[], size: number) {
  return Array.from(new Array(Math.ceil(array.length / size)), (_, index) => {
    return array.slice(index * size, index * size + size);
  });
}

/**
 * Transform the input into a grouped triple of rucksack item type arrays.
 */

function parseInput(input: string, groupSize: number) {
  return groupArrayBySize(input.split("\n"), groupSize).map((group) =>
    group.map((items) => items.split(""))
  ) as RucksackItemTypesGroup[];
}

/**
 * Find the common item type in three rucksacks.
 */

function findCommonRucksackItemType([
  firstRucksackTypes,
  secondRucksackTypes,
  thirdRucksackTypes,
]: RucksackItemTypesGroup) {
  const commonRucksackItemType = firstRucksackTypes.find(
    (firstRucksackType) =>
      secondRucksackTypes.includes(firstRucksackType) &&
      thirdRucksackTypes.includes(firstRucksackType)
  );

  if (!commonRucksackItemType) {
    throw new Error("No common rucksack item type found.");
  }

  return commonRucksackItemType;
}

/**
 * Get the rucksack item type priority.
 */

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
  ""
);

function getRucksackItemTypePriority(type: string) {
  return alphabet.findIndex((character) => character === type) + 1; // Off by one.
}

/**
 * Get the sum of the common rucksack item type priorities per group.
 */

function getCommonRucksackItemTypePrioritySum(
  rucksackItemTypesGroups: RucksackItemTypesGroup[]
) {
  const commonRucksackItemTypes = rucksackItemTypesGroups.map(
    findCommonRucksackItemType
  );

  const commonRucksackItemTypePriorities = commonRucksackItemTypes.map(
    getRucksackItemTypePriority
  );

  const commonRucksackItemTypePrioritiesSum =
    commonRucksackItemTypePriorities.reduce(
      (sum, commonRucksackItemTypePriority) => {
        return sum + commonRucksackItemTypePriority;
      },
      0
    );

  return commonRucksackItemTypePrioritiesSum;
}

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const GROUP_SIZE = 3;

const rucksackItemTypesGroups = parseInput(input, GROUP_SIZE);

const commonRucksackItemTypePrioritySum = getCommonRucksackItemTypePrioritySum(
  rucksackItemTypesGroups
);

console.log(commonRucksackItemTypePrioritySum);
