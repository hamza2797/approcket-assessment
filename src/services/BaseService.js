var User = require('../models/user');


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
        return this.Model.add(body).lean();
    }

    update(id, body) {
        return this.Model.updateOne(id, body).lean();
    }

}

module.exports = BaseService;