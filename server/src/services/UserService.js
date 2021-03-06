var User = require('../models/user');
const BaseService = require('../services/BaseService')

var mongoose = require('mongoose')


class UserService extends BaseService {

    constructor() {
        super(User);
    }
    search(query, username) {
        return User.find({ username: { "$regex": query, "$options": "i", $ne: username  } }).lean()
            .then(resp => {
                return resp;
            })
    }
    add(body) {
        return User.hashPassword(body.password)
            .then(resp => {
                body.password = resp;
                return new User(body).save();
            })
    }
    getUsernameById(id){
        return User.find(id).lean()
    }
    getAll(){
        return User.find({}).lean()
    }
}
module.exports = new UserService();