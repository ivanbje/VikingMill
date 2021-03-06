// const MillBoard = {
//   // "gamestate": [0, 1, 2,
//   //               3, 4, 5,
//   //               6, 7, 8],
//   gamestate: [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   nextPlayer: 1,
//   isOver: false
// };


// function getRow_i(i) {
//   if (i < 0 || i > 2) {
//     const error = new HttpError(
//       "Something went wrong, could not find recipes.",
//       500
//     );
//     return next(error);
//   }
//   return MillBoard.gamestate.slice(i * 3, i * 3 + 3);
// }

// function printBoard() {
//   console.log("Player " + MillBoard.nextPlayer + "'s turn.");
//   console.log(getRow_i(0));
//   console.log(getRow_i(1));
//   console.log(getRow_i(2));
// }

// function updateBoard(player, row, col) {
//   const index = RowColToOneDimensional(row, col);

//   if (player === 1) {
//     MillBoard.gamestate[index] = 1;
//     MillBoard.nextPlayer = 2;
//   } else if (player === 2) {
//     MillBoard.gamestate[index] = 2;
//     MillBoard.nextPlayer = 1;
//   } else {
//     throw "Invalid player! player = " + player;
//   }
// }


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