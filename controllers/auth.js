const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

const PRIVATE_KEY = fs.readFileSync(
  path.join(__dirname, "..", "keys", "private.pem")
);

const hashPassword = (password, salt) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};


exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, username, emailAddress, password } = req.body;

    const salt = crypto.randomUUID();

    const encpy_password = await hashPassword(password, salt);

    const user = new User({
      firstName: firstName,
      lastName: lastName ? lastName : "",
      username: username ? username : emailAddress,
      sapId: sapId,
      emailAddress: emailAddress,
      salt: salt,
      encpy_password: encpy_password,
    });

    const response = await user.save();

    response.salt = undefined;
    response.encpy_password = undefined;
    response.adhaarNumber ? (response.adhaarNumber = undefined) : null;
    response.apaarId ? (response.apaarId = undefined) : null;
    response.contactNumber ? (response.contactNumber = undefined) : null;

    const token = jwt.sign(
      {
        _id: response._id, //User ID
        user: response,
      },
      PRIVATE_KEY, //Private Key
      {
        algorithm: "RS256", //Algorithm
        allowInsecureKeySizes: true, //Must Be False In Production
        expiresIn: "30min", //Expiry
      }
    );

    let time = new Date(); //get current time
    time.setTime(time.getTime() + 1800 * 1000); //change the time to unix

    //generate cookie with name auth and value as jwtToken
    res.cookie("auth", token, {
      expire: time, //expire time
      path: "/", //path of the cookie
      domain: process.env.DOMAIN, //domain of the site
    });

    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      token: token,
      dbRes: response,
    });
  } catch (err) {
    logger.error(`Error: ${err.toString()}`);
    return res.status(400).json({
      error: true,
      message: "An Unexpected Error Occured!",
      errorJSON: err,
      errorString: err.toString(),
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    console.log(emailAddress, password);
    const response = await User.findOne({ emailAddress });

    if (!response)
      return res.status(401).json({
        error: true,
        message: "User / Password Incorrect!",
      });

const encpy_password = await hashPassword(password, response.salt);
    const storedPasswordBuffer = Buffer.from(response.encpy_password, "utf-8");
    const inputPasswordBuffer = Buffer.from(encpy_password, "utf-8");

    if (!crypto.timingSafeEqual(storedPasswordBuffer, inputPasswordBuffer)) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials!" });
    }
    response.salt = undefined;
    response.encpy_password = undefined;
    response.adhaarNumber ? (response.adhaarNumber = undefined) : null;
    response.apaarId ? (response.apaarId = undefined) : null;
    response.contactNumber ? (response.contactNumber = undefined) : null;
    const token = jwt.sign(
      {
        _id: response._id, //User ID
        user: response,
      },
      PRIVATE_KEY, //Private Key
      {
        algorithm: "RS256", //Algorithm
        allowInsecureKeySizes: true, //Must Be False In Production
        expiresIn: "30min", //Expiry
      }
    );

    let time = new Date(); //get current time
    time.setTime(time.getTime() + 1800 * 1000); //change the time to unix

    //generate cookie with name auth and value as jwtToken
    res.cookie("auth", token, {
      expire: time, //expire time
      path: "/", //path of the cookie
      domain: process.env.DOMAIN, //domain of the site
    });
    logger.info(`User Logged In With The SAPID: ${response.sapId}`);
    res.status(200).json({
      success: true,
      message: "Logged In!",
      dbRes: response,
      token: token,
    });
  } catch (err) {
    logger.error(`Error: ${err.toString()}`);
    return res.status(400).json({
      error: true,
      message: "An Unexpected Error Occured!",
      errorJSON: err,
      errorString: err.toString(),
    });
  }
};

exports.loggout = async (req, res) => {
  try {
    //Clear The Cookie
    res.clearCookie("auth", {
      path: "/",
      domain: process.env.DOMAIN,
      expires: new Date(1),
    });
    //Give Success Status
    res.status(200).json({
      logout: true,
      redirect: true,
    });
  } catch (err) {
    logger.error(`Error: ${err.toString()}`);
    res.status(400).json({
      error: true,
      message: err,
    });
  }
};
