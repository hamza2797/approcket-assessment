const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

module.exports = {

	onSignUp(req, res) {
		console.log('here');
		//req.body
		//req.validation here
		var body = {
			username: "hamza2",
			password: "lol"
		}
		AuthService.signup(body);
		res.send('lego');
	},
	onLogin(req, res) {
		UserService.get(req.user._id, true)
			.select({ username: 1})
			.then(user => {
				res.send({
					user: {
						id: req.user._id,
						username: req.username
					}
				});
			})
	}
};