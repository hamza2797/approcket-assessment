const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const tables = require('./index').collectionNames;
const mongoosePaginate = require('mongoose-paginate');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: ObjectId,
        ref: tables.Conversation,
        default: undefined,
        autopopulate: true
    },
    sender: {
        type: ObjectId,
        ref: tables.User, 
        default: undefined,
        autopopulate: true
    },
    text:{
        type:String,
        default:undefined
    },
    media:{
        type: ObjectId,
        ref: tables.Media,
        default: undefined,
        autopopulate: true
    }
});

messageSchema.plugin(mongoosePaginate);
 

module.exports = mongoose.model(tables.Message,messageSchema, tables.Message);