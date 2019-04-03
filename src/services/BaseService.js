//const User = require('../models/user');
//const conversation = require('../models/conversation');



class BaseService {

    constructor(Model) {
        this.Model = Model;
    }

    get(id) {
        return this.Model.findById(id).lean();
    }

    delete(id) {
        return this.Model.deleteById(id).lean();
    }

    add(body) {
        console.log('yahan tak');
        return this.Model(body).save();
    }

    update(id, body) {
        return this.Model.updateOne(id, body).lean();
    }

}

module.exports = BaseService;