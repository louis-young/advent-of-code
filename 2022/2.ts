const shapes = {
  ROCK: "ROCK",
  PAPER: "PAPER",
  SCISSORS: "SCISSORS",
};

const outcomes = {
  WIN: "WIN",
  DRAW: "DRAW",
  LOSE: "LOSE",
};

type Game = {
  opponentShape: keyof typeof shapes;
  desiredOutcome: keyof typeof outcomes;
};

const opponentShapeMap = {
  A: shapes.ROCK,
  B: shapes.PAPER,
  C: shapes.SCISSORS,
};

const desiredOutcomeMap = {
  Z: outcomes.WIN,
  Y: outcomes.DRAW,
  X: outcomes.LOSE,
};

const shapeScoreMap = {
  [shapes.ROCK]: 1,
  [shapes.PAPER]: 2,
  [shapes.SCISSORS]: 3,
};

const gameScoreMap = {
  [outcomes.WIN]: 6,
  [outcomes.DRAW]: 3,
  [outcomes.LOSE]: 0,
};

/**
 * Map the opponent shapes to the shape required to
 * achieve each possible desired outcome.
 */

const opponentShapeMoveOutcomeMap = {
  [shapes.ROCK]: {
    [outcomes.WIN]: shapes.PAPER,
    [outcomes.DRAW]: shapes.ROCK,
    [outcomes.LOSE]: shapes.SCISSORS,
  },
  [shapes.PAPER]: {
    [outcomes.WIN]: shapes.SCISSORS,
    [outcomes.DRAW]: shapes.PAPER,
    [outcomes.LOSE]: shapes.ROCK,
  },
  [shapes.SCISSORS]: {
    [outcomes.WIN]: shapes.ROCK,
    [outcomes.DRAW]: shapes.SCISSORS,
    [outcomes.LOSE]: shapes.PAPER,
  },
};

/**
 * Transform the input into an array of objects containing
 * the decrypted opponent move and desired outcome.
 */

function parseInput(input: string) {
  return input
    .split("\n")
    .map((game) => game.replace(" ", ""))
    .map((game) => game.split(""))
    .map(([opponentShape, desiredOutcome]) => ({
      opponentShape: opponentShapeMap[opponentShape],
      desiredOutcome: desiredOutcomeMap[desiredOutcome],
    })) as Game[];
}

/**
 * Sum the array of numbers.
 */

function sumNumbers(numbers: number[]) {
  return numbers.reduce((sum, number) => sum + number);
}

/**
 * Get the score for a given game, inclusive of shape score.
 */

function getGameScore({ opponentShape, desiredOutcome }: Game) {
  const shapeToAchieveDesiredOutcome =
    opponentShapeMoveOutcomeMap[opponentShape][desiredOutcome];

  const shapeScore = shapeScoreMap[shapeToAchieveDesiredOutcome];

  const gameScore = gameScoreMap[desiredOutcome];

  const shapeAndGameScore = shapeScore + gameScore;

  return shapeAndGameScore;
}

/**
 * Calculate the total score for a given array of games.
 */

function calculateTotalGamesScore(games: Game[]) {
  const totalGameScores = games.map(getGameScore);

  const summedTotalGameScores = sumNumbers(totalGameScores);

  return summedTotalGameScores;
}

const input = `A Y
B X
C Z`;

const games = parseInput(input);

const totalGamesScore = calculateTotalGamesScore(games);

console.log(totalGamesScore);
