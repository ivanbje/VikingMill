// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();



app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

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

function printBoard() {
	console.log(millBoard.gamestate.slice(0,3));
	console.log(millBoard.gamestate.slice(3,6));
	console.log(millBoard.gamestate.slice(6,9));
};

makeMove(2, 2, 0);
printBoard();

var myJSON = JSON.stringify(millBoard);

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});


//game-id = 1 til að byrja með
app.get("/mill/id/:gameId", function(req, res) {
  console.log(printBoard());
});




// app.get("/mill/row/:row/col/:col", function(req, res) {
//   console.log("row: "+ req.params.row);
//   console.log("col: "+ req.params.col);
// // });

app.post("/mill", function(req, res) {
  res.setHeader("Content-Type", "application/json");

  console.log("row: "+ req.body.row);
  console.log("col: "+ req.body.col);
  console.log(req.body);

  res.json({
    'session': 'gae4$Y%%hwghw',
    'row': "1",
    'col': req.body.col,
  });

  res.send();
});

app.post("/makemove", function(req,res) {

});


app.post("/login", function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
  console.log(req.body)

  res.json({
    'username': username,
    'password': password
  })
});


//app.listen(3000, function() {
//	console.log("Server started on port 3000");
//});

 const server = app.listen(8080, () => {
   const host = server.address().address;
   const port = server.address().port;
 });
