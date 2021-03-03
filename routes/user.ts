import * as express from "express";
const userController = require("../controllers/user");
const router = express.Router();
router.get("/", async (request, response) => {
  response.json({
    message: "Hello",
  });
});
router.get("/users", userController.getAll);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
module.exports = router;
