const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let db = null;

const dbPath = path.join(__dirname, "../databases/ecommerce.db");

const initializeDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (e) {
    console.log("db Error", e.message());
  }
};

exports.createUser = async (req, res) => {
  try {
    await initializeDb();
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
      const createUserQuery = `
            INSERT INTO 
                users (username, email, password) 
            VALUES 
                (
                '${username}', 
                '${email}',
                '${hashedPassword}'
                
                )`;
      const dbResponse = await db.run(createUserQuery);
      const newUserId = dbResponse.lastID;
      res.json({ message: `Created new user with ID: ${newUserId}` }); // Send response in JSON format
    } else {
      res.status(400).json({ error: "User already exists" }); // Send response in JSON format
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Send response in JSON format
  }
};

exports.loginUser = async (req, res) => {
  try {
    await initializeDb();
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username, password);
    const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
      res.status(400).json({ error: "Invalid User" }); // Send response in JSON format
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      if (isPasswordMatched === true) {
        const payload = {
          username: username,
        };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        res.json({ jwtToken }); // Send response in JSON format
      } else {
        res.status(400).json({ error: "Username and password doesn't match" }); // Send response in JSON format
      }
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Send response in JSON format
  }
};
