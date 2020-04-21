const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    //gameId: {type: String, required: true },
    player1: {type: String, required: true},
    player2: {type: String, required: true},
    tiles: [{type: Number, required: true}],
    player1next: {type: Boolean, required: true},     //Segir til um hver á að gera næst
    creator: {type: String, required: true}
    //creator: {type: mongoose.Types.ObjectId, required: true, ref: "User"}
});

gameSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Game", gameSchema);