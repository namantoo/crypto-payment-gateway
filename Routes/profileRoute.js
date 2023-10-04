// const express = require("express");
// const router = express.Router();
// require("../db/conn");
// const mongoose = require("mongoose");
// const Profile = require("../models/Profile")

// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "this is create message api get",
//   });
// });

// router.post("/", (req, res) =>{
//     console.log(req.body.news_headline)
//      const profile = new Profile   ({
//         email: req.body.email,
//         fullName: req.body.fullName,
//         country: req.body.country,
//         code: req.body.code,
//         pnumber: req.body.pnumber,
//         texp: req.body.texp,
//         holdings: req.body.holdings,
//      });
//      console.log(profile)
//      profile.save()
//      res.send("working")
     
//  })
// module.exports = router;
