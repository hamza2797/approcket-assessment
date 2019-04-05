const check = require('check-types');
const BaseService = require('./BaseService');
const user = require('../models/user');
const publicConversation = require('../models/publicConversation');


class publicConversationService extends BaseService {
    constructor() {
        super(publicConversation)
    }
    addUser(id, userIds) {
        const query = check.string(userIds) ? userIds : { $each: userIds };
        return Promise.all([
            publicConversation.updateOne({ id: id }, { $addToSet: { userList: query } }),
            user.updateMany({ _id: { $in: userIds } }, { $addToSet: { groups: id } })
        ])
    }

    removeUser(id, userId) {
        return Promise.all([
            publicConversation.updateOne({ id: id }, { $pull: { userList: userId } }),
            user.updateOne({ _id: userId }, { $pull: { groups: id } })
        ])
    }
}

module.exports = new publicConversationService();