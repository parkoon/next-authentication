const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

const MASTER = {
  accountName: "parkoon@gmail.com",
  password: "1234",
};

app.use(cors());
app.use(express.json());
const JWT_SECRET = "supersecret#!@$";

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

app.post("/account/login", (req, res) => {
  const { accountName, password } = req.body;
  if (accountName === MASTER.accountName && password === MASTER.password) {
    return res.json({
      token: generateToken({ accountName }),
    });
  }

  res.status(400).json({
    message: "invalid email or password",
  });
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
