import http from '../util/http';
import history from '../history';

export default class {
	static login(username, password) {
		const body = {
			username:username,
			password:password
		}
		return http.post('/login', body)
			.then(history('/landing'));
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
