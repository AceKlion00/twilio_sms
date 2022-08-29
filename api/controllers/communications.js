
const config = require('../../config.json');
const accountSid = config.twilio.sid;
const authToken = config.twilio.token;
const client = require('twilio')(accountSid, authToken);
const lists = require('../repos/lists');

exports.send = (req, res, next) => {
    let type = '';
    if (req.body.method == 1) {
        type = 'whatsapp: ';
    }
    let message = {
        from: type + config.twilio.phone,
        to: type + req.body.phone,
        text: req.body.message
    }
    console.log(message);
    client.messages
        .create({ body: message.text, from: message.from, to: message.to })
        .then(message => {
            res.status(200).json({ message: 'OK' });
        })
        .catch(e => {
            res.status(500).json({ message: e.message });
        });
}

exports.sendToGroup = (req, res, next) => {
    let type = '';
    if (req.body.method == 1) {
        type = 'whatsapp: ';
    }

    lists.listContacts(req.body.listId, (er, rs) => {
        if (rs[0] != undefined) {
            rs.forEach(element => {
                let message = {
                    from: type + config.twilio.phone,
                    to: type + element.phone,
                    text: req.body.message
                }
                client.messages
                    .create({ body: message.text, from: message.from, to: message.to })
                    .then(message => {

                    })
                    .catch(e => {

                    });

            });
            res.status(200).json({ message: 'OK' });
        } else {
            res.status(500).json({ message: 'List is empty' });
        }
    });
}
