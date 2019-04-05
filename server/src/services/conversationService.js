const check = require('check-types');
const BaseService = require('./BaseService');
const conversation = require('../models/conversation');
const user = require('../models/user');
const message = require('../models/message');
const privateConversation = require('../models/privateConversation');
const publicConversation = require('../models/publicConversation');


class conversationService extends BaseService {
    constructor() {
        super(conversation)
    }
    //getting conversations by userid
    getByUser(id) {
        return Promise.all([
            privateConversation.find({ $or: [{ 'user1': id }, { 'user2': id }] }).lean().populate({ path: 'user1 user2', model: 'user', select:'username' }),
            user.findById(id, { _id: 0, groups: 1 }).lean({ autopopulate: { "select": "_id groupName", maxDepth: 1 } })
        ])
            .then(resp => [...resp[0], ...resp[1].groups])
            .then(resp => {
                resp.sort(function(a,b){
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                });
                return resp;
            });
    }
}

module.exports = new conversationService();