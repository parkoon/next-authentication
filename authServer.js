const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

const MASTER = {
  accountName: "parkoon@gmail.com",
  password: "1234",
  gender: "male",
  age: "31",
  phone: "010-0000-0000",
};

app.use(cors());
app.use(express.json());

const JWT_SECRET = "supersecret#!@$";

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
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

function protect(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).json({ message: "Who are u" });
  if (!authorization.startsWith("Bearer"))
    return res.status(400).json({ message: "Who are u" });

  const token = authorization.split(" ")[1];
  const decoded = verifyToken(token);

  console.log("You are logged user");
  if (decoded) {
    next();
  }
}
app.get("/account/me", protect, (req, res) => {
  res.json({
    user: {
      ...MASTER,
      password: "",
    },
  });
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
