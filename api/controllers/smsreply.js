
const config = require('../../config.json');
const accountSid = config.twilio.sid;
const authToken = config.twilio.token;
const client = require('twilio')(accountSid, authToken);
const lists = require('../repos/lists');

exports.confirm = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ message: 'OK' });
}

exports.cancel = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ message: 'OK' });
}
