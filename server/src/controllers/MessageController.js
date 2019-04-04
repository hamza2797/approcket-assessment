const UserService = require('../services/UserService');
const conversationService = require('../services/conversationService');
const messageService = require('../services/messageService');
const CRUDrequestHandler = require('../util/index').CRUDrequestHandler;
const util = require('../util/index');



module.exports = {
    ...CRUDrequestHandler(messageService, { add: false }),
    getByConversation(req, res) {
        messageService.getByConversation(req.params.id)
            .then(resp => res.send(resp))
            .catch(err => console.log)
    },
    async add(req, res) {
        console.log(req.body);
        const result = await messageService.add(req.body);
        res.sendStatus(200);
        const conversationId = req.body.conversationId;
        if (conversationId) {
            conversationService.get(conversationId)
                .then(resp => {
                    let userList = [];
                    console.log(resp)
                    if (resp.__t == util.ConversationType.PRIVATE) {
                        if (req.body.sender == resp.user1) {
                            userList.push(resp.user2);
                        }
                        else {
                            userList.push(resp.user1);
                        }
                    }
                    else {
                        userList = resp.userList.filter(val => val != req.body.senderId);
                    }
                    if (userList.length > 0) {
                        console.log(userList);
                        userList.forEach(val => {
                            req.io.emit(val, result);
                        });
                    }
                })
                .catch(console.log);
        }
        req.io.emit('tx', { key: "value" });
    }
};