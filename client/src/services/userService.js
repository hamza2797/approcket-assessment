import http from '../util/http';
import history from '../history';

export default class {
	static login(username, password) {
		console.log('inside login userservice')
		console.log(username)
		console.log(password)
		const body = {
			username:username,
			password:password
		}
		return http.post('/login', body)
	}

	static logout() {
		return http.get('/logout');
	}

	static register(obj) {
		return http.post(`/signup`);
    }
    
    static get(id){
        return http.get('/user/:id');
    }

    static searchUser(username){
        return http.get('/user/search')
    }


};
