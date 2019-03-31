

module.exports = {
    CRUDrequestHandler(service){
        const ns = {};
        ns.get = function(req, res) {
            conversationService.get(req.params.id)
                .then(resp => res.send(resp))
                .catch(console.log)
        };
        ns.add = function(req, res) {
            conversationService.add(req.body)
                .then(resp => res.send(resp))
                .catch(console.log)
        };
        ns.update = function(req, res) {
            conversationService.update(req.params.id, req.body)
                .then(() => res.sendStatus(200))
                .catch(console.log)
        };
        ns.delete = function(req, res) {
            conversationService.delete(req.params.id)
                .then(() => res.sendStatus(200))
                .catch(console.log)
        };
        return ns;
    },
    ConversationType:Object.freeze({
        PRIVATE: 'private',
        PUBLIC: 'public'
    })
}