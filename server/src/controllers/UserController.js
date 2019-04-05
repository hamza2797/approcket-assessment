const UserService = require('../services/UserService');

module.exports = {
	get(req, res) {
		UserService.get(req.params.id)
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.sendStatus(400);
			})
	},
	search(req, res) {

		UserService.search(req.body.username, req.body.userId)
			.then(response => {
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
	},
	getAll(req, res){
		UserService.getAll()
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.sendStatus(400);
			})
	}
};