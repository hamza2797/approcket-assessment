import http from '../util/http';

export default class  {
    
    static getConversationsByUserId(id) {
		return http.get(`/user/conversation/${id}`);
	}

	static getMessagesById(id) {
		return http.get(`/conversation/${id}/messages`);
	}

	static getPrivateConversation(id) {
		return http.get(`/conversation/private/${id}`);
    }

    static addPrivateConversation(body) {
		return http.post(`/conversation/private/`, body);
    }
    
    static getPublicConversation(id) {
		return http.get(`/conversation/public/${id}`);
    }

    static addPublicConversation(body) {
		return http.post(`/conversation/public/`, body);
    }

    static updatePublicConversation(id, body) {
		return http.patch(`/conversation/public/${id}`, body);
    }

    static addUserToGroup(id, userList) {
		return http.post(`/conversation/public/${id}/user`, userList);
    }
  
    
    static getUser(id){
        return http.get('/user/:id');
    }

    static searchUser(username){
        return http.get('/user/search')
    }

};
