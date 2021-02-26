const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
router.get("/", async (request, response) => {
  response.json({
    message: "Hello",
  });
});
router.get("/users", userController.getAll);
module.exports = router;
