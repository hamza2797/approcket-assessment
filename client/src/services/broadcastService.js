import http from '../util/http';

export default class  {
    
    static getBroadcast() {
		return http.get(`/broadcast`);
    }
    
    static sendBroadcast(body) {
		return http.post(`/broadcast`, body);
    }

};
