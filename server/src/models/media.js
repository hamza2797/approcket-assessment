const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const tables = require('./index').collectionNames;


const mediaSchema = mongoose.Schema({
    path: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model(tables.Media, conversationSchema, tables.Media);