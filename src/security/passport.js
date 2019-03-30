
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
		  done(err, user);
		});
	  });

	/**
	 * Login
	 */
	passport.use(
		'local-login',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			function(req, email, password, done) {
				// callback with email and password from our form
				User.findOne({ $and: [{ email: email }, { active: true }] })
					.select('+password')
					.lean()
					.then(async user => {
						if (!user)
							return done(null, false, {
								message: 'Unknown user'
							});

						await User.comparePassword(password, user.password, function(isMatch, err) {
							if (err) {
								logger.error(err);
								return done(null, false, {
									message: 'Unknown error occurred'
								});
							}

							if (isMatch) return done(null, user);
							else
								return done(null, false, {
									message: 'Invalid password'
								});
						});
					})
					.catch(function(err) {
						logger.error(err);
						return done(err, null);
					});
			}
		)
	);
};
