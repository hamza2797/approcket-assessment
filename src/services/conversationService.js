const check = require('check-types');

const BaseService = require('./BaseService');
const conversation = require('../models/conversation');
const user = require('../models/user');
const privateConversation = require('../models/privateConversation');
const publicConversation = require('../models/publicConversation');


class conversationService extends BaseService {
    constructor() {
        super(conversation)
    }
    //getting conversations by userid
    getByUser(id) {
        return Promise.all([
            this.Model.find({ $or: [{ 'user1': id }, { 'user2': id }] }).lean(),
            user.findById(id, { _id: 0, groups: 1 }).lean({ autopopulate: { "select": "_id groupName", maxDepth: 1 } })
        ])
            .then(resp => [...resp[0], ...resp[1]]);
    }

    addUser(id, userIds) {
        const query = check.string(userIds) ? userIds : {$each: userIds};
        return Promise.all([
            publicConversation.updateOne({ id: id }, { $addToSet: { userList: query } }),
            user.updateOne({ _id: {$in: userIds} }, { $addToSet: { groups: id } })
        ])
    }
    
    removeUser(id, userId){
        return Promise.all([
            publicConversation.updateOne({ id: id }, { $pull: { userList: userId } }),
            user.updateOne({ _id: userId }, { $pull: { groups: id } })
        ])
    }

}

module.exports = new conversationService();