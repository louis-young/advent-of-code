type Stack = string[];

type Move = {
  crateQuantityToMove: number;
  stackIndexToMoveFrom: number;
  stackIndexToMoveTo: number;
};

/**
 * Perform the crate movement between stacks immutably.
 */

function moveCratesOnStacks(stacks: Stack[], move: Move) {
  const { crateQuantityToMove, stackIndexToMoveFrom, stackIndexToMoveTo } =
    move;

  const stackToMoveFrom = stacks[stackIndexToMoveFrom];
  const cratesToMove = stackToMoveFrom.slice(0, crateQuantityToMove);
  const updatedStackMovedFrom = stackToMoveFrom.slice(
    crateQuantityToMove,
    stackToMoveFrom.length
  );

  const stackToMoveTo = stacks[stackIndexToMoveTo];
  const updatedStackMovedTo = [...cratesToMove, ...stackToMoveTo];

  const updatedStacks = stacks.map((stack, stackIndex) =>
    stackIndex === stackIndexToMoveFrom
      ? updatedStackMovedFrom
      : stackIndex === stackIndexToMoveTo
      ? updatedStackMovedTo
      : stack
  );

  return updatedStacks;
}

/**
 * Perform a series of movements accumulatively.
 */

function rearrangeCratesOnStacks(stacks: Stack[], moves: Move[]) {
  return moves.reduce(moveCratesOnStacks, stacks);
}

/**
 * Get the crates on top of each stack of crates.
 */

function getCratesOnTopOfEachStack(stacks: Stack[]) {
  return stacks.map(([topCrate]) => topCrate);
}

const stacks = [["N", "Z"], ["D", "C", "M"], ["P"]];

/**
 * Decrement the stack indices by one when parsing
 * the input to prevent off by one issues.
 */

const moves = [
  {
    crateQuantityToMove: 1,
    stackIndexToMoveFrom: 1,
    stackIndexToMoveTo: 0,
  },
  {
    crateQuantityToMove: 3,
    stackIndexToMoveFrom: 0,
    stackIndexToMoveTo: 2,
  },
  {
    crateQuantityToMove: 2,
    stackIndexToMoveFrom: 1,
    stackIndexToMoveTo: 0,
  },
  {
    crateQuantityToMove: 1,
    stackIndexToMoveFrom: 0,
    stackIndexToMoveTo: 1,
  },
];

const rearrangedCratesOnStacks = rearrangeCratesOnStacks(stacks, moves);

const cratesOnTopOfEachStack = getCratesOnTopOfEachStack(
  rearrangedCratesOnStacks
);

const answer = cratesOnTopOfEachStack.join("");

console.log(answer);
