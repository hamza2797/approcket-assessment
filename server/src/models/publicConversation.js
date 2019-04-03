const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const tables = require('./index').collectionNames;
const util = require('../util/index').ConversationType;
const conversation = require('./conversation');

const PublicConversationSchema = mongoose.Schema({
    userList: [{
        type: ObjectId,
        ref: tables.User,
        default: undefined,
        autopopulate: true
    }],
    groupName:{
        type: String,
        default: undefined
    }
});


module.exports = conversation.discriminator(util.PUBLIC, PublicConversationSchema);