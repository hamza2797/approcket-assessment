const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const tables = require('./index').collectionNames;
const util = require('../util/index').ConversationType;
const conversation = require('./conversation');



const BroadcastSchema = mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: tables.User, 
        default: undefined,
        autopopulate: true
    },
    text:{
        type:String,
        default:undefined
    }
});

module.exports = mongoose.model(util.BROADCAST, BroadcastSchema, util.BROADCAST);

