const express = require("express");
const { check } = require("express-validator");

const millsControllers = require("../controllers/mills-controllers");

const router = express.Router();

router.get("/", millsControllers.allGames);

router.post("/newgame", millsControllers.newGame);

router.get("/game/:gid", millsControllers.getGameById);

router.patch("/game/:gid/player/:pid/makemove", millsControllers.makeMove);

module.exports = router;
