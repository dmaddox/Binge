// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

var bcrypt   = require('bcrypt-nodejs');


// Requiring our models
var db = require("../models");

// prepare for export
module.exports = function(passport) {

// =========================================================================
// passport is logged in? ==================================================
// =========================================================================
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signin');
  };
 
 // =========================================================================
 // passport session setup ==================================================
 // =========================================================================
 // required for persistent login sessions
 // passport needs ability to serialize and unserialize users out of session

 // used to serialize the user for the session
 passport.serializeUser(function(user, done) {
     done(null, user.id);
 });

 // used to deserialize the user
 passport.deserializeUser(function(id, done) {
     db.Users.findById(id, function(err, user) {
         done(err, user);
     });
 });

 // =========================================================================
 // LOCAL SIGNUP ============================================================
 // =========================================================================
 // we are using named strategies since we have one for login and one for signup
 // by default, if there was no name, it would just be called 'local'

 passport.use('local-signup', new LocalStrategy({
     // by default, local strategy uses username and password, we will override with email
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true // allows us to pass back the entire request to the callback
 },
 function(req, email, password, done) {
     // asynchronous
     // User.findOne wont fire unless data is sent back
     process.nextTick(function() {
     // find a user whose email is the same as the forms email
     // we are checking to see if the user trying to login already exists
    db.Users.findOne({ where: {
        email: email
      } }).then(function(err, user) {

         // if there are any errors, return the error
         if (err) 
             return done(err);

         // check to see if theres already a user with that email
         if (user) {
             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
         } else {
         	console.log("creating new user instance");
             // if there is no user with that email
             // create the user
             var newUser            = new db.Users();

             // set the user's local credentials
             newUser.email    = email;
             newUser.password = newUser.generateHash(password);

             // save the user instance
             newUser.save().then(function(res){
			    console.log("saving");
			    // console.log(res);
			    return done(res);
			  })
			  .catch(function(error){
			    throw err;
			  });

           //   .then(function(err, res) {
           //   	console.log("newUser is: " + newUser);
           //   	console.log("res is: " + res);
           //       if (err) {
           //           throw err;
           //       } else {
           //       console.log("saving");
           //       return done(null, res);
         		// };
           //   });
         };

     });    

     });

 })); //End Local Signup

 // =========================================================================
     // LOCAL LOGIN =============================================================
     // =========================================================================
     // we are using named strategies since we have one for login and one for signup
     // by default, if there was no name, it would just be called 'local'

     passport.use('local-login', new LocalStrategy({
         // by default, local strategy uses username and password, we will override with email
         usernameField : 'email',
         passwordField : 'password',
         passReqToCallback : true // allows us to pass back the entire request to the callback
     },
     function(req, email, password, done) { // callback with email and password from our form

         // find a user whose email is the same as the forms email
         // we are checking to see if the user trying to login already exists
         db.Users.findOne({ where: {
        	email: email
      	 	} }).then(function(user, err) {
      	 		console.log(user);
             // if there are any errors, return the error before anything else
             if (err) {
             	console.log("error");
                 return done(err);
             }

             // if no user is found, return the message
             if (!user){
             	console.log("no user found");
                 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
             }

             // if the user is found but the password is wrong
             if (!user.validPassword(user.password, password)) {
             	console.log("wrong password");
                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
             }

             // all is well, return successful user
             console.log("validated");
             return done(null, user);
         });

     })); 

 // };

} // end module export

