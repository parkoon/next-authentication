const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const MASTER = {
  email: "parkoon@gmail.com",
  password: 1234,
};

const JWT_SECRET = "supersecret#!@$";

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

app.post("/account/login", (req, res) => {
  const { email, password } = req.body;

  if (email === MASTER.email && password === MASTER.password) {
    res.json({
      token: generateToken({ email }),
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
