const check = require('check-types');
const Broadcast = require('../models/broadcast');
const BaseService = require('./BaseService');

class broadcastService extends BaseService {
    constructor() {
        super(Broadcast);
    }

    getAll(){
    	return Broadcast.find({}).lean();
    }
}

module.exports = new broadcastService();