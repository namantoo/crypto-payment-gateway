// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// require("../db/conn");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const mongoose = require("mongoose");
// const Registration = require("../models/Googleauth");
// const User = require("../models/Emailauth");

// router.get("/google", (req, res, next) => {
//   // console.log("GET /auth/google request received");
//   // Add this line for testing
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })(req, res, next);

//   // Send "test" message to the frontend
 
// });



// router.get("/login/success", (req, res) => {
//   try {
//     const { name, emails, photos, id } = req.user;
//     const user = {
//       familyName: name.familyName,
//       givenName: name.givenName,
//       email: emails[0].value,
//       profile: photos[0].value,
//       id,
//     };
   
//     res.redirect(
//       `http://localhost:3000/middleware?familyName=${user.familyName}&givenName=${user.givenName}&email=${user.email}&id=${user.id}`
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("An error occurred.");
//   }
// });
// router.get("/login/failure", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });
// // Define a middleware function that intercepts the redirect and sends the user data to the frontend
// // Define a middleware function that sends the user data to the frontend
// function sendUserData(req, res, next) {
//   res.json(req.user);
// }
// // Use the middleware function to send the user data to the frontend and redirect the user
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:5050/auth/login/success",
//     failureRedirect: "https://www.google.com",
//   })
// );

// //   (req, res) => {
// //     res.send(req.user); // Send the user object to the frontend
// //     // console.log(req.user)
// // }

// // router.get('/google/callback', (req, res, next) => {
// //     passport.authenticate('google', (err, user, info) => {
// //       if (err) { return next(err); }
// //       if (!user) {
// //         return res.redirect('http://localhost:3002/doahboard'); // Redirect to the login page on authentication failure
// //       }
// //       req.logIn(user, (err) => {
// //         if (err) { return next(err); }
// //         return res.redirect('http://localhost:3002/doahboard'); // Redirect to the dashboard on successful authentication
// //       });
// //     })(req, res, next);
// //   });

// router.get("/logout", (req, res) => {
//   // console.log("logging out")
//   req.logout(); // This clears the user session
//   res.redirect("/"); // Redirect to homepage or any other page after logout
// });

// // router.post("/email", (req, res) => {
// //     console.log(req.body)
// //     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
// //         console.log(hash)
// //         // Store hash in your password DB.
// //         if (err) {
// //             return res.status(500).json({
// //                 error: err
// //             })
// //         }
// //         else {
// //             const register = new Registration({

// //                 email: req.body.email,
// //                 password: hash
// //             });
// //             console.log(register)
// //             register.save()
// //             return res.status(200).json({
// //                 message: res
// //             })
// //         }
// //     });
// //     res.send("new user created")
// // })

// router.post("/email", async (req, res) => {
//   if (!req.body.email || !req.body.password) {
//     // Invalid input
//     return res.status(400).json({
//       error: "Invalid email or password",
//     });
//   }

//   try {
//     const user = await Registration.findOne({ email: req.body.email });

//     if (user) {
//       // User already exists
//       return res.status(409).json({
//         error: "User already exists",
//       });
//     }

//     // User doesn't exist, create a new one
//     const hash = await bcrypt.hash(req.body.password, saltRounds);

//     const register = new User({
//       email: req.body.email,
//       password: hash,
//     });
    

//     await register.save();

//     return res.status(200).json({
//       message: "New user created",
//     });
//   } catch (error) {
//     // Server error
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// });

// module.exports = router;
