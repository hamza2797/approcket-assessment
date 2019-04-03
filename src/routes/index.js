const UserController = require('../controllers').UserController;
const conversationController = require('../controllers').ConversationController;
const privateController = require('../controllers').PrivateController;
const messageController = require('../controllers').MessageController;

module.exports = function (app, passport) {
	app.post('/signup', UserController.onSignUp);
	app.post('/login', passport.authenticate('local-login'), UserController.onLogin);
	app.post('/people/:query', UserController.get);
	app.post('/getUsername', UserController.getUserName);
	app.route('/privateConversation/:id')
		.get(conversationController.get)
//		.post(privateController.add)
		.delete(conversationController.remove)
		.patch(conversationController.update)
	app.route('/messages/:id')
		.get(messageController.getList)
		.post(messageController.add)
	app.route('/friendList/:id')
		.get(conversationController.getList) //get convo list
	//app.route('/messages/:id')
	//	.get(conversationController.getList) //get convo list
	//	.post(conversationController.addToGroup) //adding user(s) to group
	//	.delete(conversationController.removeFromGroup) //removing user(s) from group
};