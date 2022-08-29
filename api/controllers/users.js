const users = require('../repos/users');
const jwt = require('jsonwebtoken');


exports.login = (req, res, next) => {
    users.checkUserExist(req.body.email, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            if (result.length > 0) {
                console.log(result, req.body.pass);
                if (req.body.pass == result[0].user_password) {
                    let token = jwt.sign({ userId: result[0].user_id }, 'SMSPANEL');
                    res.status(200).json({ token: token });
                } else {
                    res.status(404).json({ message: 'auth error!' });
                }
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        }
    });
}
exports.check = (req, res, next) => {
    try {
        var decoded = jwt.verify(req.body.token, 'SMSPANEL');
        res.status(200).json(decoded);
    } catch (err) {
        res.status(400).json({ message: "invalid token" });
    }
}

exports.list = (req, res, next) => {
    users.list((err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.add = (req, res, next) => {
    let entry = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.pass1,
        pass2: req.body.pass2,
        role: 'ADMIN'
    }
    if (entry.password == entry.pass2) {
        users.add(entry, (err, result) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json({ data: result });
            }
        });
    } else {
        res.status(404).json({ message: "Password error" });
    }
}
exports.delete = (req, res, next) => {
    users.updateField(req.body.id, 'user_status', 0, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json({ data: result });
        }
    });
}
exports.changePass = (req, res, next) => {
    if (req.body.pass1 === req.body.pass2) {
        users.updateField(req.body.id, 'user_password', req.body.pass1, (err, result) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json({ data: result });
            }
        });
    } else {
        res.status(404).json({ message: "Password error" });
    }
}
exports.getById = (req, res, next) => {
    accounts.getAccountById(req.body.id, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result[0]);
        }
    });
}
exports.update = (req, res, next) => {
    let entry = {
        fullname: req.body.fullname,
        email: req.body.number,
        bank: req.body.bank,
        type: req.body.type,
        id: req.body.id
    }
    users.updateRecord(entry, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}