const AuthService = require('../services/AuthService');

module.exports = {
	onSignUp(req, res) {
		console.log('here');
		//req.body
		//req.validation here
		var body = {
			username:"hamza",
			password:"lol"
		}
		AuthService.signup(body);
		res.send("here");
	}
};