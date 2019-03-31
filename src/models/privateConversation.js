const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const tables = require('./index').collectionNames;
const util = require('../util/index').ConversationType;
const conversation = require('./conversation');



const PrivateConversationSchema = mongoose.Schema({
    user1: {
        type: ObjectId,
        ref: tables.User, 
        default: undefined,
        autopopulate: true
    },
    user2: {
        type: ObjectId,
        ref: tables.User,
        default: undefined,
        autopopulate: true
    }
});


module.exports = conversation.discriminator(util.PRIVATE, PrivateConversationSchema);