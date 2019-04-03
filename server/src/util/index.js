module.exports = {
    CRUDrequestHandler(service) {
        const ns = {};
        ns.get = function (req, res) {
            service.get(req.params.id)
                .then(resp => res.send(resp))
                .catch(console.log)
        };
        ns.add = function (req, res) {
            service.add(req.body)
                .then(resp => res.send(resp))
                .catch(console.log)
        };
        ns.update = function (req, res) {
            service.update(req.params.id, req.body)
                .then(() => res.sendStatus(200))
                .catch(console.log)
        };
        ns.remove = function (req, res) {
            service.delete(req.params.id)
                .then(() => res.sendStatus(200))
                .catch(console.log)
        };
        return ns;
    },
    ConversationType: Object.freeze({
        PRIVATE: 'private',
        PUBLIC: 'public'
    })
}