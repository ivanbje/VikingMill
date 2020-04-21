const { validationResult } = require("express-validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = (req, res, next) => {
  res
    .status(201)
    .json({ message: "getUsers"});
};

const getUserById = (req, res, next) => {
  res
    .status(201)
    .json({ message: "getuserById"});
};

const signup = (req, res, next) => {
  res
    .status(201)
    .json({ message: "signup"});
};

const login = (req, res, next) => {
  res
    .status(201)
    .json({ message: "login"});
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
