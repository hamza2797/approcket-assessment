const UserController = require('../controllers').UserController;
const conversationController = require('../controllers').ConversationController;
const privateController = require('../controllers').PrivateController;
const publicController = require('../controllers').PublicController;
const messageController = require('../controllers').MessageController;

module.exports = function (app, passport) {
	app.post('/signup', UserController.onSignUp);
	app.post('/login', passport.authenticate('local-login'), UserController.onLogin);
	
	
	app.use(function(req, res, next) {
		if (req.isAuthenticated()) next();
		else res.sendStatus(401);
	});
	
	
	app.post('/user/:id', UserController.get);
	app.post('/user/search', UserController.search);
	app.route('/user/conversation/:id')
		.get(conversationController.getList) //get convo list


	app.route('/conversation/:id/messages')
		.get(messageController.getByConversation)

	
	app.post('/conversation/private', privateController.add)
	app.route('/conversation/private/:id')
		.get(conversationController.get)
	

	app.post('/conversation/public', publicController.add)
	app.route('/conversation/public/:id')
		.get(conversationController.get)
		.patch(publicController.update)

	app.route('/conversation/public/:id/user')
		.post(publicController.addUser) //adding user(s) to group
		.delete(publicController.removeUser) //removing user(s) from group

	
	app.post('/message/add', messageController.add)
	//app.delete('/message/:id', messageController.delete)

};