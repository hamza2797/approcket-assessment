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
        return this.Model(body).save();
    }

    update(id, body) {
        return this.Model.updateOne({_id:id}, body).lean();
    }

}

module.exports = BaseService;