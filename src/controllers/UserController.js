const UserService = require('../services/UserService');

module.exports = {
	getUserName(req, res) {
		UserService.getUsernameById(req.body.id)
			.then(response => {
				console.log(response);
				res.send(response);
			})
			.catch(err => {
				res.sendStatus(400);
			})
	},
	get(req, res) {
		UserService.get(req.params.query, req.body.username)
			.then(response => {
				console.log(response);
				res.send(response);
			})
			.catch(err => {
				res.sendStatus(400);
			})
	},
	onSignUp(req, res) {
		UserService.add(req.body)
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