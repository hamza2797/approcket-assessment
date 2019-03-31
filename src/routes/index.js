const UserController = require('../controllers').UserController;
const conversationController = require('../controllers').ConversationController;

module.exports = function(app, passport) {
	app.get('/signup', UserController.onSignUp);
	app.post('/login', passport.authenticate('local-login'), UserController.onLogin);
	app.route('/conversation/:id')
		.get(conversationController.get)
		.post(conversationController.add)
		.delete(conversationController.remove)
		.patch(conversationController.update)
};