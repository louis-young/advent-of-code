/**
 * Transform the input into an array of characters.
 */

function parseInput(input: string) {
  return input.split("");
}

/**
 * Find the end position of a unique sequence of a given length recursively.
 */

function findUniqueSequence(
  array: string[],
  index: number,
  sequenceLength: number
) {
  const slidingWindow = array.slice(index, index + sequenceLength);

  const slidingWindowSet = new Set(slidingWindow);

  const isUniqueSequence = slidingWindowSet.size === sequenceLength;

  if (isUniqueSequence) {
    return index + sequenceLength;
  }

  return findUniqueSequence(array, index + 1, sequenceLength);
}

const input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;

const characters = parseInput(input);

const startOfMessageMarkerPosition = findUniqueSequence(characters, 0, 14);

console.log(startOfMessageMarkerPosition);
