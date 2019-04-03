const UserService = require('../services/UserService');
const publicService = require('../services/publicConversationService');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;

module.exports = {
    ...CRUDrequestHandler(publicService),
    addUser(req, res) {
        publicService.addUser(req.params.id, req.body)
            .then(resp => res.send(resp))
            .catch(console.log)
    },
    removeUser(req, res) {
        publicService.removeUser(req.params.id, req.body)
            .then(resp => res.send(resp))
            .catch(console.log)
    }
};