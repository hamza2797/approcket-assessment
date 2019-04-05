var User = require('../models/user');
const BaseService = require('../services/BaseService')

var mongoose = require('mongoose')


class UserService extends BaseService {

    constructor() {
        super(User);
    }
    search(query, userId) {
        return User.find({ username: { "$regex": query, "$options": "i", $ne: mongoose.Types.ObjectId(userId)  } }).lean()
            .then(resp => {
                return resp;
            })
    }
    add(body) {
        return User.hashPassword(body.password)
            .then(resp => {
                console.log(resp);
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