const lists = require('../repos/lists');

exports.list = (req, res, next) => {
    lists.list((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.add = (req, res, next) => {
    let entry = {
        name: req.body.name,
        description: req.body.description
    }

    lists.add(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });

}
exports.delete = (req, res, next) => {
    lists.delete(req.body.id, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getById = (req, res, next) => {
    lists.getListById(req.body.id, (err, result) => {
        if (err) {
            res.status(404).json(err);
            console.log(err);
        } else {
            res.status(200).json(result[0]);
        }
    });
}
exports.listContacts = (req, res, next) => {
    console.log(req.body.id);
    lists.listContacts(req.body.id, (err, result) => {
        if (err) {
            res.status(404).json(err);
            console.log(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.removeFromList = (req, res, next) => {
    console.log(req.body.id);
    lists.removeFromList(req.body.listId, req.body.contactId, (err, result) => {
        if (err) {
            res.status(404).json(err);
            console.log(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.addToList = (req, res, next) => {
    lists.addToList(req.body.phone, req.body.listId, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}

exports.update = (req, res, next) => {
    let entry = {
        name: req.body.name,
        description: req.body.description,
        id: req.body.id
    }
    console.log(entry);
    lists.update(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}

