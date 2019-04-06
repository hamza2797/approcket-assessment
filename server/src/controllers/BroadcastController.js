const broadcastService = require('../services/broadcastService');
const util = require('../util/index');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;


module.exports = {
	...CRUDrequestHandler(broadcastService),
	get(req, res){
		return broadcastService.getAll()
			.then((resp) => {
				res.send(resp);
			})
	},
    async add(req, res) {
        const result = await broadcastService.add(req.body);
        res.sendStatus(200);
        req.io.emit('broadcast', result);
    }
};