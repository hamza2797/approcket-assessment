const UserService = require('../services/UserService');
const privateService = require('../services/privateConversationService');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;

module.exports = {
    ...CRUDrequestHandler(privateService),
    getList(req, res) {
        conversationService.getByUser(req.params.id)
            .then(resp => res.send(resp))
            .catch(console.log)
    }
};