import http from '../util/http';

export const userService = class {
	static login(obj) {
		return http.post('/login', obj);
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
