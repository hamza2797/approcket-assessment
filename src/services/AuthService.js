var User = require('../models/user');


class AuthService {

    static signup(data) {
        var user = new User(data);
        return User.createUser(user);
    }
    
}
module.exports = AuthService;