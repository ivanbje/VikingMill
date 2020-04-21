const express = require("express");
const { check } = require("express-validator");

const millsControllers = require("../controllers/mills-controllers");

const router = express.Router();

router.get("/", millsControllers.home);

router.post("/newgame", millsControllers.newGame);

router.get("/game/:gid", millsControllers.getGameById);

//router.post("/game/:gid/player/:pid/makemove", millsControllers.makeMove);
router.patch("/game/:gid/player/:pid/makemove", millsControllers.makeMove);

module.exports = router;
