const UserService = require('../services/UserService');
const conversationService = require('../services/conversationService');
const messageService = require('../services/messageService');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;

module.exports = {
    ...CRUDrequestHandler(conversationService),
    getList(req, res) {
        conversationService.getByUser(req.params.id)
            .then(resp => res.send(resp))
            .catch(console.log)
    }
};