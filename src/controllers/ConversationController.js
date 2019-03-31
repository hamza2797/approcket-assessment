const UserService = require('../services/UserService');
const conversationService = require('../services/conversationService');
const messageServiceService = require('../services/messageService');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;

module.exports = {
    ...CRUDrequestHandler(conversationService)
};