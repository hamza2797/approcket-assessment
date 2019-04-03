import http from '../util/http';

export const userService = class {
    
    static add(body) {
        return http.post('/message', body);
    }
    static delete(id) {
        return http.delete(`/message/${id}`);
    }
};
