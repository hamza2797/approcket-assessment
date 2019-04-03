const check = require('check-types');
const BaseService = require('./BaseService');
const user = require('../models/user');
const privateConversation = require('../models/privateConversation');


class privateConversationService extends BaseService {
    constructor() {
        super(privateConversation)
    }
}

module.exports = new privateConversationService();