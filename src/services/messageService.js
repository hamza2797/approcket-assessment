var message = require('../models/message');
const BaseService = require('../services/BaseService')


class messageService extends BaseService {
    constructor() {
        super(message)
    }
    //getting conversations by userid
    getByConversation(id) {
        return this.Model.find({ 'conversationId': id }).lean();
    }

    paginate(conversationId, limit, page) {
        return this.Model.paginate(
            { conversationId: id },
            {
                limit: Number(limit),
                page: page,
                lean: { virtuals: true },
                leanWithId: false,
                sort: 'createdAt'
            })
    }
}

module.exports = new messageService();