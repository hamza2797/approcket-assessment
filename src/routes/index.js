const UserController = require('../controllers').UserController;


module.exports = function(app) {
	app.get('/signup', UserController.onSignUp);
};