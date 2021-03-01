export {};
const express = require("express");
const userRoutes = require("./routes/user");
const app = express();

app.use(express.json());

app.use("/api", userRoutes);
app.listen(process.env.PORT || "3002", () => {
  console.log(`Server is running on port: ${process.env.PORT || "3002"}`);
});