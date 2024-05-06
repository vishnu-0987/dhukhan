const express = require("express");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/users");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/users", usersRoute);

app.listen(3001, () => {
  console.log(`server is running in 3001`);
});
