// Dependencies
// =============================================================
var db = require("../models");
var bCrypt = require('bcrypt-nodejs');

// prepare for export
module.exports = function(passport, user) {
var User = db.Users;
	// load all the things we need
	var LocalStrategy = require('passport-local').Strategy;

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
	     // process.nextTick(function() {
	     	var generateHash = function(password) {
	     					return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
	     				};
			 // find a user whose email is the same as the forms email
			 // we are checking to see if the user trying to login already exists
			User.findOne({ where: {
			    email: email
			  } }).then(function(user) {

			     // check to see if theres already a user with that email
			     if (user) {
			         return done(null, false, {message: 'That email is already taken.'}); 
			     } else {
			     	var userPassword = generateHash(password);
			     	var data = {
						email: email, //come back to match ana file
						password: userPassword, //come back to match ana file
					};
					//create a new user
					// console.log("req.body is: " + req.body);
					db.Users.create(data).then(function(newUser, created) {
						//if not a new user, don't make a new user
						if (!newUser) {
							return done(null, false);
						}
						if (newUser) {
							console.log("Success! New user added to dB: " + newUser.email);
							return done(null, newUser);
						}
					});
			     };

			 });    

	     // });

	 })); //End Local Signup


	 // SERIALIZE ===============================================================
	 // =========================================================================
	 passport.serializeUser(function(user, done) {
	 	console.log("serializing");
	 	console.log("done: " + done);
	 	done(null, user.id);
	 	console.log("done serializing user.id: " + user.id);
	 });
	 // deserialize user
	 passport.deserializeUser(function(id, done) {
	 	console.log("DEserializing id: " + id);
	 	console.log("done: " + done);
	 	User.findById(id).then(function(user) {
	 		if (user) {
	 			console.log(user.get());
	 			debugger;
	 			done(null, user);
	 		} else {
	 			done(user.errors, null);
	 		}
	 	});
	 });

 
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
     	var User = db.Users;
     	console.log("req : " + req.body);
     	console.log("email : " + email);
     	console.log("password : " + password);
     	console.log("done : " + done);

     	//encrypt password
     	var isValidPassword = function(userpass, password) {
 			console.log("isvalidPassword() is running");
			return bCrypt.compareSync(password, userpass);
		};
         // find a user whose email is the same as the forms email
         // we are checking to see if the user trying to login already exists
         User.findOne({ where: {
        	email: email
      	 	} }).then(function(user) {

      	 		if (!user) {
      	 			console.log("No user by that email.");
					return done(null, false, {
						message: 'There is no account associated with that email.'
					});
				}
				//if password isn't right, alert user
				if (!isValidPassword(user.password, password)) {
					console.log("Incorrect password.");
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}
				var userinfo = user.get();
				console.log("Logging in..." + userinfo.email);
				return done(null, userinfo);
				//if an error is thrown, alert user
				}).catch(function(err) {
					console.log("Error:", err);
					return done(null, false, {
						message: 'Something went wrong with your login.'
					});
				});
     }));  // End local login

} // end module export

