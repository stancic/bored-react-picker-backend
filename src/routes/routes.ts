const express = require("express");
const db = require("../db/db");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { v4 as uuidv4 } from "uuid";

// GET ALL USERS
router.get("/", async (req, res, next) => {
  try {
    let results = await db.getAll();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// CREATE USER
router.post("/signup", async (req, res, next) => {
  let userId = uuidv4();
  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(req.body.password, saltRounds);
  const userExists = await db.getOne(req.body.username, req.body.email);
  const user = {
    id: userId,
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
  };
  if (userExists) {
    res.status(409).json({
      message: "Username or email already exists",
    });
  } else {
    try {
      let result = await db.signUp(
        user.id,
        user.username,
        user.email,
        user.password
      );
      res.status(200).json({ message: "User created", user });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
});

module.exports = router;
