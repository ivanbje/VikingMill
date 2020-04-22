const HttpError = require("../models/http-error");
const Game = require("../models/game");
const { v4: uuidv4 } = require("uuid");

//////////////////////////////////////////////////////////////
///////////////////////Helper functions///////////////////////
//////////////////////////////////////////////////////////////
function RowColToOneDimensional(row, col) {
  var i = row * 3 + col;
  return i;
}

function isLegal(a, row, col) {
  if (row < 0 || row > 2) return false;
  if (col < 0 || col > 2) return false;

  const i = RowColToOneDimensional(row, col);
  return a[i] === 0;
}

function updateBoard(boardArray, player1next, row, col) {
  const index = RowColToOneDimensional(row, col);

  if (player1next) {
    boardArray[index] = 1;
  } else {
    boardArray[index] = 2;
  }
}

function isGameOver(a) {
  function player_i_hasWon(i, a) {
    //a = [0, 1, 2,
    //     3, 4, 5,
    //     6, 7, 8]
    //i is either 1 or 2

    if (a[0] === i && a[1] === i && a[2] === i) return i;
    if (a[3] === i && a[4] === i && a[5] === i) return i;
    if (a[6] === i && a[7] === i && a[8] === i) return i;

    if (a[0] === i && a[3] === i && a[6] === i) return i;
    if (a[1] === i && a[4] === i && a[7] === i) return i;
    if (a[2] === i && a[5] === i && a[8] === i) return i;

    if (a[0] === i && a[4] === i && a[8] === i) return i;
    if (a[2] === i && a[4] === i && a[6] === i) return i;

    return null;
  }

  const p1 = player_i_hasWon(1, a);
  const p2 = player_i_hasWon(2, a);

  if (p1) return p1;
  return p2;
}

//////////////////////////////////////////////////////////////
////////////////////////Route handlers////////////////////////
//////////////////////////////////////////////////////////////
const allGames = async (req, res, next) => {
  let games;

  try {
    games = await Game.find();
  } catch {
    const error = new HttpError(
      "Something went wrong, could not look up games.",
      500
    );
    return next(error);
  }

  if (!games) {
    const error = new HttpError(
      `There are currently no active games of ${process.env.gameName}.`,
      404
    );
    return next(error);
  }
  //res.status(200).json({ game: game.toObject({ getters: true }) });
  //places: places.map(place => place.toObject({ getters: true }))
  res
    .status(200)
    .json({ games: games.map((game) => game.toObject({ getters: true })) });
  // res.json({
  //   games: games,
  // });
};

const newGame = async (req, res, next) => {
  const { player1, player2 } = req.body;

  //todo: tengja við User töfluna. Bara nota "player1" sem "creator" til að byrja með

  const createdGame = new Game({
    player1,
    player2,
    tiles: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    player1next: true,
    creator: player1,
  });

  try {
    await createdGame.save();
  } catch (err) {
    const error = new HttpError("Creating game failed, please try again", 500);
    return next(error);
  }

  res.json({
    message: `A new game of ${process.env.gameName} has been successfully created`,
  });
};

const getGameById = async (req, res, next) => {
  const gameId = req.params.gid;
  let game;

  try {
    game = await Game.findById(gameId);
  } catch {
    const error = new HttpError(
      "Something went wrong, could not look up game.",
      500
    );
    return next(error);
  }

  if (!game) {
    const error = new HttpError(
      `There is no game of ${process.env.gameName} with id=${gameId}`,
      404
    );
    return next(error);
  }

  //Check if the game is over
  const winner = isGameOver(game.tiles);
  if (winner) {
    res.status(200).json({ message: "This game is over" });
    return;
  }

  res.json({ game });

  //// TODO:
  //queri sem skoðar grunn og staðfestir user / sessionid
  //sækja svo stöðuna
};

const makeMove = async (req, res, next) => {
  const gameId = req.params.gid;
  const playerId = req.params.pid;

  const { row, col } = req.body;

  try {
    game = await Game.findById(gameId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update game.",
      500
    );
    return next(error);
  }

  if (!game) {
    const error = new HttpError(
      `There is no game of ${process.env.gameName} with id=${gameId}`,
      404
    );
    return next(error);
  }

  const board = game.tiles.slice();

  //Check if the game is over
  const winner = isGameOver(board);
  if (winner) {
    res
      .status(404)
      .json({ message: "This game is over. You can't make any more moves" });
    return;
  }

  //make sure it's the correct players turn
  const player1next = game.player1next;
  if (
    (player1next && !(playerId === game.player1)) ||
    (!player1next && !(playerId === game.player2))
  ) {
    res.status(404).json({ message: "EASY TIGER! IT'S NOT YOUR TURN!" });
    return;
  }

  //Check if the player selected an available action
  if (!isLegal(board, row, col)) {
    res.status(404).json({
      message: "This is not an available action. Please select something else.",
    });
    return;
  }

  //Mark the players move
  updateBoard(board, player1next, row, col);
  game.tiles = board;
  game.player1next = !player1next;

  //Make the changes to the database
  try {
    await game.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the game.",
      500
    );
    return next(error);
  }

  res.status(200).json({ game: game.toObject({ getters: true }) });
};

exports.allGames = allGames;
exports.newGame = newGame;
exports.getGameById = getGameById;
exports.makeMove = makeMove;
