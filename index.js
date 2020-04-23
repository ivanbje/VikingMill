// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const millsRoutes = require("./routes/mills-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();
const port = 5000;

app.use(bodyParser.json());

//Skítmix frá Stackoverflow til að fá ekki error þegar ég reyni að fetcha með React
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", ["http://localhost:3000", "https://viking-mill-15192.web.app"]);
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//<website-name>/mill
//<website-name>/mill/id/:gid
//<website-name>/mill/id/:gid/player/:pid/makemove

app.use("/api/mill", millsRoutes);

// app.post("/login", function (req, res) {
//   var username = req.body.username;
//   var password = req.body.password;
//   console.log(req.body);

//   res.json({
//     username: username,
//     password: password,
//   });
// });

//Handle unsupported routes
app.use((res, req, next) => {
  throw new HttpError("Could not find this route", 404);
});

// const server = app.listen(8080, () => {
//   const host = server.address().address;
//   const port = server.address().port;
// });

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//const url2= `mongodb+srv://markus:<password>@viking-mill-cydhu.mongodb.net/test?retryWrites=true&w=majority`
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@viking-mill-cydhu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
