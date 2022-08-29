const contacts = require('../repos/contacts');

exports.list = (req, res, next) => {
    contacts.list((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.search = (req, res, next) => {
    contacts.search(req.body.term, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}
exports.add = (req, res, next) => {
    let entry = {
        firstName: req.body.firstname,
        middleName: req.body.middlename,
        lastName: req.body.lastname,
        phone: req.body.cell,
        email: req.body.email,
        description: req.body.description
    }

    contacts.add(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });

}
exports.update = (req, res, next) => {
    let entry = {
        id: req.body.id,
        firstName: req.body.firstname,
        middleName: req.body.middlename,
        lastName: req.body.lastname,
        phone: req.body.cell,
        email: req.body.email,
        description: req.body.description
    }
    console.log(entry);
    contacts.update(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });

}
exports.delete = (req, res, next) => {
    contacts.delete(req.body.id, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}

exports.getById = (req, res, next) => {
    contacts.getContactById(req.body.id, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result[0]);
        }
    });
}
