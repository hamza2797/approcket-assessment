var User = require('../models/user');


class AuthService {

    static signup(data) {
        console.log(data);
        var user = new User(data);

        User.createUser((user), function (err) {
            if (err) {
                console.log('username exists');
            }
            else {
                console.log('user added');
            }
        });
    }
}
module.exports = AuthService;