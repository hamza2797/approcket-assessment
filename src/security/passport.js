
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, null, { autopopulate: false }).lean()
			.then((resp) => done(null, user))
			.catch((err) => done(err, null))
	})

	//Login
	passport.use('local-login', new LocalStrategy(
		function (username, password, done) {
			User.findOne({ username: username }, function (err, user) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				User.comparePassword(password, user.password, function (err, isMatch) {
					
					if (err) throw err;
					if (isMatch) return done(null, user);
					else {
						return done(null, false);
					}
				});
			});
		}
	));
};
