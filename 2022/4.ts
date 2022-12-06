type RangePair = [[number, number], [number, number]];

/**
 * Transform the input into an array of tuples of tuples
 * containing a pair of range start and end positions.
 */

function parseInput(input: string) {
  return input
    .split("\n")
    .map((range) => range.split(","))
    .map((ranges) => ranges.map((range) => range.split("-")))
    .map((ranges) =>
      ranges.map((range) => range.map((range) => Number(range)))
    ) as RangePair[];
}

/**
 * Determine whether or not two ranges overlap.
 */

function hasOverlappingRange([
  [firstRangeStart, firstRangeEnd],
  [secondRangeStart, secondRangeEnd],
]: RangePair) {
  const doesFirstRangeOverlapSecondRange =
    firstRangeStart <= secondRangeStart && secondRangeStart <= firstRangeEnd;

  const doesSecondRangeOverlapFirstRange =
    secondRangeStart <= firstRangeStart && firstRangeStart <= secondRangeEnd;

  const hasOverlappingRange =
    doesFirstRangeOverlapSecondRange || doesSecondRangeOverlapFirstRange;

  return hasOverlappingRange;
}

/**
 * Get the quantity of overlapping ranges in the given input.
 */

function getQuantityOfOverlappingRanges(ranges: RangePair[]) {
  return ranges.reduce((quantityOfOverlappingRanges, rangePair) => {
    return hasOverlappingRange(rangePair)
      ? quantityOfOverlappingRanges + 1
      : quantityOfOverlappingRanges;
  }, 0);
}

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const ranges = parseInput(input);

const quantityOfOverlappingRanges = getQuantityOfOverlappingRanges(ranges);

console.log(quantityOfOverlappingRanges);
