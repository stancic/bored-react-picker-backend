const express = require("express");
const db = require("../db/db");
const router = express.Router();

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

// GET ONE USER
router.get("/:id", async (req, res, next) => {
  try {
    let results = await db.getOne(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
