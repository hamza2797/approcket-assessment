const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const tables = require('./index').collectionNames;


const conversationSchema = mongoose.Schema({});

module.exports = mongoose.model(tables.Conversation, conversationSchema, tables.Conversation);