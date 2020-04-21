const HttpError = require("../models/http-error");
const Game = require("../models/game");
const { v4: uuidv4 } = require("uuid");

//////////////////////////////////////////////////////////////
//////////////////////////The Board///////////////////////////
//////////////////////////////////////////////////////////////
// const allGames = [];
// const allGameIds = [];

// class MillBoard {
//   static currentId = 0;
//   _id = ++MillBoard.currentId;

//   constructor() {
//     this.gamestate = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//     this.nextPlayer = 1;
//     this.isOver = false;
//   }

//   get id() {
//     return this._id;
//   }

//   getRow_i(i) {
//     if (i < 0 || i > 2) {
//       const error = new HttpError(
//         "Something went wrong, could not find recipes.",
//         500
//       );
//       return next(error);
//     }
//     return this.gamestate.slice(i * 3, i * 3 + 3);
//   }

//   printBoard() {
//     console.log("Player " + this.nextPlayer + "'s turn.");
//     console.log(this.getRow_i(0));
//     console.log(this.getRow_i(1));
//     console.log(this.getRow_i(2));
//   }

//   updateBoard(row, col) {
//     const index = RowColToOneDimensional(row, col);

//     if (this.nextPlayer === 1) {
//       this.gamestate[index] = 1;
//       this.nextPlayer = 2;
//     } else if (this.nextPlayer === 2) {
//       this.gamestate[index] = 2;
//       this.nextPlayer = 1;
//     }
//   }
// }

//////////////////////////////////////////////////////////////
///////////////////////Helper functions///////////////////////
//////////////////////////////////////////////////////////////
function RowColToOneDimensional(row, col) {
  var i = row * 3 + col;
  return i;
}

function updateBoard(boardArray, player1next, row, col) {
  const index = RowColToOneDimensional(row, col);

  if (player1next) {
    boardArray[index] = 1;
  } else {
    boardArray[index] = 2;
  }
}
//////////////////////////////////////////////////////////////
////////////////////////Route handlers////////////////////////
//////////////////////////////////////////////////////////////
const home = (req, res, next) => {
  res.json({
    message: `Welcome to the home page for ${process.env.gameName}!`,
  });
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

  res.json({ game });

  //// TODO:
  //queri sem skoðar grunn og staðfestir user / sessionid
  //sækja svo stöðuna
};

const makeMove = async (req, res, next) => {
  const gameId = req.params.gid;
  const playerId = req.params.pid;

  const { row, col } = req.body;

  //Sami kóði og í getGameById. Skoða best practice í að endurnýta
  try {
    game = await Game.findById(gameId);
  } catch(err) {
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
  //getGameById endar hér

  //make sure it's the correct players turn
  const player1next = game.player1next;

  if ( (player1next && !(playerId === game.player1)) || (!player1next && !(playerId === game.player2)) ){
    // const error = new HttpError(
    //   "IT'S NOT YOUR TURN! WAIT UP",
    //   404
    // );
    // return next(error);
    res.status(404).json({ message: "EASY TIGER! IT'S NOT YOUR TURN!" });
    return;
  }
 
  //Make a copy of the board and mark the player's move
  const board = game.tiles.slice();
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

  // const index = allGameIds.findIndex(x => x === gameId);
  // if (index === -1) {
  //   res.json({
  //     message: `There is no game of ${process.env.gameName} with id=${gameId}`,
  //   });
  // } else {
  //   const mill = allGames[index];
  //   mill.updateBoard(row, col);
  //   mill.printBoard();

  //ath hvort valid session

  //sækja stöðuna

  //todo kalla á fallið makemove héðan

  //// TODO: uppfæra gagnagrunninn

  // res.json({
  //   session: "gae4$Y%%hwghw",
  //   gameId,
  //   playerId,
  //   row1: mill.getRow_i(0),
  //   row2: mill.getRow_i(1),
  //   row3: mill.getRow_i(2),
  // });
};

exports.home = home;
exports.newGame = newGame;
exports.getGameById = getGameById;
exports.makeMove = makeMove;
