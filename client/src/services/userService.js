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
			.then((resp) => {
				localStorage.setItem('username', resp.data.user.username);
          		localStorage.setItem('userId', resp.data.user.id);
				history.push('/landing')
			})
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
	
	static getAll(){
        return http.get('/user/all');
    }

    static searchUser(username){
        return http.get('/user/search')
    }


};
