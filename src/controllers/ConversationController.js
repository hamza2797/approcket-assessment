const UserService = require('../services/UserService');
const conversationService = require('../services/conversationService');
const messageServiceService = require('../services/messageService');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;

module.exports = {
    ...CRUDrequestHandler(conversationService),
    getList(){
        conversationService.getByUser(req.params.id)
            .then(resp => res.send(resp))
            .catch(console.log)
    },
    addToGroup(){
        conversationService.addUser(req.params.id, req.body.users)
            .then(resp => res.send(resp))
            .catch(console.log)
    },
    removeFromGroup(){
        conversationService.removeUser(req.params.id, req.body.users)
            .then(resp => res.send(resp))
            .catch(console.log)
    }
};