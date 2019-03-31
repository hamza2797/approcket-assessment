var User = require('../models/user');
const BaseService = require('../services/BaseService')

class UserService extends BaseService {

    constructor() {
        super(User);
    }

    add(body) {
        return User.hashPassword(body.password)
            .then(resp => {
                console.log(resp);
                body.password = resp;
                return new User(body).save();
            })
    }
}
module.exports = new UserService();