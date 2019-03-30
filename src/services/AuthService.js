var User = require('../models/user');


class AuthService {
	
	static signup(data){
        console.log(data);
        var user = new User(data);

        User.createUser((user) , function(){
            console.log('User Created');
        });
    }
    
}

module.exports = AuthService;