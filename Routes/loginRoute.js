const express = require("express");
const router = express.Router();
const User = require("../models/Emailauth");
require("../db/conn");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { response } = require("express");
const Google = require('../models/Googleauth')
  
const bcrypt = require("bcrypt");
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "this is create message api get",
  });
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const key = "D48567DBSLFKSFD3243224K4EDDF64DB25A64F3169C2"
    
    User.find({ email: req.body.email }).then((user) => {
      console.log(user.length);
      if (user.length < 1) {
        return res.status(401).json({
          message: "user does not exists",
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

router.post("/creategoogleuser", async (req, res) => {
  try {
    const { givenName, familyName, email, profile, id } = req.body;
    const existingUser = await Google.findOne({ googleId: id })
    if (existingUser) {
      existingUser.fullName = `${givenName} ${familyName}`;
      existingUser.email = email;
      existingUser.picture = profile;
      await existingUser.save();
      res.send({ status: "true"})
      console.log('User Updated In database: ', existingUser)
    } else {
      const userdata = new Google({
        fullName: `${req.body.givenName} ${req.body.familyName}`,
        email: req.body.email,
        picture: req.body.profile,
        googleId: req.body.id
      })
      userdata.save()
      console.log("saved")
      res.send({ status: "false"})
  } } catch(e){
    res.send(e)
  }

}); 
router.post("/googlesignuptoken", async (req, res) => {
  try{
    const { email } = req.body;
    const key = "D48567DBSLFKSFD3243224K4EDDF64DB25A64F3169C2"
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
  
  }
  catch(e){
    console.log(e)
  }
})
router.post("/settoken", async (req, res) => {
  try {
    const {  refreshToken } = req.body;
    const key = "D48567DBSLFKSFD3243224K4EDDF64DB25A64F3169C2"
    const userVer = jwt.verify(refreshToken, key);
    console.log(userVer);
    if(userVer){
         const resetAccessToken = jwt.sign(
      { sub: userVer.email},
      key,
      {
        expiresIn: "3m",
      }
    );
    // const refresh = jwt.sign(
    //   { email: userVer.email, password: userVer.password  },
    //   "thisisaproductionbuildapiforourstartup",
    //   {
    //     expiresIn: "5m",
    //   }
    // );

    // }
    res.send({ admin: { access: `${resetAccessToken}`} });
    console.log("hey");
  } }catch (e) {
    res.send(e);
  }
});

router.post("/resetpassword", async (req, res) => {
  try {
    const { email, password, newpassword } = req.body;
    User.find({ email: req.body.email }).then((user) => {
      console.log(user.length);
      if (user.length < 1) {
        return res.status(404).json({
          message: "user does not exists",
        });
      }
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, result) {
          if (!result) {
            return res.status(401).json({
              message: "old password does not match",
            });
          }
         
            if (result) {
              bcrypt.hash(newpassword, saltRounds, async function (err, hash) {
                if (err) {
                  return res.status(500).json({
                    error: err,
                  });
                }
                user[0].password = hash;
                await user[0].save();
                return res.status(200).json({
                  message: "Password updated successfully",
                });
              });
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
