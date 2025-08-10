var sql = require("mysql2");
var queries = require("../queries/Auth");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

async function sign_up(req, res) {
  try {
    const { username, password, email, role_id } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const signUpQuery = queries.sign_up;

    await connection.query(
      signUpQuery,
      [username, email, hashedPassword, role_id]
    );

    res.json({
      status: "success",
      message: "User Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body;
    const verifyDetails = queries.verifyDetails;

    const [result] = await global.connection.query(verifyDetails, [email]);

    if (result.length === 0) {
      return res.json({
        status: "failed",
        message: "User not registered",
      });
    }

    const user = result[0];

    if (user.is_active === 0) {
      return res.json({
        status: "failed",
        message: "User is not active. Please contact support.",
      });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.json({
        status: "failed",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { user_id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    req.session.user = user;

    return res.json({
      status: "success",
      message: "Logged in successfully",
      sessionID: req.sessionID,
      user_id: user.id,
      username: user.name,
      role: user.role,
      token: token,
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      status: "error",
      message: "An error occurred during login.",
    });
  }
}


async function getAllUsers(req, res) {
  try {
    const query = queries.getAllUsers;
    const [results] = await connection.query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 


module.exports = {
  sign_up,
  login,
  getAllUsers
};
