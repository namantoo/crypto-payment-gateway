const express = require("express");
const router = express.Router();
const Merchant = require("../models/AddMerchant");

require("../db/conn");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { response } = require("express");
const Google = require('../models/Googleauth')
// bcrypt hashing 
const bcrypt = require("bcrypt");
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "this is create message api get",
  });
});
// create new merchant
router.post("/create", async (req, res) => {
    if (!req.body.email || !req.body.password) {
      // Invalid input
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }
    try {
      const user = await Merchant.findOne({ email: req.body.email });
      if (user) {
        // User already exists
        return res.status(409).json({
          error: "Merchant already exists",
        });
      }
      // User doesn't exist, create a new one
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      const register = new Merchant({
        name: req.body.name,
        app_name: req.body.app_name,
        app_link: req.body.app_link,
        email: req.body.email,
        password: hash,
      });
      await register.save();
      return res.status(200).json({
        message: "New merchant account created",
      });
    } catch (error) {
      // Server error
      return res.status(500).json({
        error: error.message,
      });
    }
  });
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const key = "thisisaproductionbuildapikey"
      Merchant.find({ email: req.body.email }).then((user) => {
        console.log(user.length);
        if (user.length < 1) {
          return res.status(401).json({
            message: "Merchant does not exists",
          });
        }
        bcrypt.compare(
          req.body.password,
          user[0].password,
          function (err, result) {
            if (!result) {
              return res.status(401).json({
                message: "password does not match",
              });
            }
            if (result) {
              const token = jwt.sign(
                { sub: email },
                key,
                {
                  expiresIn: "24h",
                }
              );
              const refresh = jwt.sign(
                { sub: email },
                key,
                {
                  expiresIn: "24h",
                }
              );
              console.log(token);
              const userVer = jwt.verify(
                token,
                key
              );
              console.log(userVer);
              res.send({ user: { email: `${email}`, access: `${token}`, refresh: `${refresh}` } });
              console.log(user);
            }
            // result == true
          }
        );
      });
    } catch (e) {
      res.send(e);
    }
  });
  

module.exports = router;
