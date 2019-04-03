const UserService = require('../services/UserService');
const conversationService = require('../services/conversationService');
const messageService = require('../services/messageService');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;

module.exports = {
    ...CRUDrequestHandler(messageService),
    getList(req, res) {
        messageService.getByConversation(req.params.id)
            .then(resp => res.send(resp))
            .catch(err => console.log)
    }
};