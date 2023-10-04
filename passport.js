const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
// const Google = require('./models/Googleauth')
const session = require('express-session');
// Use express-session middleware
// app.use(session({
//   secret: 'thisiscodinggenuisnaman',
//   resave: false,
//   saveUninitialized: true
// }));
passport.use(new GoogleStrategy({
    clientID: '176030128280-prqstpg8pde7ki8l9n9l11tsfigjtceh.apps.googleusercontent.com', // Replace with your own Google client ID
    clientSecret: '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', // Replace with your own Google client secret
    callbackURL: '/auth/google/callback', // Replace with your own callback URL
  
  }, async (accessToken, refreshToken, profile, cb)=> {
    // console.log(profile)
   

    // const existingUser = await Google.findOne({ googleId: profile.id })
    // if (existingUser) {
    //   // console.log('User Already Exists In database: ', existingUser)
    // } else {
    //   const userdata = new Google({
    //     fullName: `${profile.name.givenName} ${profile.name.familyName}`,
    //     email: profile.emails[0].value,
    //     picture: profile.photos[0].value,
    //     googleId: profile.id
    //   })
    //   userdata.save()
        // .then(savedNotice => {
        //   // console.log('Notice saved to the database:', savedNotice);
        // })
        // .catch(err => {
        //   // console.error('Error saving notice to the database:', err);
        // });
        cb(null, profile)
    }
    
    
  ));
  
  // Serialize and deserialize user data for session management
// Passport.js configuration
passport.serializeUser(function(user, done) {
  // Store user details in session

  
  done(null, user);
});
passport.serializeUser(function(user, done) {
  // console.log(user);
  // Serialize user data here
  done(null, user);
});


  passport.deserializeUser(async (obj, cb) => {
    cb(null, obj)
  });

  module.exports = passport;