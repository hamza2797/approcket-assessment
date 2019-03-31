const UserController = require('../controllers').UserController;


module.exports = function(app, passport) {
	app.get('/signup', UserController.onSignUp);
	app.post('/login', passport.authenticate('local-login'), UserController.onLogin);
};