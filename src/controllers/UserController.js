const UserService = require('../services/UserService');

module.exports = {

	onSignUp(req, res) {
		console.log('here');
		//req.body
		//req.validation here
		var body = {
			username: "hamza212323",
			password: "lol"
		}
		UserService.add(body)
			.then(response => {
				res.sendStatus(200);
			})
			.catch(err => {
				res.sendStatus(400);
			})

	},
	onLogin(req, res) {
		res.send({
			user: {
				id: req.user._id,
				username: req.user.username
			}
		});
	}
};