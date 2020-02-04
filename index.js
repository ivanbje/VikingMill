// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// const millBoard = matrix(3,3);
//
// function matrix(m, n) {
//   return Array.from({
//     // generate array of length m
//     length: m
//     // inside map function generate array of size n
//     // and fill it with `0`
//   }, () => new Array(n).fill(0));
// };

const millBoard = {
  // "gamestate": [0, 1, 2,
  //               3, 4, 5,
  //               6, 7, 8],
  "gamestate": [0, 0, 0,
                0, 0, 0,
                0, 0, 0],
};

function RowColToOneDimensional(row,col) {
  var i = row*3 + col;
  return i;
};

function makeMove(player, row, col) {
  const index = RowColToOneDimensional(row,col);

  if (player === 1) {
    millBoard.gamestate[index] = 1;
  } else if (player === 2) {
    millBoard.gamestate[index] = 2;
  } else {
    throw "Invalid player! player = " + player;
  }
};

// function makeMove(player, row, col) {
//   if (player === 1) {
//     millBoard[row][col] = 1;
//   } else if (player === 2) {
//     millBoard[row][col] = 2;
//   } else {
//     throw "Invalid player! player = " + player;
//   }
// };

function printBoard() {
  console.log(millBoard.gamestate.slice(0,3));
  console.log(millBoard.gamestate.slice(3,6));
  console.log(millBoard.gamestate.slice(6,9));
};

// printBoard();
makeMove(2, 2, 0);
printBoard();

var myJSON = JSON.stringify(millBoard);
console.log("asdf");
console.log(myJSON);
console.log("asdf");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

});

app.post("/login", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  res.setHeader("Content-Type", "application/json");
  // TODO: Check userdetails

  // TODO: Send error if wrong

  // TODO: Create Session-id

  // TODO: insert session id in database

  res.json({
    'session': 'gae4$Y%%hwghw'
  });

  res.send();
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// const server = app.listen(8080, () => {
//   const host = server.address().address;
//   const port = server.address().port;
// });