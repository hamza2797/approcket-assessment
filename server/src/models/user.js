const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const tables = require('./index').collectionNames;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        hide: true
    },
    groups:[{
        type: ObjectId,
        ref: tables.Conversation,
        default: undefined,
        autopopulate: true
    }]
});


module.exports = mongoose.model(tables.User, UserSchema, tables.User);

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}

module.exports.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
}